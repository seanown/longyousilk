# -*- coding: utf-8 -*-
"""把豆包的靜態預覽頁改造成吃後台資料的動態網站"""
import re, io, sys

src = io.open('lys-preview-backup.html', encoding='utf-8').read()
out = src

def rep(old, new, label):
    global out
    if old not in out:
        sys.stdout.write('FAIL: ' + label + '\n')
        sys.exit(1)
    out = out.replace(old, new, 1)
    sys.stdout.write('ok: ' + label + '\n')

# 1. 五組寫死的資料陣列 -> 改成由伺服器載入
for name in ['categories', 'products', 'sizes', 'deliveries', 'exhibitions']:
    pat = re.compile(r'const ' + name + r' = \[.*?\n\];', re.S)
    if not pat.search(out):
        sys.stdout.write('FAIL regex: ' + name + '\n')
        sys.exit(1)
    out = pat.sub('let ' + name + ' = [];', out, count=1)
    sys.stdout.write('ok: ' + name + ' -> dynamic\n')

# 2. 倒數計時改由後台設定控制
rep('// ===== State =====',
    'let DROP_END = null;\n\n// ===== State =====',
    'DROP_END declaration')

rep("""  const target = new Date();
  target.setDate(target.getDate() + 47);
  target.setHours(10, 0, 0, 0);""",
    """  const target = (DROP_END && !isNaN(DROP_END.getTime())) ? DROP_END : new Date(Date.now() + 47 * 86400000);""",
    'countdown target')

# 3. 藝術家申請表單加 id
rep('<input type="text" required placeholder="Your name">',
    '<input type="text" id="af-name" required placeholder="Your name">', 'field name')
rep('<input type="email" required placeholder="you@email.com">',
    '<input type="email" id="af-email" required placeholder="you@email.com">', 'field email')
rep('<input type="text" placeholder="Where are you based?">',
    '<input type="text" id="af-country" placeholder="Where are you based?">', 'field country')
rep('                <select required>',
    '                <select id="af-medium" required>', 'field medium')
rep('<input type="url" placeholder="Personal site / Behance / Instagram">',
    '<input type="url" id="af-portfolio" placeholder="Personal site / Behance / Instagram">', 'field portfolio')
rep('<textarea placeholder="Briefly describe your creative philosophy, style, and representative works..." required></textarea>',
    '<textarea id="af-statement" placeholder="Briefly describe your creative philosophy, style, and representative works..." required></textarea>',
    'field statement')

# 4. 表單送出 -> 真的寫進後台
rep("""function submitForm(e) {
  e.preventDefault();
  document.getElementById('apply-form').style.display = 'none';
  document.getElementById('form-success').classList.add('show');
}""",
"""async function submitForm(e) {
  e.preventDefault();
  const val = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  const payload = {
    name: val('af-name'), email: val('af-email'), country: val('af-country'),
    medium: val('af-medium'), portfolio: val('af-portfolio'), statement: val('af-statement')
  };
  const btn = e.target.querySelector('button[type=submit]');
  const oldText = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
  try {
    const r = await fetch('/api/applications', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (r.ok) {
      document.getElementById('apply-form').style.display = 'none';
      document.getElementById('form-success').classList.add('show');
    } else { throw new Error('fail'); }
  } catch (err) {
    showToast('送出失敗，請直接來信 seanown@gmail.com');
    if (btn) { btn.disabled = false; btn.textContent = oldText; }
  }
}""", 'submitForm')

# 5. 初始化 -> 先跟伺服器要資料，再畫頁面
rep("""renderCategories('home-categories');
renderProducts('home-products', products.slice(0, 4));
renderShopCats();
renderProducts('shop-products', products);
renderExhibitions('current');
updateCountdown();
setInterval(updateCountdown, 1000);
router();""",
"""async function boot() {
  try {
    const [p, c, e, s] = await Promise.all([
      fetch('/api/data?type=products').then(r => r.json()),
      fetch('/api/data?type=categories').then(r => r.json()),
      fetch('/api/data?type=exhibitions').then(r => r.json()),
      fetch('/api/data?type=settings').then(r => r.json())
    ]);
    products    = p.data || [];
    categories  = c.data || [];
    exhibitions = e.data || [];
    const st = s.data || {};
    if (st.sizes && st.sizes.length) sizes = st.sizes;
    if (st.deliveries && st.deliveries.length) deliveries = st.deliveries;
    if (st.dropEndsAt) DROP_END = new Date(st.dropEndsAt);
  } catch (err) {
    console.error('載入資料失敗', err);
  }
  renderCategories('home-categories');
  renderProducts('home-products', products.slice(0, 4));
  renderShopCats();
  renderProducts('shop-products', products);
  renderExhibitions('current');
  updateCountdown();
  setInterval(updateCountdown, 1000);
  router();
}
boot();""", 'boot')

io.open('index.html', 'w', encoding='utf-8').write(out)
sys.stdout.write('\nDONE -> index.html (' + str(len(out)) + ' chars)\n')
