# Kariton Classical 加里敦古典音樂

一個現代化的古典音樂網站，使用 Next.js 14、TypeScript 和 Tailwind CSS 構建，支援多語言功能。

## 🚀 功能特色

- **多語言支援**: 支援繁體中文、英文、德文
- **響應式設計**: 完美適配桌面、平板和手機
- **專輯管理**: 輕鬆添加和管理專輯信息
- **現代化UI**: 簡約優雅的設計風格
- **高性能**: 基於 Next.js 14 的最新功能
- **SEO 優化**: 內建搜索引擎優化
- **專輯詳情頁**: 每個專輯都有詳細的介紹頁面
- **購買功能**: 完整的購買流程和表單驗證
- **自動郵件**: 購買後自動發送確認郵件
- **PDF收據**: 自動生成專業的購買收據PDF文件

## 📦 技術棧

- **框架**: Next.js 14 with App Router
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **國際化**: next-intl
- **圖片優化**: Next.js Image Optimization

## 🏃‍♂️ 快速開始

### 安裝依賴

\`\`\`bash
npm install
\`\`\`

### 開發環境

\`\`\`bash
npm run dev
\`\`\`

在瀏覽器中打開 [http://localhost:3000](http://localhost:3000) 查看結果。

### 建構生產版本

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 項目結構

\`\`\`
karitonclassical/
├── src/
│   ├── app/
│   │   ├── [locale]/          # 多語言路由
│   │   │   ├── page.tsx       # 首頁
│   │   │   ├── releases/      # 發行頁面
│   │   │   ├── about/         # 關於頁面
│   │   │   └── layout.tsx     # 語言布局
│   │   ├── globals.css        # 全域樣式
│   │   └── layout.tsx         # 根布局
│   ├── components/            # React 組件
│   │   ├── Navigation.tsx     # 導航組件
│   │   ├── HeroSection.tsx    # 英雄區塊
│   │   ├── AlbumCard.tsx      # 專輯卡片
│   │   ├── FeaturedAlbums.tsx # 精選專輯
│   │   ├── NewsSection.tsx    # 新聞區塊
│   │   └── Footer.tsx         # 頁腳
│   ├── data/
│   │   └── albums.ts          # 專輯數據配置
│   ├── lib/                   # 工具函數
│   └── i18n.ts               # 國際化配置
├── messages/                  # 翻譯文件
│   ├── zh-TW.json            # 繁體中文
│   ├── en.json               # 英文
│   └── de.json               # 德文
├── public/
│   └── images/               # 圖片資源
└── 配置文件...
\`\`\`

## 🎵 添加新專輯

要添加新專輯，請編輯 \`src/data/albums.ts\` 文件：

1. 將專輯封面圖片放到 \`public/images/\` 目錄
2. 在 \`albums\` 數組中添加新的專輯對象
3. 在翻譯文件中添加對應的標題、藝術家和描述信息

### 專輯對象結構

\`\`\`typescript
{
  id: 'unique-album-id',
  titleKey: 'albums.albumId.title',
  artistKey: 'albums.albumId.artist', 
  descriptionKey: 'albums.albumId.description',
  image: '/images/album-cover.jpg',
  releaseDate: '2025-01-01',
  featured: true,  // 是否為精選專輯
  type: 'concert' | 'collection'
}
\`\`\`

### 添加翻譯

在 \`messages/\` 目錄下的各語言文件中添加：

\`\`\`json
{
  "albums": {
    "albumId": {
      "title": "專輯標題",
      "artist": "藝術家名稱",
      "description": "專輯描述"
    }
  }
}
\`\`\`

## 🌐 語言配置

支援的語言在以下文件中配置：
- \`src/i18n.ts\` - 國際化主配置
- \`middleware.ts\` - 路由中間件配置

要添加新語言：
1. 在 \`locales\` 數組中添加語言代碼
2. 創建對應的翻譯文件 \`messages/[locale].json\`
3. 在導航組件中添加語言選項

## 🎨 自定義樣式

項目使用 Tailwind CSS，主要配置在：
- \`tailwind.config.js\` - Tailwind 配置
- \`src/app/globals.css\` - 全域樣式和自定義組件類

### 主要顏色變數

- \`primary-600\`: 主品牌色 (#dc2626)
- \`neutral-*\`: 灰階色彩
- 可在 \`tailwind.config.js\` 中自定義

## 📱 響應式設計

所有組件都採用響應式設計：
- 使用 Tailwind 的響應式前綴 (\`sm:\`, \`md:\`, \`lg:\`, \`xl:\`)
- 圖片使用 Next.js Image 組件進行優化
- 導航在移動設備上顯示為漢堡選單

## 🔧 配置文件說明

- \`next.config.js\`: Next.js 配置，包含圖片優化和國際化
- \`tsconfig.json\`: TypeScript 配置
- \`postcss.config.js\`: PostCSS 配置（Tailwind CSS）
- \`middleware.ts\`: 處理多語言路由

## 🛒 購買功能

### 功能概述
- **專輯詳情頁面**: 每個專輯都有詳細的信息頁面
- **購買表單**: 完整的客戶信息收集和格式選擇
- **表單驗證**: 前端和後端雙重驗證
- **訂單處理**: 生成唯一訂單ID和時間戳
- **自動郵件**: 購買成功後自動發送確認郵件
- **PDF收據**: 自動生成專業的購買收據

### 購買流程
1. 在專輯卡片或詳情頁點擊"立即購買"
2. 填寫客戶信息（姓名、電子郵件等）
3. 選擇購買格式（CD、Digital、Vinyl等）
4. 確認訂單信息
5. 提交購買請求
6. 系統生成PDF收據並發送確認郵件

### 郵件配置
在生產環境中，請配置以下環境變數：
\`\`\`bash
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
SMTP_FROM="Your Name <noreply@domain.com>"
\`\`\`

### 開發模式
在開發環境中，購買功能會模擬郵件發送，不會實際發送郵件，但會在控制台顯示相關信息。

## 🚀 部署

本項目可以部署到各種平台：

### Vercel (推薦)
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### 其他平台
\`\`\`bash
npm run build
\`\`\`
然後部署 \`.next\` 目錄的內容。

## 📄 許可證

此項目為私人項目，保留所有權利。

## 🤝 貢獻

如需修改或添加功能，請：
1. 確保代碼符合現有的風格標準
2. 添加適當的註釋
3. 測試響應式設計和多語言功能
4. 更新相關文檔

---

**Kariton Classical** - 探索古典音樂的永恆之美
