# 如何添加新藝術家 - Kariton Classical

## 📋 概述

本文檔說明如何在 Kariton Classical 網站中添加新的藝術家。系統使用模板化設計，讓您能夠輕鬆管理藝術家資料。

## 🗂️ 文件結構

```
src/
├── data/
│   └── artists.ts           # 藝術家資料庫
├── app/
│   └── artists/
│       ├── page.tsx         # 藝術家列表頁面
│       └── [slug]/
│           └── page.tsx     # 藝術家詳情頁面
public/
└── images/                  # 藝術家照片存放位置
```

## ✍️ 添加新藝術家

### 1. 準備藝術家照片

將藝術家照片放置到 `public/images/` 目錄：
- **檔案格式**: JPG, PNG
- **建議尺寸**: 800x800 或更高（正方形）
- **檔案命名**: 使用藝術家姓名，如 `John Smith.JPG`

### 2. 編輯藝術家資料庫

打開 `src/data/artists.ts` 文件，在 `artistsDatabase` 陣列中添加新藝術家：

```typescript
{
  id: 'artist-slug',                          // 唯一識別符，用於 URL
  name: '藝術家姓名',                         // 完整姓名
  category: 'pianist',                        // 分類（見下方說明）
  nationality: '國籍',                        // 國籍
  birthYear: 1990,                           // 出生年份
  image: '/images/Artist Name.JPG',          // 照片路徑
  bio: '簡短介紹，約100字...',                // 一句話介紹
  fullBio: `完整的藝術家傳記...`,             // 詳細傳記（支援 Markdown）
  achievements: [                            // 重要成就陣列
    '成就1',
    '成就2'
  ],
  repertoire: [                              // 代表曲目
    '作品1',
    '作品2'
  ],
  awards: [                                  // 獲得獎項
    '獎項1',
    '獎項2'
  ],
  education: [                               // 教育背景
    '學校或導師信息'
  ],
  socialMedia: {                             // 社交媒體（可選）
    website: 'https://...',
    instagram: '@username',
    youtube: 'Channel Name',
    spotify: 'Artist Name'
  },
  featured: false,                           // 是否為精選藝術家
  status: 'active'                           // 狀態：active, retired, historical
}
```

## 🎭 藝術家分類

選擇適當的分類：

- **pianist** (🎹) - 鋼琴家
- **violinist** (🎻) - 小提琴家  
- **conductor** (🎼) - 指揮家
- **cellist** (🎻) - 大提琴家
- **composer** (✍️) - 作曲家
- **singer** (🎤) - 歌唱家
- **ensemble** (🎵) - 樂團

## 📝 撰寫藝術家傳記

### 簡短介紹 (bio)
- 長度：100-150字
- 內容：主要成就、演奏風格特色
- 範例：「英國新生代鋼琴家，以其精湛的技巧和深刻的音樂理解力聞名於國際音樂舞台。」

### 完整傳記 (fullBio)
支援 Markdown 格式：

```markdown
藝術家姓名 是當代最受矚目的年輕鋼琴家之一。出生於...

## 早期經歷
描述童年和音樂啟蒙...

## 職業生涯
重要的演出和成就...

## 藝術風格
演奏特色和音樂理念...
```

## 🏆 成就和獎項

### 重要成就 (achievements)
列出重要的職業里程碑：
- 國際比賽獲獎
- 重要樂團合作
- 專輯發行
- 教職任命

### 獲得獎項 (awards)
具體的獎項名稱：
- 正式獎項名稱
- 榮譽勳章
- 學術榮譽

## 🎵 曲目和作品

### 代表曲目 (repertoire)
- 列出藝術家最知名的演出曲目
- 包含作曲家和作品名稱
- 範例：「貝多芬：皇帝協奏曲」

### 唱片作品 (discography) - 可選
```typescript
discography: [
  {
    title: '專輯名稱',
    year: 2023,
    label: '唱片公司',
    works: ['收錄作品1', '收錄作品2']
  }
]
```

### 即將演出 (upcomingConcerts) - 可選
```typescript
upcomingConcerts: [
  {
    date: '2025年3月15日',
    venue: '音樂廳名稱',
    city: '城市',
    program: ['演出曲目1', '演出曲目2']
  }
]
```

## 🌟 精選藝術家

設定 `featured: true` 可讓藝術家顯示在首頁精選區域：

```typescript
featured: true,  // 此藝術家將在首頁顯著展示
```

**注意**: 建議同時只有2-3位精選藝術家。

## 📱 藝術家頁面URL格式

藝術家頁面URL格式：`/artists/[藝術家ID]`

範例：
- `clara-ashford` → `/artists/clara-ashford`
- `heinrich-falkenhorst` → `/artists/heinrich-falkenhorst`

## 🔗 社交媒體整合

可選的社交媒體連結：

```typescript
socialMedia: {
  website: 'https://artist-website.com',      // 官方網站
  instagram: '@artistname',                   // Instagram 用戶名
  youtube: 'Artist Channel Name',             // YouTube 頻道名
  spotify: 'Artist Name'                      // Spotify 藝術家名
}
```

## 💡 最佳實踐

### ID 命名規則
- 使用小寫英文
- 用連字符分隔單詞
- 具有識別性
- 保持簡潔

範例：
- `clara-ashford`
- `yo-yo-ma`
- `gustavo-dudamel`

### 照片要求
- **品質**: 高解析度專業照片
- **尺寸**: 建議 800x800 像素或更高
- **格式**: JPG 或 PNG
- **內容**: 正式演出照或專業肖像

### 內容撰寫
- **準確性**: 確保所有信息準確無誤
- **完整性**: 包含重要的職業資訊
- **可讀性**: 使用清晰易懂的語言
- **時效性**: 保持信息更新

## 🧪 測試新藝術家

添加藝術家後：

1. 重新啟動開發伺服器：`npm run dev`
2. 訪問藝術家頁面：`http://localhost:3000/artists`
3. 檢查新藝術家是否出現在列表中
4. 點擊藝術家卡片測試詳情頁面
5. 測試搜尋和篩選功能

## 📊 藝術家統計

系統會自動統計：
- 各分類的藝術家數量
- 總藝術家數
- 活躍藝術家數
- 國家地區數量

## 🔄 更新現有藝術家

1. 找到對應的藝術家 ID
2. 修改相應欄位
3. 保存檔案即可

## 📋 範例藝術家

可參考現有藝術家作為模板：

1. **Clara Ashford** - 鋼琴家範例
2. **Heinrich Falkenhorst** - 指揮家範例
3. **Serena Vitale** - 小提琴家範例

## ❓ 常見問題

**Q: 藝術家不顯示怎麼辦？**
A: 檢查 ID 是否唯一，語法是否正確，重新啟動伺服器。

**Q: 照片無法顯示？**
A: 確認照片路徑正確，檔案存在於 `public/images/` 目錄。

**Q: 如何設定精選藝術家？**
A: 設定 `featured: true`，建議同時只有2-3位精選藝術家。

**Q: 分類顯示錯誤？**
A: 確認 `category` 欄位使用正確的值（pianist, violinist, conductor等）。

---

## 📞 技術支援

如有問題請檢查：
1. 語法是否正確
2. ID 是否唯一
3. 照片路徑是否正確
4. 重新啟動開發伺服器

*讓音樂家們閃耀在 Kariton Classical 的舞台上！🎼*
