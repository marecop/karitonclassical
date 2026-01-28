'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * 新聞區塊組件
 * 展示最新消息和動態
 */
export default function NewsSection() {

  // 模擬新聞數據（您可以後續從API或CMS獲取）
  const newsItems = [
    {
      id: 1,
      title: '2025年夏日音樂會即將開始',
      excerpt: '維也納愛樂樂團將在美泉宮帶來精彩的夏日音樂會演出...',
      image: '/images/sommerkonzert2025.JPG',
      date: '2025-01-15',
      category: '音樂會'
    },
    {
      id: 2,
      title: '新年音樂會2025圓滿成功',
      excerpt: '2025年維也納新年音樂會在金色大廳成功舉辦，為全球觀眾帶來了...',
      image: '/images/neujahrskonzert2025.JPG',
      date: '2025-01-02',
      category: '回顧'
    },
    {
      id: 3,
      title: '偉大古典音樂合集現已發行',
      excerpt: '精選古典音樂史上最偉大的作品，由世界頂尖藝術家演奏...',
      image: '/images/greatclassicalcollect.JPG',
      date: '2024-03-21',
      category: '發行'
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 區塊標題 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            最新消息
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>
        
        {/* 新聞網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <article key={news.id} className="card group cursor-pointer overflow-hidden animate-fade-in-up">
              {/* 新聞圖片 */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* 分類標籤 */}
                <div className="absolute top-3 left-3">
                  <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {news.category}
                  </span>
                </div>
              </div>
              
              {/* 新聞內容 */}
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
                  {news.title}
                </h3>
                
                <p className="text-neutral-600 mb-4">
                  {news.excerpt}
                </p>
                
                {/* 日期和閱讀更多 */}
                <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                  <span className="text-sm text-neutral-400">
                    {new Date(news.date).toLocaleDateString('zh-TW', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  
                                                        <Link 
                    href="/news"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center space-x-1"
                  >
                    <span>閱讀更多</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* 查看全部新聞按鈕 */}
        <div className="text-center mt-12">
          <Link 
            href="/news"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>查看全部新聞</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
