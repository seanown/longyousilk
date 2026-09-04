# 英文站 ownsean.com — 工作檔

> 這份檔案讓任何設備（含手機）的 AI 讀了就能接手英文站的工作。
> **最後更新**：2026-09-04（由 PC 實地盤點後撰寫）

---

## 一、基本資料

| 項目 | 內容 |
|---|---|
| 網址 | **https://ownsean.com/**（域名在 name.com，AUTO-RENEWS 已開） |
| GitHub repo | **`seanown/English-site`**（main 分支，公開） |
| 本地路徑（PC 開機時才讀得到） | `C:\Users\user\WorkBuddy\2026-08-27-23-46-24\English-site\` |
| 部署 | Netlify，Import from Git，**push 到 main 即自動部署** |
| 同步狀態 | ✅ 本地 = 遠端（2026-09-04 檢查，git 乾淨，HEAD `4d7d5b8`） |
| 規模 | 23 個 HTML 頁（22 內容頁 + 404）、4 張圖、約 107 MB（含 docs/） |

---

## 二、鐵規（動手前必讀，違反就是做白工）

1. **兩站完全分離**
   - 中文站：`seanown/seanown-website` repo ／ `seanown.org` ／ Netlify Site A
   - 英文站：`seanown/English-site` repo ／ `ownsean.com` ／ Netlify Site B
   - **獨立 repo、獨立 Netlify site、獨立 DNS、獨立域名，互不影響。絕對不要互相引用或混用。**

2. **零 JS 動效**：純靜態。無 JS 動畫、無 carousel、無影片自動播放、無滾動特效。
   - 例外：Google Maps 嵌入（2026-09-03 起用於場地地圖）可接受。

3. **全英文**：標題、meta、og、內文一律英文。**不留任何中文殘留**。

4. **設計系統**：Gary Vaynerchuk 風格
   - Berkeley Blue `#003262` + California Gold `#FDB515`
   - 標題字體 Bebas Neue
   - 詳細規範見 repo 內 `DESIGN.md`、`TEMPLATES.md`

5. **軒哥的通用規則**：回覆一律繁體中文（但**網站內容本身是英文**）、文科生、步驟白話、決策前先確認最新意向。

---

## 三、頁面清單（22 個內容頁）

**主要頁**：`index`（首頁）、`about`、`news`、`article`、`portfolio`、`speaking`、`contact`、`research`、`insights`、`404`

**文章／專題頁**：
- `16th-aef` — 第 16 屆亞洲電子論壇
- `bay-youth-ai` — 灣青 AI（2026-06-02 澳門科學館活動）
- `capital-culture-civilisation` — 王德峰 UNU 澳門講座
- `data-valley` — 數據谷
- `dragon-corridor` — 龍匯走廊
- `eci` — ECI Young 澳門場次
- `gba-leadership` — 大灣區領袖頁（20 人 3 欄靜態 grid，名字自動配色）
- `global-influencer-festival` — 全球網紅節
- `macau-five-year-plan-3rd` — 澳門第三個五年規劃
- `new-retail-rails` — 新零售
- `thousand-brands` — 千品牌
- `westlake-university` — 西湖大學
- `wukong-culture` — 悟空文化

**其他檔案**：`robots.txt`、`sitemap.xml`、`favicon.svg`、`DESIGN.md`、`README.md`、`TEMPLATES.md`、`STANDARD-ASSET-CHECKLIST.md`、`docs/`（6 份 PDF/PPTX）、`scripts/`（多支 Python 工具）

---

## 四、優化清單執行狀況（原 2026-08-31 掃描，10 項）

| # | 項目 | 狀態 |
|---|---|---|
| 1 | robots.txt + sitemap.xml | ✅ 已完成 |
| 2 | gba-leadership 的 head 修復 | ✅ 已完成 |
| 3 | avatar 壓縮 | ✅ 已完成（avatar.jpg 19 KB） |
| 4 | 全站 canonical 標籤 | ✅ **23/23 頁全部完成** |
| 5 | 表單接通（contact/speaking/subscribe） | ✅ **已完成**，走 Netlify Forms，無殘留假表單 |
| 6 | 自訂 404 頁 | ✅ 已完成 |
| 7 | 圖片 loading="lazy" | 🟡 18 頁有，尚有 5 頁未加 |
| 8 | 統一 OG / Twitter Card | 🟡 大部分完成，建議再全站巡一次 |
| 9 | 活動照再壓縮 | ⏳ 未確認 |
| 10 | JSON-LD 結構化資料 | 🟡 **20/23 頁有**，尚缺 3 頁 |

**未確認／待辦**：
- [ ] JSON-LD 補齊剩餘 3 頁
- [ ] loading="lazy" 補齊剩餘 5 頁
- [ ] 全站 OG / Twitter Card 統一巡檢
- [ ] 活動照（bay-youth-group-1.jpg、hero、gba-eca-logo）再壓縮
- [ ] 上線前 4 項（見 README）：社交連結實際網址、聯絡信箱確認（現用 hello@seanown.org）

---

## 五、手機／laptop 上怎麼改這個站（重要）

**手機上沒有本地檔案**，但有兩條路可以工作：

### 路線 A：叫 AI 從 GitHub 抓（推薦）

```
請用 GitHub 連線讀取 seanown/English-site 的 main 分支，
幫我改 ____ 檔案的 ____ 部分。
改完直接 commit 到 main（Netlify 會自動部署）。
```

AI 可用工具：`mcp__github__get_file_contents`（讀）、`create_or_update_file`（改）、`create_pull_request`（發 PR）。

⚠️ **待測試**：GitHub 連線是否有寫入權限（記憶顯示過去曾用 CodeBuddy-Connector OAuth App，
**可能無寫入權限**）。若無寫入權限，走路線 B。

### 路線 B：AI 產出完整檔案內容，軒哥貼上

1. AI 從 GitHub 讀到原始檔
2. AI 產出修改後的**完整檔案內容**
3. 軒哥用手機瀏覽器開 github.com → 進 `seanown/English-site` → 點檔案 → 鉛筆圖示（Edit）→ 全選貼上 → Commit changes
4. Netlify 自動部署，約 1-2 分鐘後 ownsean.com 生效

---

## 六、給 AI 的接續指令（貼這段就能開工）

```
我要改英文站 ownsean.com。

基本資料：
- repo: seanown/English-site（main 分支，Netlify 自動部署）
- 本地: C:\Users\user\WorkBuddy\2026-08-27-23-46-24\English-site\（PC 開機才讀得到）
- 如果這台設備讀不到本地路徑，直接用 GitHub 連線讀 repo，不要假裝讀得到

鐵規（必守）：
1. 與中文站 seanown.org 完全分離，不互相引用
2. 零 JS 動效（純靜態），Google Maps 嵌入除外
3. 全站英文，不留中文殘留
4. 配色 Berkeley Blue #003262 + California Gold #FDB515，標題字體 Bebas Neue

今天要做：____

注意：
- 回覆我一律繁體中文（網站內容本身維持英文）
- 我是文科生，步驟要白話、一步一步講清楚要點哪裡
- 改完要告訴我 Netlify 部署狀態，並給我看網址
```

---

## 七、注意事項

- repo 內 `scripts/` 有多支 Python 工具（建頁面、配色、縮圖、稽核），改大結構前先看有沒有現成腳本。
- `docs/` 放的是 PDF/PPTX 原始素材，不要誤刪。
- `.gitignore` 已排除 `*.bak`，圖片轉換備份不會污染 git。
- 每次 push 後 Netlify 自動部署，約 1-2 分鐘生效，生效前別急著回報失敗。
