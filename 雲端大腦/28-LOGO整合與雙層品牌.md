# SILKLY ART — LOGO 整合與品牌（雲端大腦 28）

**日期**：2026-09-06
**觸發**：軒哥丟來 LOGO 圖（`H:\桌面\macau silk.jpg`，1024×1024 JPG）並說「use it for the website」

---

## 一、LOGO 解構

| 層 | 內容 | 觀察 |
|---|---|---|
| 構圖 | 雙層同心圓，金線外框 | 接近華麗的「金圓章」語言 |
| 主元素 | **黻 fú（兩弓相背）**，紅色立體＋金邊 | **十二章紋之一，象徵「公平公正」（善惡分明、決斷公平）**，位於徽章正中央 |
| 中央文字 | 紅色粗體 **Macau Silk** | **這就是 SILKLY ART 的主品牌識別（單一品牌）** |
| 副標 | 金色 **ART REDEFINED** | 與 Hero slogan「ART redefined. Authorized. Numbered. Never again.」一致 |
| 紋飾 | 底部紅色波浪絲綢光澤紋 | 強化「Silk」語意 |
| 底色 | 純白 JPG 底 | 已處理成透明背景 |

> **黻 fú 在哪**：就在這張 LOGO 的正中央——金圓章裡那個紅色立體的對稱幾何圖案（兩個「弓/ㄗ」形相背延伸，外圈 Macau Silk，下面 ART REDEFINED）。它是皇帝袞服「十二章紋」的第十二章，象徵「公平公正」（善惡分明、決斷公平）。
>
> **2026-09-06 14:58 更正**：AI 之前誤判為「囍」雙喜字。軒哥親自指正：那不是喜，是兩個弓字延伸的 LOGO、皇帝十二章之一、代表公平公正。本檔已全面更正。

---

## 二、品牌定位（軒哥 2026-09-06 更正）

**原本 AI 的「雙層品牌」框架 → 撤回。**

軒哥明確表態：
- 「那個 Macau Silk LOGO 就是 SILKLY ART 的品牌，主要的。沒有雙層品牌。」
- 「中文 folder 澳門龍遊絲綢文化與藝術中心不要改。」
- 「兩個弓字延伸的 LOGO（十二章紋之一、代表公平公正）有一天進海報。」

**修正後定案**：

```
SILKLY ART  ＝  單一主品牌
   └─ 識別標記：Macau Silk 金圓章 LOGO（含中央「黻 fú」十二章紋圖騰 ＋ ART REDEFINED 副標）
   └─ 中文全稱：澳門龍遊絲綢文化與藝術中心（保留，不改）
   └─ 產品：限量絲綢藝術海報（Mondo 風執行設計）
```

- **Macau Silk 金圓章 LOGO ＝ SILKLY ART 的單一主品牌識別**，不是母/子關係。
- 類比不再用 Hermès/LVMH 那套——它就是一個牌子，LOGO 即品牌。
- 中文站名稱「澳門龍遊絲綢文化與藝術中心」**保留不動**。
- **「黻 fú」十二章紋圖騰**標記為**未來海報視覺的品牌簽名元素**（待軒哥指定哪張海報用，非現在）。其語義（公平公正）與 SILKLY ART 的策展價值（版次真實、分潤透明、署名公正）天然契合——未來每張海報右下角的「認證印」位置，最自然就是這枚黻章。

---

## 二.5、品牌名由來（軒哥 2026-09-06 親口確認）

- **SILKLY ART ＝ SILK ＋ LY ＋ ART**
- **LY ＝ LONG YOU ＝ 龍遊**（翁振軒核心事業字）
- 整體語意：龍遊做的絲綢藝術
- 與中文全稱「澳門**龍遊**絲綢文化與藝術中心」**字字對齊**——軒哥明確指示不要改
- Macau Silk 是這個品牌的英文對外稱呼，SILKLY ART 是產品線／網站名稱，兩者**同一個品牌**而非母/子
- 之前 AI 誤以為 LY 是發音需要（如 silk-ly）而硬解釋為「絲滑的絲綢」——已撤回，正解即「龍遊」縮寫

---

## 三、執行了什麼

1. **LOGO 圖處理**（Python PIL）
   - 源檔：`H:\桌面\macau silk.jpg`（1024×1024 JPG）
   - 透明化：白色像素（RGB ≥ 240）→ 全透明，保留內部奶油米色背景
   - 輸出到 `assets/logo/`：
     - `macau-silk-logo.webp`（640×640，59KB）
     - `macau-silk-logo-256.webp`（19KB）
     - `macau-silk-logo-128.webp`（8KB）
     - `macau-silk-logo-64.webp`（3KB）
     - `macau-silk-logo-32.webp`（1KB）
   - `favicon.ico`（多尺寸 16/32/48/64，16KB）
   - `apple-touch-icon.png`（180×180，42KB）
   - `assets/og-image.webp`（1200×630，38KB；jpg 64KB）— 中央 LOGO + 「Macau Silk — Art Redefined」+ silklyart.com 副標

## 四、黻章獨立抽離（2026-09-06 完成）

> 軒哥 2026-09-06 親口更正：LOGO 中央不是「囍」雙喜，是**十二章紋第十二章「黻 fú」**——兩個「弓」背對背對稱延伸，皇帝袞服 12 道象徵之一，象徵「善惡分明、公平公正」。

- 抽離腳本：`_extract_fu.py`（手寫連通元件 + 形態學開運算，未裝 scipy）
- 技術要點：
  1. 中央區域限制 `mask[170:870, 260:790]`（排除外金圈）
  2. 深紅遮罩 `(R>110) & (R-B>55) & (R-G>30) & (lum<170)`
  3. **8-連通元件**標註 → 用「bbox 短邊 > 60px + area > 2000」過濾出兩個「弓」元件（#3, #4 各 ~80k px）
  4. 形態學開運算 `erode(8)→dilate(8)` 切斷與底部紅色波浪線的細接點
  5. 再用 cc_labels 過濾 250px 以下的小元件（清掉內角殘渣）
- 產出（皆透明背景，PNG 為主、WebP 多尺寸）：
  ```
  assets/logo/macau-silk-fu.png        451 KB   712×712 高解析
  assets/logo/macau-silk-fu.webp       21 KB    同尺寸壓縮
  assets/logo/macau-silk-fu-256.webp   14 KB    256px 適合 header
  assets/logo/macau-silk-fu-128.webp   7 KB     128px
  assets/logo/macau-silk-fu-64.webp    4 KB     64px  favicon 替代
  assets/logo/macau-silk-fu-disc.png   481 KB   整個金圓章 + 黻（圓章版）
  assets/logo/macau-silk-fu-disc.webp  53 KB    同上壓縮
  ```
- **未來用途**（待軒哥指定何時用）：
  - 海報「認證印」（右下角 / 版次旁）
  - 溯源證書中央浮水印
  - 包裝封緘章
  - 任何需要品牌簽名的場合

> ⚠️ AI 早期把黻誤認為「囍」雙喜，已在雲端大腦與長期記憶全面更正；舊文字保留作審計痕跡。

2. **CSS 升級**（`assets/css/style.css`）
   - 新增 `.brand-with-logo` flex 容器：左 46px LOGO 圓＋右 word/sub 文字
   - 新增 `.footer-brand`：左 64px LOGO ＋右 word/sub 文字
   - 行動版只顯示 LOGO + SILKLY ART word（隱藏 sub）

3. **14 頁 HTML 批量升級**（Python 腳本一次處理）
   - 每頁 `<a class="brand">` → `<a class="brand brand-with-logo">`，內含 LOGO `<img>` + 文字
   - `<head>` 加 favicon、apple-touch-icon、OG/Twitter meta
   - `<link>` 順序：preconnect → favicon → apple-touch → stylesheet
   - ZH 頁用 `../assets/...` 路徑、ROOT 頁用 `assets/...`
   - 字串 sub：EN = "Macau Silk · Curated Editions"；ZH = "澳門絲綢 · 限量藝術海報"

4. **footer 14 頁**
   - 第一欄從純文字升級為 `.footer-brand`（LOGO + 文字堆疊）
   - 下面保留原簡介文案（含「澳門龍遊絲綢文化與藝術中心」）

---

## 四、自檢結果

- 14 頁全部 **HTTP 200**（本地預覽）
- 每頁 `brand-with-logo` × 1、`footer-brand` × 1
- LOGO 路徑：ROOT 用 `assets/logo/...`、ZH 用 `../assets/logo/...`（正確）
- 紅線守住：未使用「廟宇」「富春」「萬事利 IECIA FORBES Funko」等禁用詞

---

## 五、狀態總結

| 項目 | 狀態 |
|---|---|
| 品牌架構 | **單一品牌**：Macau Silk 金圓章 LOGO ＝ SILKLY ART 主識別（雙層框架已撤回） |
| LOGO 中央圖騰 | **黻 fú（十二章紋第十二章，象徵公平公正）**——非「囍」（AI 誤判已更正） |
| 中文名稱「澳門龍遊絲綢文化與藝術中心」 | **保留不動** |
| 「黻」圖騰進海報 | 未來（待軒哥指定海報，非現在） |
| 設計原型 | Mondo 風執行設計 v1 已簽收並套用全 14 頁 |
| 部署 | 本地 final、已 commit（3 筆）；待 github 空庫 `silklyart` 建好 → push + Pages + DNS |

---

## 六、本次 commit

`brand: integrate Macau Silk LOGO (transparent webp + favicon + og-image) — brand mark in nav and footer across 14 pages`