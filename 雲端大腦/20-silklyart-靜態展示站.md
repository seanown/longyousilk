# 20 · SILKY ART 靜態展示站（2026-09-06 實做）

## 決策
軒哥選 D：先上純靜態展示站（快、收投件、不碰後端）。我將其定義為「資訊架構＋內容骨架」，視覺套用已鎖定的 Mondo 克制方向與規格書令牌；**真·藝術指導稿仍等「執行設計」**。

## 落點
`C:\Users\user\WorkBuddy\SILKY ART\`（專屬空資料夾，原本是空的）

## 七頁（對應 IA v1）
index / exhibitions / works / provenance / artists(含投稿表) / publications / about
＋ assets/css/style.css（朱紅#9E2B25、絹白#FCFCFA/#F2EDE3、墨#1C1A16、金#A08A5B；Cormorant Garamond + Noto Serif/Sans TC）
＋ assets/js/main.js（手機選單＋投稿表 mailto 至 seanown@gmail.com）

## 驗證
本機 http.server:8081 全 9 資源 200；投稿表 id/onsubmit 存在；對外紅線掃描全 0（無萬事利/IECIA/FORBES/Funko/呼吸/價格）。

## 關鍵約束（遵守）
- 不顯價格（鐵律#1，等萬事利報價）
- 不點名 萬事利/IECIA/FORBES/Funko
- 廟宇＝授權關係；世界榜單平台不進站（商會另一團隊）
- 禁用「絲綢比紙耐久／呼吸的紙」

## 上線路徑
silklyart.com（name.com, Private WHOIS）→ Netlify Drop / GitHub Pages；投稿表上線後改 Netlify Forms。
詳見 `SILKY ART/上線說明.md`。

## 下一步（待軒哥指令）
- C：打萬事利電話拿織造報價（唯一真阻塞，解鎖定價＋作品頁）
- 或「執行設計」：出 Mondo 風藝術指導稿
- 或部署上線
