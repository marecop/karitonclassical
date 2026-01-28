'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Newspaper, Music, Mic, Trophy, BookOpen, Search, Users, Video } from 'lucide-react';
import { getAllArticles } from '@/data/articles';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const newsCategories = [
    { id: 'all', name: '全部', icon: <Newspaper className="w-5 h-5" />, count: 18 },
    { id: 'concerts', name: '音樂會', icon: <Music className="w-5 h-5" />, count: 6 },
    { id: 'releases', name: '新發行', icon: <Music className="w-5 h-5" />, count: 5 },
    { id: 'interviews', name: '專訪', icon: <Mic className="w-5 h-5" />, count: 4 },
    { id: 'awards', name: '獎項', icon: <Trophy className="w-5 h-5" />, count: 3 }
  ];

  // 從資料庫獲取所有文章
  const allArticles = getAllArticles();
  
  // 獲取精選文章
  const featuredNews = allArticles.find(article => article.featured) || allArticles[0];

  // 獲取非精選的文章作為列表文章
  const newsArticles = allArticles.filter(article => article.id !== featuredNews.id);

  const trendingTopics = [
    { name: '維也納新年音樂會', count: 1250 },
    { name: '古典音樂教育', count: 890 },
    { name: '年輕音樂家', count: 750 },
    { name: 'AI與音樂', count: 680 },
    { name: '音樂節目單', count: 520 }
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
                         article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-8 pb-16">
        {/* 頁面標題區域 */}
        <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/Yellow Philharmoniker.png"
              alt="Classical Music News"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-8">
                <Newspaper className="w-10 h-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                最新消息
              </h1>
              <p className="text-xl md:text-2xl font-light mb-8 text-neutral-200 max-w-3xl mx-auto animate-fade-in-up">
                掌握古典音樂界的最新動態與深度報導
              </p>
              <div className="w-32 h-1 bg-white bg-opacity-30 mx-auto animate-fade-in-up"></div>
            </div>
          </div>
        </section>

        {/* 搜尋和分類區域 */}
        <section className="py-12 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 搜尋框 */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜尋新聞、藝術家或關鍵字..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pr-12 text-lg border border-neutral-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-neutral-400" />
              </div>
            </div>

            {/* 分類篩選 */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {newsCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-neutral-700 hover:bg-primary-50 shadow-md'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 精選新聞 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">精選報導</h2>
              <div className="w-24 h-1 bg-primary-600"></div>
            </div>

            <article className="bg-gradient-to-r from-white to-neutral-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative aspect-video lg:aspect-square overflow-hidden">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      精選
                    </span>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                                          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        {newsCategories.find(cat => cat.id === featuredNews.category)?.icon || <Music className="w-4 h-4" />} 
                        {newsCategories.find(cat => cat.id === featuredNews.category)?.name || '音樂會'}
                      </span>
                    <span className="text-neutral-500 text-sm">{featuredNews.date}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4 leading-tight">
                    {featuredNews.title}
                  </h3>
                  
                  <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                    {featuredNews.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-neutral-500">作者：{featuredNews.author}</span>
                      <span className="text-sm text-neutral-500">閱讀時間：{featuredNews.readTime} 分鐘</span>
                    </div>
                    <Link 
                      href={`/news/${featuredNews.id}`}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                    >
                      <span>閱讀全文</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {featuredNews.tags && featuredNews.tags.map((tag, index) => (
                      <span key={index} className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* 新聞列表 */}
        <section className="py-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* 主要新聞列表 */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-neutral-900">
                    最新報導 ({filteredNews.length})
                  </h2>
                  <select className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>最新發布</option>
                    <option>最多閱讀</option>
                    <option>最多評論</option>
                  </select>
                </div>

                <div className="space-y-8">
                  {filteredNews.map((article) => (
                    <article key={article.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        <div className="relative aspect-video md:aspect-square overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="md:col-span-2 p-6">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                              {newsCategories.find(cat => cat.id === article.category)?.icon || <Newspaper className="w-3 h-3" />} 
                              {newsCategories.find(cat => cat.id === article.category)?.name || '新聞'}
                            </span>
                            <span className="text-neutral-500 text-sm">{article.date}</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                            {article.title}
                          </h3>
                          
                          <p className="text-neutral-600 mb-4 leading-relaxed">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-sm text-neutral-500">
                              <span>作者：{article.author}</span>
                              <span>•</span>
                              <span>{article.readTime} 分鐘閱讀</span>
                            </div>
                            <Link 
                              href={`/news/${article.id}`}
                              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                            >
                              閱讀更多
                            </Link>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {article.tags && article.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* 載入更多按鈕 */}
                <div className="text-center mt-12">
                  <button className="btn-secondary">
                    載入更多新聞
                  </button>
                </div>
              </div>

              {/* 側邊欄 */}
              <div className="space-y-8">
                {/* 熱門話題 */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">熱門話題</h3>
                  <div className="space-y-4">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-b-0">
                        <span className="text-neutral-700 hover:text-primary-600 cursor-pointer transition-colors duration-200">
                          {topic.name}
                        </span>
                        <span className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded text-sm">
                          {topic.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 訂閱電子報 */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">訂閱我們的電子報</h3>
                  <p className="text-primary-100 mb-6">
                    獲得最新的古典音樂新聞和獨家內容
                  </p>
                  <Link
                    href="/newsletter"
                    className="inline-block w-full bg-white text-primary-600 font-medium py-3 px-6 rounded-lg text-center hover:bg-primary-50 transition-colors duration-200"
                  >
                    立即訂閱
                  </Link>
                </div>

                {/* 相關連結 */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">相關連結</h3>
                  <div className="space-y-3">
                    <Link href="/releases" className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200">
                      <Music className="w-4 h-4" /> 最新發行
                    </Link>
                    <Link href="/artists" className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200">
                      <Users className="w-4 h-4" /> 藝術家介紹
                    </Link>
                    <Link href="/legacy" className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200">
                      <BookOpen className="w-4 h-4" /> 音樂傳承
                    </Link>
                    <Link href="/videos" className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200">
                      <Video className="w-4 h-4" /> 精彩影片
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}