'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Music, Mic, Trophy, BookOpen, Newspaper, ChevronRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getArticleById, getRelatedArticles, getAllArticles } from '@/data/articles';
import { notFound } from 'next/navigation';

// Markdown 渲染組件
function MarkdownRenderer({ content }: { content: string }) {
  // 簡單的 Markdown 解析
  const renderContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // 標題
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-4xl font-bold text-neutral-900 mb-6 mt-8">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-3xl font-bold text-neutral-900 mb-4 mt-8">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-2xl font-bold text-neutral-900 mb-3 mt-6">{line.substring(4)}</h3>;
        }
        
        // 引用
        if (line.startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-primary-500 bg-primary-50 pl-6 py-4 my-6 italic text-lg">
              {line.substring(2)}
            </blockquote>
          );
        }
        
        // 列表項
        if (line.startsWith('- ')) {
          return <li key={index} className="mb-2">{line.substring(2)}</li>;
        }
        
        // 粗體文字
        if (line.includes('**')) {
          const parts = line.split('**');
          return (
            <p key={index} className="mb-4 leading-relaxed text-neutral-700">
              {parts.map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="font-bold text-neutral-900">{part}</strong> : part
              )}
            </p>
          );
        }
        
        // 斜體文字
        if (line.includes('*') && !line.includes('**')) {
          const parts = line.split('*');
          return (
            <p key={index} className="mb-4 leading-relaxed text-neutral-700">
              {parts.map((part, i) => 
                i % 2 === 1 ? <em key={i} className="italic">{part}</em> : part
              )}
            </p>
          );
        }
        
        // 分隔線
        if (line.trim() === '---') {
          return <hr key={index} className="my-8 border-neutral-200" />;
        }
        
        // 空行
        if (line.trim() === '') {
          return <br key={index} />;
        }
        
        // 普通段落
        return <p key={index} className="mb-4 leading-relaxed text-neutral-700">{line}</p>;
      });
  };

  return <div className="prose prose-lg max-w-none">{renderContent(content)}</div>;
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const article = getArticleById(slug);
  
  if (!article) {
    notFound();
  }
  
  const relatedArticles = getRelatedArticles(article.id);
  
  const categoryConfig = {
    concerts: { name: '音樂會', icon: <Music className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700' },
    releases: { name: '新發行', icon: <Newspaper className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700' },
    interviews: { name: '專訪', icon: <Mic className="w-4 h-4" />, color: 'bg-green-100 text-green-700' },
    awards: { name: '獎項', icon: <Trophy className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-700' },
    education: { name: '教育', icon: <BookOpen className="w-4 h-4" />, color: 'bg-red-100 text-red-700' }
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      <Navigation />
      
      {/* 麵包屑導航 */}
      <div className="bg-neutral-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-neutral-500 hover:text-primary-600 transition-colors duration-200">
              首頁
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-neutral-400" />
            <Link href="/news" className="text-neutral-500 hover:text-primary-600 transition-colors duration-200">
              消息
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-neutral-400" />
            <span className="text-neutral-900 font-medium truncate">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      <main className="pt-8 pb-16">
        {/* 文章標題區域 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article>
            {/* 文章元資訊 */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryConfig[article.category].color}`}>
                {categoryConfig[article.category].icon} {categoryConfig[article.category].name}
              </span>
              <span className="text-neutral-500 text-sm">{article.date}</span>
              <span className="text-neutral-500 text-sm">閱讀時間 {article.readTime} 分鐘</span>
            </div>

            {/* 文章標題 */}
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* 作者和分享 */}
            <div className="flex items-center justify-between pb-8 mb-8 border-b border-neutral-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-bold text-lg">
                    {article.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-neutral-900">作者：{article.author}</p>
                  <p className="text-sm text-neutral-500">專業音樂記者</p>
                </div>
              </div>
              
              {/* 分享按鈕 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-neutral-500 flex items-center gap-1">
                  <Share2 className="w-4 h-4" /> 分享：
                </span>
                <button className="p-2 bg-neutral-100 hover:bg-primary-100 rounded-full transition-colors duration-200">
                  <Facebook className="w-5 h-5 text-neutral-600" />
                </button>
                <button className="p-2 bg-neutral-100 hover:bg-primary-100 rounded-full transition-colors duration-200">
                  <Twitter className="w-5 h-5 text-neutral-600" />
                </button>
                <button className="p-2 bg-neutral-100 hover:bg-primary-100 rounded-full transition-colors duration-200">
                  <Linkedin className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
            </div>

            {/* 特色圖片 */}
            <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 文章摘要 */}
            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-primary-800 leading-relaxed italic">
                {article.excerpt}
              </p>
            </div>

            {/* 文章內容 */}
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer content={article.content} />
            </div>

            {/* 文章標籤 */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">相關標籤</h3>
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-neutral-100 hover:bg-primary-100 text-neutral-700 px-4 py-2 rounded-full text-sm transition-colors duration-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>

        {/* 相關文章 */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 bg-neutral-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">相關文章</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/news/${relatedArticle.id}`}>
                    <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${categoryConfig[relatedArticle.category].color}`}>
                            {categoryConfig[relatedArticle.category].icon} {categoryConfig[relatedArticle.category].name}
                          </span>
                          <span className="text-neutral-500 text-xs">{relatedArticle.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xs text-neutral-500">
                            {relatedArticle.readTime} 分鐘閱讀
                          </span>
                          <span className="text-primary-600 text-sm font-medium group-hover:underline">
                            閱讀更多 →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 返回和訂閱區域 */}
        <section className="mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">喜歡這篇文章嗎？</h3>
              <p className="text-primary-100 mb-6">
                訂閱我們的電子報，獲得更多精彩的古典音樂內容和獨家報導
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/newsletter"
                  className="bg-white text-primary-600 font-medium px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                >
                  訂閱電子報
                </Link>
                <Link
                  href="/news"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  更多文章
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
