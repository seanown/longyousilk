# SILKLY ART — 藝術指導 v1（執行設計）

> 軒哥按「2 執行設計」。本檔為「對標 Mondo 2011–2013 克制視覺、藝術品規格排版語言」的**正式 v1 藝術指導**與**設計原型**。
> 視覺預覽：`SILKY ART/design/preview.html`（本機 `http://localhost:8083/design/preview.html`）
> 規格書：`SILKY ART/design/art-direction-v1.md`

---

## 一、本輪做了什麼（執行設計 v1 全部產出）

| 項目 | 檔案 | 狀態 |
|---|---|---|
| 藝術指導規格書 v1 | `SILKY ART/design/art-direction-v1.md` | ✅ |
| 高保真設計原型 | `SILKY ART/design/preview.html` | ✅ |
| 主視覺海報 hero（南天門） | `design/assets/silklyart-poster-nantianmen.webp` (307KB) | ✅ AI 生成 |
| 版次海報（敦煌飛天） | `design/assets/silklyart-poster-apsara.webp` (295KB) | ✅ AI 生成 |
| 縮圖版（供副卡） | `-sm.webp` × 2 | ✅ |
| 浮水印 | 已裁切清乾淨 | ✅ |

---

## 二、Mondo 2011–2013 克制風翻成網頁語言

從既有「編輯型骨架」升級到「藝術指導 v1」，**六個關鍵翻譯**：

1. **海報即主視覺**——hero 不再是純文字，直接掛一幅南天門絲綢海報（朱紅城樓＋金線＋佛像剪影＋太陽祥雲）。海報是主角，文字是展覽說明。
2. **博物館標籤規格**——每件作品旁附展覽級標籤（作品名、版次、技法、年份），全大寫 11.5px + 襯線粗體作品名 + 1px hairline。**展覽牆不標價**（鐵律 #1）。
3. **版次編號即排版**——「N° 01 / 75」以 Cormorant Garamond 46–80px 朱紅大字，反覆出現在 hero、edition card、type specimen 三處，**這是其他絲綢海報沒有的品牌識別特徵**。
4. **三聯畫式 IP pillar**——Nantianmen / Palace Culture / Dunhuang 三柱以 1px gap + hairline 背景連成一體（三聯畫感），不像商品分類。
5. **溯源印章**——provenance 區有雙圈圓章（N° 01 · Macau · 2026 · Certified），像護照印章，把「獨立第三方認證」做成了視覺。
6. **完全靜態**——展覽牆不會動：禁用滾動視差、入場動畫、輪播、視頻。唯一動效是 hover 下劃線與按鈕色變。

---

## 三、紅線自檢（全 0 違規）

預覽與規格書皆通過：
- 不點名萬事利 / Wensli / IECIA / FORBES / Funko / MINDSTYLE
- 不碰 token / 代币 / 投資 / 升值 / 炒作
- 不用「絲綢比紙耐久 / 可以呼吸的紙」
- 不顯價格（無 $ 數字）

---

## 四、本機驗證

- 8083 全資源 HTTP 200：preview.html / art-direction-v1.md / 4 張 webp / 母版 style.css
- 紅線掃描全部 0
- 圖檔已裁切浮水印＋webp 壓縮（hero 307KB、副 295KB，縮圖 175KB）

---

## 五、待軒哥拍板

藝術指導 v1 **等你 sign off 後**才會套用到 EN 七頁＋中文七頁（套用路線寫在 art-direction-v1.md §12）。

sign off 標準（你過目 preview.html）：
- 海報當 hero，調性對不對？
- 三聯畫式 pillar，喜不喜歡？
- 博物館標籤＋版次大字，識別度夠不夠？
- 溯源印章，護照感對不對？
- type specimen，五個字體階層順不順眼？

任何一點不對，回「改 ①」「改 ②③」我重做。Sign off 通過，下一步：
- 套用到 EN 七頁 + 中文七頁（≈ 14 頁同套系統）
- 然後可以談**部署** silklyart.com 或合約定比例補實

---

## 六、雲端大腦引用

- 既有令牌：`lys/雲端大腦/12-silklyart-設計系統規格書.md` v0.13
- 定位（策展方）：`15-silklyart-定位修正-策展方.md`
- 商業模型（雙軌分潤）：`23-silklyart-版次著作權與雙軌分潤.md` + `26-silklyart-合約模板v1.md`
- NFT 合規：`24-silklyart-NFT溯源與國際化.md`
- 命名結案：`25-silklyart-英文站與GALLERY命名.md`
- **本檔（執行設計 v1）**：本檔
- 視覺：`SILKY ART/design/preview.html`
- 規格書：`SILKY ART/design/art-direction-v1.md`