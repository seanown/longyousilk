/**
 * LYS 網站本地伺服器
 * ------------------------------------------------------------
 * 不需要安裝任何套件，只要電腦有 Node.js 就能跑。
 * 啟動方式：在本資料夾開啟終端機，輸入
 *     node server.js
 * 然後用瀏覽器打開 http://localhost:3000
 * ------------------------------------------------------------
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ===== 設定區（都可以自己改）=====
const PORT = process.env.PORT || 3000;   // 雲端平台會自己給 PORT，本機則用 3000
// ⚠️ 這個 repo 是公開的，密碼不要寫在這裡！
// 線上（Render）的密碼在 Render 後台的環境變數 ADMIN_PASSWORD 設定。
// 本機沒有設環境變數時，就用下面的 lys2026（只在你自己電腦，不外洩）。
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lys2026';
const MAX_UPLOAD_MB = 20;
// ================================

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const IMAGE_DIR = path.join(ROOT, 'assets', 'images');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// 已登入的 token（存在記憶體，重啟伺服器就會清空，需要重新登入）
const sessions = new Set();

function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

function readBody(req, limitBytes) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > limitBytes) { reject(new Error('TOO_LARGE')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// 只允許這幾個檔名，避免被寫入奇怪的路徑
const ALLOWED_DATA = new Set(['products', 'exhibitions', 'categories', 'settings', 'applications', 'artists']);

function dataFile(type) {
  return path.join(DATA_DIR, type + '.json');
}

function loadData(type) {
  const file = dataFile(type);
  if (!fs.existsSync(file)) return type === 'settings' ? {} : [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error('讀取失敗 ' + file + '：' + e.message);
    return type === 'settings' ? {} : [];
  }
}

function saveData(type, data) {
  const file = dataFile(type);
  const backupDir = path.join(ROOT, 'backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  // 先把「改之前」的舊檔複製一份到備份區，這樣才還原得回來
  if (fs.existsSync(file)) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(file, path.join(backupDir, type + '-' + stamp + '.json'));
    const files = fs.readdirSync(backupDir).filter(f => f.startsWith(type + '-')).sort();
    while (files.length > 20) {
      fs.unlinkSync(path.join(backupDir, files.shift()));
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

function isAuthed(req) {
  const token = req.headers['x-lys-token'] || '';
  return sessions.has(token);
}

function serveStatic(req, res, urlPath) {
  let rel = decodeURIComponent(urlPath.split('?')[0]);
  if (rel === '/' || rel === '') rel = '/index.html';
  let filePath = path.join(ROOT, rel);
  // 防止跳出專案資料夾
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  // 請求的是資料夾時，自動開裡面的 index.html（例如 /admin/ ）
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch (e) {}
  fs.readFile(filePath, (err, buf) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404</h1><p>找不到：' + rel + '</p>');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(buf);
  });
}

const server = http.createServer(async (req, res) => {
  const url = req.url || '/';
  const urlPath = url.split('?')[0];

  // ---- API：登入 ----
  if (urlPath === '/api/login' && req.method === 'POST') {
    let body;
    try { body = JSON.parse(await readBody(req, 1024 * 64)); }
    catch (e) { return sendJSON(res, 400, { ok: false, error: 'bad_request' }); }
    if (body.password === ADMIN_PASSWORD) {
      const token = crypto.randomBytes(24).toString('hex');
      sessions.add(token);
      return sendJSON(res, 200, { ok: true, token });
    }
    return sendJSON(res, 401, { ok: false, error: 'wrong_password' });
  }

  // ---- API：登出 ----
  if (urlPath === '/api/logout' && req.method === 'POST') {
    sessions.delete(req.headers['x-lys-token'] || '');
    return sendJSON(res, 200, { ok: true });
  }

  // ---- API：讀取資料 ----
  if (urlPath === '/api/data' && req.method === 'GET') {
    const type = new URL(url, 'http://x').searchParams.get('type');
    if (!ALLOWED_DATA.has(type)) return sendJSON(res, 400, { ok: false, error: 'bad_type' });
    return sendJSON(res, 200, { ok: true, data: loadData(type) });
  }

  // ---- API：寫入資料（需要登入）----
  if (urlPath === '/api/data' && req.method === 'POST') {
    if (!isAuthed(req)) return sendJSON(res, 401, { ok: false, error: 'need_login' });
    const type = new URL(url, 'http://x').searchParams.get('type');
    if (!ALLOWED_DATA.has(type)) return sendJSON(res, 400, { ok: false, error: 'bad_type' });
    let payload;
    try { payload = JSON.parse(await readBody(req, 1024 * 1024 * 8)); }
    catch (e) { return sendJSON(res, 400, { ok: false, error: 'bad_json' }); }
    saveData(type, payload);
    return sendJSON(res, 200, { ok: true });
  }

  // ---- API：上傳圖片（需要登入）----
  if (urlPath === '/api/upload' && req.method === 'POST') {
    if (!isAuthed(req)) return sendJSON(res, 401, { ok: false, error: 'need_login' });
    let body;
    try { body = JSON.parse(await readBody(req, MAX_UPLOAD_MB * 1024 * 1024)); }
    catch (e) { return sendJSON(res, 413, { ok: false, error: 'too_large' }); }
    const m = /^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/.exec(body.dataUrl || '');
    if (!m) return sendJSON(res, 400, { ok: false, error: 'bad_image' });
    const extMap = { 'jpeg': '.jpg', 'jpg': '.jpg', 'png': '.png', 'webp': '.webp', 'gif': '.gif' };
    const ext = extMap[m[1].toLowerCase()] || '.png';
    const base = (body.name || 'image').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'image';
    const filename = base + '-' + Date.now() + ext;
    if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });
    fs.writeFileSync(path.join(IMAGE_DIR, filename), Buffer.from(m[2], 'base64'));
    return sendJSON(res, 200, { ok: true, path: 'assets/images/' + filename });
  }

  // ---- API：藝術家申請表（訪客可提交，不需登入）----
  if (urlPath === '/api/applications' && req.method === 'POST') {
    let app;
    try { app = JSON.parse(await readBody(req, 1024 * 256)); }
    catch (e) { return sendJSON(res, 400, { ok: false, error: 'bad_json' }); }
    app.id = Date.now();
    app.submittedAt = new Date().toISOString();
    app.status = 'pending';
    const list = loadData('applications');
    list.push(app);
    saveData('applications', list);
    console.log('收到藝術家申請：' + (app.name || '') + ' <' + (app.email || '') + '>');
    return sendJSON(res, 200, { ok: true });
  }

  serveStatic(req, res, urlPath);
});

server.listen(PORT, () => {
  console.log('');
  console.log('  LYS 網站已啟動');
  console.log('  ------------------------------------------');
  console.log('  前台網址：  http://localhost:' + PORT + '/');
  console.log('  後台網址：  http://localhost:' + PORT + '/admin/');
  console.log('  後台密碼：  ' + ADMIN_PASSWORD);
  console.log('  ------------------------------------------');
  console.log('  關閉伺服器請按 Ctrl + C');
  console.log('');
});
