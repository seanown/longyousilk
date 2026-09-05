# LYS 對標 Displate — 網站改造藍圖

> 2026-09-05 21:00（更新：軒哥拍板金流，本檔對應 commit `e39bdb0`）
> 軒哥指示：把 Displate 的網站架構模式拆下來，套到 LYS 上。
> 這份是**分析 + 行動清單**，不是純理論。每一項都標了「LYS 現況」與「要改什麼」。

---

## 零、一句話結論

**Displate 和 LYS 是同一個商業模式**（藝術家市集 + 單一材質印刷 + 限量收藏），
差別在 Displate 是**量販**（€44–139）、LYS 是**奢侈品**（$890–1,680）。

→ **抄它的「架構」，不要抄它的「折扣戰」。**

---

## 一、Displate 完整拆解（2026-09 實查）

### 公司數字

| 項目 | 數字 |
|---|---|
| 成立 | 2013 年，總部西雅圖 + 華沙 |
| 設計數 | **250 萬+** |
| 藝術家 | **4 萬+** 獨立創作者 |
| 授權 IP | **200+** 官方授權（Marvel、Star Wars、One Piece） |
| 粉絲 | 500 萬+ |
| 評價 | Trustpilot **4.7/5**，18,461 則 |
| 藝術家分潤 | 各方說法 7%–30%（依會員層級），**官方條款未公開透明** |

### 首頁區塊順序（由上到下）

1. **輪播大 Banner** — 主打促銷 `UP TO 25% OFF`
2. **限量版預告** — 「NEW MINI-SERIES IS BLOOMING IN LIMITED EDITION」
3. **客製化入口** — 「DISPLATE YOUR MOMENTS」上傳自己的照片
4. **授權 IP 牆** — 「OFFICIAL METAL POSTERS FROM 200+ FANDOMS」
5. **分類導覽** — gaming / anime / sport / travel / verified creators
6. **「Browse posters you'll love」** — 個人化推薦 + `Surprise me` 按鈕
7. **「More ways to Displate」** — 限量版 / 客製 / **Club 會員** 三入口
8. **「Why you need metal art」** — 三大賣點：耐刮、**免工具磁吸**、禮盒包裝
9. **社群靈感牆** — 17 個主題標籤（Books / Space / Anime / Gaming…）
10. **使用者評價**

### 商品頁結構（關鍵，決定成交）

```
[限量標籤] Limited Edition
[稀缺倒數] 42 days left or until 500 are sold   ← 雙重稀缺（時間 + 數量）

Hanafuda Autumn                                  ← 品名
by Ulvarek [頭像]                                ← 藝術家（可點進專頁）
Every purchase supports an Artist                ← 情感訴求
Edition of 500 · N remaining

M  45 cm / 32 cm                                 ← 尺寸（M/L/XL）
  · 3D-printed character                         ← 加工細節（條列）
  · Glossy background finish
  · Gold glitter on petals
  · Holographic accents

€139                          [Add to cart]      ← 價格 + 加入購物車
We ship to Spain (3-5 business days)             ← 到貨預估（依 IP 自動判斷）

4.7/5 ★★★★★  18,461 store reviews               ← 第三方評價
Already gift packed                              ← 信任標記
Safe Wall Magnet mounting system                 ← 產品差異化
```

### 會員制 Displate Club（黏著度引擎）

| 權益 | 內容 |
|---|---|
| 免運費 | 所有訂單終身免運 |
| 優先購 | 限量版**提前 24 小時**開賣 |
| 客製折扣 | 上傳自製圖較便宜 |
| 專屬折扣 | Matte / Gloss 系列永久折扣 |
| 年度贈品 | 每年送一張等值購物金 |

> 會費依訂購量與類型而定（頁面未公開固定價，採個人化定價）。

### 藝術家端

- 免費申請 → 作品審核（curated，不是人人能上）→ 上架
- 平台負責：印刷、包裝、出貨、客服、**全部**
- 藝術家只管創作上傳，零成本零庫存
- 有作品集頁、數據分析、促銷工具

---

## 二、LYS 現況盤點（我逐行讀過程式碼）

### 已經有的（做得不錯，別動）

| 項目 | 狀態 |
|---|---|
| 商品配置器 | ✅ 尺寸 3 種（A2 / 90×90 / One Sheet）+ 加工 2 種，即時算總價 |
| 稀缺顯示 | ✅ 「Edition of N · N remaining」已顯示 |
| 限量分級 | ✅ Collector（25–100）/ Standard（500）/ NFT 1/1 |
| 收藏證書 | ✅ Collector 版有獨立認證說明區 |
| NFT 區塊 | ✅ 1/1 版有區塊鏈驗證說明（含 8–10% 二次銷售分潤） |
| 展覽頁 | ✅ 5 檔展覽，含 Now Showing 標記 |
| 藝術家申請表 | ✅ `/admin/` 可收 application |
| 首頁倒數 | ✅ Drop 倒數計時 |

### 沒有的（要補）

| 缺口 | Displate 有 | LYS 沒有 |
|---|---|---|
| **真購物車 + 結帳** | ✅ 完整金流 | ❌ 按下去只跳 toast 假訊息 |
| **藝術家專頁** | ✅ `/artist/xxx` 作品集 | ❌ 只有名字，點不了 |
| **會員制** | ✅ Club 五項權益 | ❌ 完全沒有 |
| **評價系統** | ✅ Trustpilot 4.7 / 18,461 則 | ❌ 完全沒有 |
| **第三方信任標記** | ✅ 免工具安裝、禮盒包裝 | 🟡 有素材但未結構化凸顯 |
| **到貨預估** | ✅ 「We ship to Spain (3-5 days)」 | ❌ 沒有 |
| **相關推薦 / 成套組** | ✅ 「curated set of three」 | ❌ 沒有 |
| **加工選項豐富度** | ✅ Matte / Gloss / Textra 三種表面處理 | 🟡 只有尺寸 + 交付形式 |
| **藝術家分潤公開** | ✅ 「Every purchase supports an Artist」 | ❌ 沒有公開說明 |

---

## 三、改造清單（按優先度排）

### 🔴 第一階段：讓它真的能賣東西

| # | 項目 | 要改什麼 | 工作量 |
|---|---|---|---|
| **1** | **購物車 + 結帳** | 目前 `Add to Cart` 只跳提示。要做：購物車側欄、數量增減、小計、**結帳頁**（收件資訊 + 金流） | 大 |
| **2** | **信任標記區塊** | 商品頁加一排：博物館級蠶絲 / 可溶解背襯（可當絲巾）/ 禮盒包裝 / 全球配送 / 附認證書 | 小 |
| **3** | **到貨預估** | 商品頁加「配送至 [地區] · 約 N 個工作天」 | 小 |
| **4** | **藝術家可點擊 → 專頁** | 商品頁的 `by K. Tanaka` 做成連結，導到藝術家專頁 | 中（配合 #5） |

### 🟡 第二階段：讓藝術家想來（供給端是 LYS 的命脈）

| # | 項目 | 要改什麼 | 工作量 |
|---|---|---|---|
| **5** | **藝術家專頁** | `/artist/xxx`：頭像、簡介、**該藝術家全部作品**、展覽經歷。Displate 的核心資產 | 中 |
| **6** | **分潤機制公開** | 加「Every purchase supports the artist」＋ 明確比例。這是招募藝術家最有力的文案 | 小 |

### 🟢 第三階段：讓人回購（等有流量再做）

| # | 項目 | 要改什麼 | 工作量 |
|---|---|---|---|
| **7** | **會員制 LYS Collector's Circle** | 抄 Club：免運 / 限量優先 24h / 年度購物金。奢侈品版可再加「私人藝術顧問」 | 中 |
| **8** | **相關推薦 + 成套組** | 商品頁底部加「You may also like」＋「Complete the set（三件組優惠）」 | 中 |
| **9** | **評價系統** | 初期可用手動置入的藏家見證（不用急著接 Trustpilot） | 小 |
| **10** | **加工選項擴充** | 絲綢可加「表面處理」：Matte / Satin / Gloss，或「手繡編號」升級 | 中 |

---

## 四、明確不抄的

| Displate 做法 | 為什麼不抄 |
|---|---|
| 常態 `UP TO 25% OFF` | **奢侈品打折＝自貶身價**。$1,680 的作品打七折，客人會懷疑原價是假的 |
| 250 萬設計什麼都賣 | LYS 的價值在「精選」。雜亂會稀釋品牌 |
| 7% 低分潤 | 留不住好藝術家。LYS 要走高價路線，分潤也要有誠意 |
| 客製化上傳照片 | 定位衝突。奢侈品不該讓人上傳生活照做成絲綢 |

---

## 五、🔴 需要軒哥拍板的三題（卡住第一階段）

| # | 問題 | 為什麼卡 | 軒哥拍板（2026-09-05） |
|---|---|---|---|
| **A** | **金流商要用哪個？** | 沒有金流就沒有購物車 | ✅ **Stripe**（國際卡、信用卡/Apple Pay/Google Pay 一次打通；澳門可用，KYC 用護照+銀行帳戶） |
| **B** | **收款幣別？** | 不同地區客人習慣不同 | ✅ **USD / MOP / HKD / NTD** 四幣別前台切換；Stripe 後台只收 USD，前台用匯率換算顯示 |
| **C** | **藝術家分潤幾趴？** | 影響招募文案與定價 | ✅ **7-40% 三階制**：tier-a（頭牌/IP 授權）40%、tier-b（簽約）30%、tier-c（新銳）7-15%；NFT 暫不開放 |
| **D** | **按鈕做幾款 size？** | Displate 有 Pay / Buy Now / Reserve 三種 | ✅ **三款**：小 Pay（列表）/ 中 Buy Now（詳情）/ 大 Reserve Edition（限量區，金色） |

> 對應 commit：`e39bdb0` · feat: Stripe 多幣別 + 7-40% 三階藝術家分潤（NFT 暫不開放）

### 本次實作明細（commit e39bdb0，2026-09-05 21:00）

**改了 3 個檔 / +253 行 / -26 行：**

| 檔案 | 改動 |
|---|---|
| `data/settings.json` | 加 currencies（USD/MOP/HKD/NTD 與匯率）、defaultCurrency、paymentMethods.stripe、royaltyTiers 三階、paymentButtons 三款 size、showNftEdition=false |
| `data/products.json` | 12 件商品全加 royaltyTierId 與 stripeLinks.{small,medium,large}；第 12 號 The Godfather — NFT 設 enabled=false |
| `index.html` | 加 CSS（btn-pay-small / btn-reserve / currency-switcher / royalty-tag）、nav 加幣別切換器、商品卡加 Pay 小按鈕、詳情頁 Reserve+Buy 雙按鈕接 Stripe Link（含 mailto fallback）、NFT box 條件渲染 |

### 設計亮點

1. **Stripe Payment Links 而非 API 串接**
   - 不寫一行 Stripe SDK、不存 API key
   - 軒哥到 Stripe Dashboard 建帳號 → 為每件商品建 3 個 Payment Link → 複製網址
   - 把網址填回 `products[].stripeLinks.{small,medium,large}`
   - 商品頁按鈕直接 `window.open(link, '_blank')` 連到 Stripe 收款頁

2. **Stripe Link 缺失降級**
   - 没填連結時，按鈕變灰但仍可點擊（`data-stripe-ready="false"`）
   - fallback 為 `mailto:seanown@gmail.com?subject=Reserved%20作品名`
   - 避免「按下去沒反應」破壞品牌信任

3. **幣別即時切換**
   - 全部價格（包括 size priceAdd 與 delivery price）即時換算
   - 不依賴外部匯率 API（先用寫死匯率，下一輪可改 fetch live rates）
   - 切幣別時 `setCurrency()` 重繪 home-products、shop-products、當前 product detail

4. **NFT 雙道開關**
   - 商品 `enabled:false` + settings `showNftEdition:false` 兩道獨立
   - 重啟 NFT 時一個改回 true、一個改回 true，缺一不可（防呆）

5. **三階分潤而非單一比例**
   - 後台可自己調 `tier-a/b/c` 的 rateStandard 與 rateCollector
   - 顯示在前台商品頁：`Artist Royalty · 40% · Headlining Artist`
   - 為未來招募頂級藝術家（如 Bruce Lee IP 衍生）保留 30-40% 空間

### 待做（下一輪）

| # | 項目 | 緊急度 |
|---|---|---|
| **F1** | `admin/index.html`：分潤階級編輯、幣別匯率編輯、Stripe Links 編輯區、顯示隱藏 NFT 開關 | 🟡 高（讓軒哥可自改） |
| **F2** | `build.py` + `lys-preview-backup.html`：把金流邏輯同步到源頭，避免未來重 build 覆蓋 | 🟡 高 |
| **F3** | For Artists 頁文案：25-30%/35-40%/8-10% → 新三階 7-40% | 🟢 中 |
| **F4** | 信任標記區塊（博物館級蠶絲 / 可溶解背襯 / 禮盒包裝 / 全球配送） | 🟢 中（第一階段感覺改） |
| **F5** | 到貨預估（依 IP 判「配送至 [地區] · 約 N 個工作天」） | 🟢 中 |
| **F6** | 放大稀缺數字：「42 days left **or** until 500 sold」位置 | 🟢 中（最容易的視覺衝擊） |
| **F7** | 藝術家專頁 | 🔴 等 Stripe 上線後做（配合官網招募） |

---

## 六、建議的執行順序

```
現在              → 補 #2 #3（信任標記 + 到貨預估）      小改，立刻有感
軒哥決定 A/B 之後 → 做 #1（購物車 + 結帳）               網站從「展示」變「商店」
同步              → 做 #5 #6（藝術家專頁 + 分潤公開）     供給端開始轉動
有流量之後        → #7 #8 #9 #10                        黏著度與回購
```

---

## 七、補充觀察

- **LYS 已經有 Displate 沒有的東西**：展覽線下通路（澳門/北京/台北/巴黎）、
  NFT 1/1 區塊鏈驗證、絲綢可溶解背襯（能當絲巾戴）。
  **這三項是差異化，改造時要保留並放大。**
- **Displate 最值得學的不是功能，是「稀缺性的呈現方式」**：
  它把「42 days left **or** until 500 sold」放在價格正上方，
  時間與數量雙重夾擊。LYS 有資料但埋在藝術家名字後面一行小字，可惜了。
