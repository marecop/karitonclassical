# 如何添加新文章 - Kariton Classical

## 📋 概述

本文檔說明如何在 Kariton Classical 網站中添加新的文章。系統使用模板化設計，讓您能夠輕鬆添加新內容。

## 🗂️ 文件結構

```
src/
├── data/
│   └── articles.ts          # 文章資料庫
├── app/
│   └── news/
│       ├── page.tsx         # 消息列表頁面
│       └── [slug]/
│           └── page.tsx     # 文章詳情頁面
```

## ✍️ 添加新文章

### 1. 打開文章資料庫

編輯檔案：`src/data/articles.ts`

### 2. 在 `articlesDatabase` 陣列中添加新文章

```typescript
{
  id: 'your-article-slug',                    // 唯一識別符，用於 URL
  title: '文章標題',                           // 文章標題
  category: 'concerts',                       // 分類：concerts, releases, interviews, awards, education
  date: '2025年1月15日',                      // 發布日期
  author: '作者姓名',                         // 作者
  excerpt: '文章摘要，約100-150字...',         // 簡短摘要
  image: '/images/your-image.JPG',           // 特色圖片路徑
  readTime: 8,                               // 預估閱讀時間（分鐘）
  featured: false,                           // 是否為精選文章
  tags: ['標籤1', '標籤2', '標籤3'],          // 相關標籤
  content: `
    # 文章標題
    
    文章內容使用 Markdown 格式...
  `,
  relatedArticles: ['article-id-1', 'article-id-2']  // 相關文章ID（可選）
}
```

## 📝 Markdown 語法支援

文章內容支援以下 Markdown 語法：

### 標題
```markdown
# 一級標題
## 二級標題  
### 三級標題
```

### 段落
```markdown
普通段落文字。

另一個段落。
```

### 強調
```markdown
**粗體文字**
*斜體文字*
```

### 引用
```markdown
> 這是一段引用文字
```

### 列表
```markdown
- 列表項目 1
- 列表項目 2
- 列表項目 3
```

### 分隔線
```markdown
---
```

## 🎨 文章分類

選擇適當的分類：

- **concerts** (🎭) - 音樂會相關新聞
- **releases** (🎵) - 新發行、新技術
- **interviews** (🎤) - 藝術家專訪
- **awards** (🏆) - 獎項、比賽
- **education** (📚) - 音樂教育

## 🖼️ 圖片管理

1. 將圖片放置在 `public/images/` 目錄下
2. 使用相對路徑：`/images/your-image.JPG`
3. 建議圖片尺寸：1920x1080 或更高
4. 支援格式：JPG, PNG, WebP

## 🏷️ 標籤建議

使用相關且具描述性的標籤：

**音樂家類型**
- 青年音樂家、大師級音樂家、指揮家、獨奏家

**樂器類型**  
- 鋼琴、小提琴、大提琴、管弦樂

**音樂風格**
- 古典音樂、巴洛克、浪漫主義、現代音樂

**地區/機構**
- 維也納愛樂、柏林愛樂、台灣音樂家、亞洲音樂

**技術/趨勢**
- VR技術、AI技術、串流音樂、數字音樂

## 🔗 相關文章設定

為提高用戶體驗，可設定相關文章：

```typescript
relatedArticles: [
  'vienna-new-year-concert-2025',    // 相關文章1的ID
  'berlin-philharmonic-vr',          // 相關文章2的ID
  'young-pianist-interview'          // 相關文章3的ID
]
```

## ⭐ 精選文章

設定 `featured: true` 可讓文章顯示在消息頁面的精選區域：

```typescript
featured: true,  // 此文章將在首頁顯著位置展示
```

**注意**: 建議同時只有1-2篇精選文章。

## 📊 文章統計

系統會自動統計：
- 各分類的文章數量
- 閱讀時間顯示
- 發布日期排序

## 🔄 更新現有文章

1. 找到對應的文章ID
2. 修改相應欄位
3. 保存檔案即可

## 🧪 測試新文章

添加文章後：

1. 重新啟動開發伺服器：`npm run dev`
2. 訪問消息頁面：`http://localhost:3000/news`
3. 點擊文章連結測試詳情頁面
4. 檢查相關文章連結是否正常

## 📱 文章URL格式

文章URL格式：`/news/[文章ID]`

範例：
- `vienna-new-year-concert-2025` → `/news/vienna-new-year-concert-2025`
- `berlin-philharmonic-vr` → `/news/berlin-philharmonic-vr`

## 💡 最佳實踐

### 文章ID命名
- 使用小寫英文
- 用連字符分隔單詞
- 具有描述性
- 保持簡潔

### 內容撰寫
- 標題簡潔有力
- 摘要吸引讀者
- 內容結構清晰
- 適當使用標題分段

### 圖片選擇
- 高品質圖片
- 與內容相關
- 適當的檔案大小

## 🚀 範例文章

可參考現有文章作為模板：

1. **維也納新年音樂會** - 音樂會報導範例
2. **柏林愛樂VR體驗** - 技術新聞範例  
3. **青年鋼琴家專訪** - 人物專訪範例

## ❓ 常見問題

**Q: 文章不顯示怎麼辦？**
A: 檢查ID是否唯一，語法是否正確，重新啟動伺服器。

**Q: 圖片無法顯示？**
A: 確認圖片路徑正確，檔案存在於 `public/images/` 目錄。

**Q: 相關文章連結失效？**
A: 檢查 `relatedArticles` 中的ID是否存在於資料庫中。

---

## 📞 技術支援

如有問題請檢查：
1. 語法是否正確
2. ID是否唯一
3. 圖片路徑是否正確
4. 重新啟動開發伺服器

*Happy Writing! 🎼*
