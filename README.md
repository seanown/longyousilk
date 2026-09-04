# LYS 龍遊絲綢藝術平台（Long You Silk）

絲綢限量藝術品電商網站。前台展示作品／展覽，後台可自行增刪改，資料存 JSON 檔。

- **品牌**：Long You Silk（LYS 龍遊）
- **創辦人**：翁振軒 Sean Own
- **GitHub**：https://github.com/seanown/longyousilk

---

## 一、怎麼跑起來（本機）

不需要安裝任何套件（零依賴，純 Node 內建模組）。

```bash
node server.js
```

然後開 http://localhost:3000

- 前台：http://localhost:3000/
- 後台：http://localhost:3000/admin/　（密碼 `lys2026`）

Windows 用戶直接雙擊 `一鍵啟動網站.bat` 也可以。

---

## 二、資料夾結構

| 路徑 | 用途 |
|---|---|
| `index.html` | 前台首頁，動態讀取 `/api/data` |
| `server.js` | 零依賴 Node 後端（HTTP server + API） |
| `build.py` | 產生 index.html 的腳本（見下方警告） |
| `admin/index.html` | 繁體中文後台，三頁籤：作品／展覽／藝術家申請 |
| `data/*.json` | 資料庫（作品、展覽、藝術家申請） |
| `assets/images/` | 作品圖 |
| `素材/` | 照片素材庫（大頭照 48 張、AI ART 12 個） |
| `lys-preview-backup.html` | 豆包原始預覽頁備份，**保留勿刪** |

---

## 三、⚠️ 重要警告

1. **不要重跑 `build.py`**，它會覆蓋 `index.html` 的手動修改。要跑之前先備份。
2. **後台預設密碼是 `lys2026`，上線前一定要改**（在 `server.js` 第 18 行 `ADMIN_PASSWORD`）。
3. `.gitignore` 已排除 `backups/` 與 `*.bak`，備份檔不會進 repo。

---

## 四、部署上線

這站**有後端**（Node + 寫入 JSON），Netlify / GitHub Pages 這種純靜態平台放不下。
需要用支援 Node 的平台：**Render、Railway、Fly.io、Zeabur** 都可以。

已內建 `render.yaml`，Render 上選「New Web Service → 連這個 repo」就會自動帶入設定。

部署前必須處理：
- [ ] 改掉 `ADMIN_PASSWORD`（目前 `lys2026`）
- [ ] 注意：多數免費平台的硬碟是**暫存的**，重啟後 `data/*.json` 的修改會掉。
      正式上線建議改用資料庫，或直接接受「後台改資料僅本機有效、線上用 repo 裡的資料」。

---

## 五、待辦

1. 部署上線（選平台 → 連 repo → 改密碼）
2. 購物車 + 線上收款（需先決定金流商與收款幣別）
3. 補 Palace Geometry 作品圖（原圖 CDN 已 404）
4. 改後台預設密碼
