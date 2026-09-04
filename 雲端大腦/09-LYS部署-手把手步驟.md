# LYS 部署：手把手步驟

> 2026-09-04。軒哥已決定：**Render 免費方案** + **綁自己的網址**。
> 每一步都寫清楚要點哪裡，照著做就行。

---

## 第 0 步：先記住這兩件事

1. **你的後台密碼是 `S@ndj1313#`** — 但這組密碼**沒有寫在程式碼裡**（下面第 2 步會告訴你去哪裡填）。
2. **線上那個站的後台改的資料會不見**（Render 免費的硬碟是暫存的）。
   所以：**後台只在你自己電腦用**，改完跟我說一聲，我幫你推上去，線上就更新了。

---

## 第 1 步：部署到 Render（約 3 分鐘）

1. 開 **https://render.com**
2. 按右上角 **Get Started**（或 Sign In）
3. **用 GitHub 帳號登入**（選「Sign in with GitHub」）
   - 它會問要不要授權，按 **Authorize Render**
4. 登入後按 **New +** → 選 **Web Service**
5. 在 repo 清單裡選 **`seanown/longyousilk`**
   - 如果沒看到，按旁邊的 **Configure account** 授權它讀取你的 repo
6. 設定**大部分會自動帶好**（因為我已經寫了 `render.yaml`），
   只需確認這幾項：
   - **Name**：`lys-longyousilk`
   - **Region**：選 **Singapore**（離澳門最近，會比較快）
   - **Branch**：`main`
   - **Build Command**：`echo "零依賴，不需要 build"`
   - **Start Command**：`node server.js`
   - **Instance Type**：**Free**
7. 往下滑，按 **`Create Web Service`**
8. 等約 2 分鐘，出現綠色 **Live** 就成功了
9. 它會給你一個網址，長得像 `https://lys-longyousilk.onrender.com`
   → **先開起來看一下，網站應該會出現**

---

## 第 2 步：設定後台密碼（重要，1 分鐘）

⚠️ **不做這步，線上後台的密碼會是 `lys2026`，任何人都能登進去改你的東西。**

1. 在 Render 後台，點進你剛建的服務
2. 左邊選單點 **Environment**
3. 按 **Add Environment Variable**
4. 填：
   - **Key**：`ADMIN_PASSWORD`
   - **Value**：`S@ndj1313#`
5. 按 **Save Changes**
6. Render 會自動重新部署（約 1 分鐘），等它跑完

**驗證**：開 `https://你的網址/admin/`，用 `S@ndj1313#` 登入，
應該進得去；用 `lys2026` 應該被擋掉。

---

## 第 3 步：綁自己的網址

### 有兩條路，先看一下再決定

| | **A. 子網域** | **B. 獨立域名** |
|---|---|---|
| 網址長相 | `lys.seanown.org` | `longyousilk.com` |
| 費用 | **免費** | 約 **US$10–15 / 年** |
| 多久能用 | 約 10 分鐘 | 買域名 + 設定，約 1 小時 |
| 品牌感 | 弱（像個人站的附屬頁） | **強（獨立的品牌站）** |
| 適合 | 先測試、還不確定要不要做 | 認真要對外做生意 |

### 我建議 B（獨立域名）

因為 **LYS 是絲綢藝術品電商**，而 seanown.org 是「翁振軒個人品牌」。
綁在 seanown.org 底下，客人會覺得這是個人網站的其中一頁，不像一門生意。

**好消息**：我查過了，`longyousilk.com` 目前**沒有人註冊**（查無 DNS 紀錄）。
`.net`、`.org`、`.co` 也都還空著。

---

### 如果選 B：買域名（約 10 分鐘）

**去哪買**：你 ownsean.com 就是在 **Name.com** 買的，
繼續用同一家最省事（不用再記一組帳號）。

1. 開 https://www.name.com → 登入
2. 搜尋 `longyousilk.com`
3. 加入購物車 → 結帳（約 US$10–15/年）
4. 買好之後**先不要動 DNS**，回到 Render 那邊

**在 Render 加網址**：
1. 進你的服務 → 左邊 **Settings**
2. 找到 **Custom Domains** → 按 **Add Custom Domain**
3. 輸入 `longyousilk.com`（和 `www.longyousilk.com`，加兩次）
4. Render 會顯示一組 **CNAME 目標**，長得像
   `lys-longyousilk.onrender.com`
   **把這串抄下來**

**回 Name.com 設定 DNS**：
1. 進 Name.com 的域名管理 → 找 **DNS Records**
2. 加兩筆紀錄：
   - **Type**：`CNAME`　**Host**：`www`　**Answer**：`lys-longyousilk.onrender.com`
   - **Type**：`ALIAS` 或 `ANAME`（如果沒有，就用 `CNAME` + Host `@`）　→ 同樣指向 `lys-longyousilk.onrender.com`
3. 存檔

**等生效**：通常幾分鐘，最慢 24–48 小時。
生效後 Render 會**自動幫你裝 HTTPS 憑證**（免費），網址列會出現鎖頭。

---

### 如果選 A：子網域（約 10 分鐘）

1. Render → 服務 → **Settings** → **Custom Domains** → 加 `lys.seanown.org`
2. 抄下 Render 給的 CNAME 目標
3. 去 **Netlify**（seanown.org 的 DNS 在 Netlify，nameserver 是 nsone.net）
   → Domains → seanown.org → **DNS records** → 加一筆：
   - **Type**：`CNAME`　**Name**：`lys`　**Value**：Render 給的那串
4. 等幾分鐘就生效

---

## 第 4 步：驗收清單

- [ ] 用自己的網址開，網站正常顯示
- [ ] 網址列有鎖頭（HTTPS）
- [ ] `/admin/` 用 `S@ndj1313#` 登得進去
- [ ] `/admin/` 用 `lys2026` 被擋掉 ✅（表示密碼有生效）
- [ ] 用手機 4G 開一次（不要連家裡 WiFi），確認外面也看得到

---

## ⚠️ 四個坑，動手前先看

| # | 坑 | 怎麼避 |
|---|---|---|
| 1 | **DNS 只加 CNAME，不要動 A 或 NS 紀錄** | 動到 NS 可能讓 seanown.org 整站掛掉。只加新的 CNAME 就好 |
| 2 | **線上後台改的資料會消失** | 後台只在本機用，改完由我 commit + push |
| 3 | **第一次開要等約 1 分鐘** | 這是休眠，綁自己的網址一樣會。等有客人再考慮升級 $7/月 |
| 4 | **render.com 的服務要選 Singapore** | 預設可能是美國，選新加坡澳洲連線快很多 |

---

## 如果卡住了

直接把 Render 畫面**截圖給我**，我看了告訴你下一步點哪裡。

---

## 做完之後，下一步可以做

1. 補 Palace Geometry 的作品圖（原圖 CDN 已 404）
2. 購物車 + 線上收款（要先決定金流商與收款幣別）
3. 升級 Render $7/月（不休眠、秒開）— 等有客人再說
