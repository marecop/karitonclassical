'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState } from 'react';
import { Mail, Music, Mic, BookOpen, Trophy, Crown, Bell, Gift, Eye, ChevronRight, Check, Loader2 } from 'lucide-react';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 模擬訂閱過程
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
    setName('');
  };

  const newsletterCategories = [
    { id: 'all', name: '全部', icon: <Mail className="w-5 h-5" />, count: 24 },
    { id: 'releases', name: '新品發布', icon: <Music className="w-5 h-5" />, count: 8 },
    { id: 'concerts', name: '音樂會資訊', icon: <Music className="w-5 h-5" />, count: 6 },
    { id: 'interviews', name: '藝術家專訪', icon: <Mic className="w-5 h-5" />, count: 5 },
    { id: 'education', name: '音樂教育', icon: <BookOpen className="w-5 h-5" />, count: 5 }
  ];

  const pastNewsletters = [
    {
      id: 1,
      title: '維也納新年音樂會 2025 特別報導',
      date: '2025年1月1日',
      category: 'concerts',
      description: '深度解析 2025 年維也納新年音樂會的精彩瞬間，包含獨家幕後花絮和指揮家專訪。',
      image: '/images/neujahrskonzert2025.JPG',
      readers: 15420,
      featured: true
    },
    {
      id: 2,
      title: '古典音樂入門：巴洛克時期必聽作品',
      date: '2024年12月15日',
      category: 'education',
      description: '為古典音樂初學者精心整理的巴洛克時期經典作品指南，從巴赫到韓德爾。',
      image: '/images/greatclassicalcollect.JPG',
      readers: 12850
    },
    {
      id: 3,
      title: '專訪指揮大師：音樂詮釋的藝術',
      date: '2024年11月30日',
      category: 'interviews',
      description: '與國際知名指揮家深度對談，探討古典音樂詮釋的奧秘和指揮藝術的精髓。',
      image: '/images/neujahrskonzert2024.JPG',
      readers: 9640
    },
    {
      id: 4,
      title: '夏季音樂節精選回顧',
      date: '2024年8月20日',
      category: 'concerts',
      description: '回顧今年夏季各大音樂節的精彩演出，包含薩爾茲堡、拜律特等知名音樂節。',
      image: '/images/sommerkonzert2025.JPG',
      readers: 8730
    },
    {
      id: 5,
      title: '新發現：失傳樂譜的重現',
      date: '2024年7月10日',
      category: 'releases',
      description: '探索最近重新發現的古典音樂作品，以及它們對音樂史研究的重要意義。',
      image: '/images/neujahrskonzert2022.JPG',
      readers: 11250
    },
    {
      id: 6,
      title: '鋼琴技巧大師班：演奏秘訣分享',
      date: '2024年6月25日',
      category: 'education',
      description: '知名鋼琴家分享演奏技巧和練習方法，助您提升鋼琴演奏水平。',
      image: '/images/neujahrskonzert2021.JPG',
      readers: 7890
    }
  ];

  const benefits = [
    {
      icon: <Music className="w-8 h-8" />,
      title: '獨家內容',
      description: '獲得獨家的音樂評論、藝術家專訪和幕後花絮'
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: '優先通知',
      description: '第一時間獲得新專輯發布和音樂會演出消息'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: '音樂教育',
      description: '深度的古典音樂知識分享和學習資源'
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: '訂閱者專享',
      description: '特別優惠、活動邀請和限量版專輯預購權'
    }
  ];

  const filteredNewsletters = selectedCategory === 'all' 
    ? pastNewsletters 
    : pastNewsletters.filter(newsletter => newsletter.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white pt-16">
      <Navigation />
      <main className="pt-8 pb-16">
        {/* 頁面標題區域 */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-white bg-opacity-5"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-8">
                <Mail className="w-10 h-10" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                電子報
              </h1>
              <p className="text-xl md:text-2xl font-light mb-8 text-primary-100 max-w-3xl mx-auto animate-fade-in-up">
                獲得最新古典音樂資訊、獨家內容和精彩活動邀請
              </p>
              <div className="w-32 h-1 bg-white bg-opacity-30 mx-auto animate-fade-in-up"></div>
            </div>
          </div>
        </section>

        {/* 訂閱表單區域 */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {!isSubscribed ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                    訂閱 Kariton Classical 電子報
                  </h2>
                  <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                    加入我們的古典音樂社群，每週獲得精選內容和獨家資訊
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        姓名
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="請輸入您的姓名"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        電子郵件
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="請輸入您的電子郵件"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                          訂閱中...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5 mr-2" />
                          立即訂閱
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-neutral-500 text-center mt-6">
                    訂閱後您可以隨時取消訂閱。我們重視您的隱私，不會與第三方分享您的資訊。
                  </p>
                </form>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 lg:p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">訂閱成功！</h2>
                <p className="text-lg text-neutral-600 mb-8">
                  感謝您訂閱 Kariton Classical 電子報！您很快就會收到我們的歡迎郵件，
                  以及最新的古典音樂資訊和獨家內容。
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors duration-200"
                >
                  繼續瀏覽
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 訂閱優勢 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">為什麼訂閱我們的電子報？</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                成為 Kariton Classical 社群的一員，享受專屬的古典音樂體驗
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 group-hover:bg-primary-200 transition-colors duration-200">
                    <span className="text-2xl">{benefit.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{benefit.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 歷史電子報 */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">過往精彩內容</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                瀏覽我們之前發布的電子報，感受豐富的古典音樂內容
              </p>
            </div>

            {/* 分類篩選 */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {newsletterCategories.map((category) => (
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

            {/* 電子報列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNewsletters.map((newsletter) => (
                <article key={newsletter.id} className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${newsletter.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={newsletter.image}
                      alt={newsletter.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {newsletter.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          精選
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {newsletterCategories.find(cat => cat.id === newsletter.category)?.icon}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-primary-600 font-medium">{newsletter.date}</span>
                      <div className="flex items-center gap-1 text-sm text-neutral-500">
                        <Eye className="w-4 h-4" />
                        <span>{newsletter.readers.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                      {newsletter.title}
                    </h3>
                    
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {newsletter.description}
                    </p>
                    
                    <button className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">
                      <span>閱讀更多</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 統計數據 */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">25,000+</div>
                <div className="text-primary-200">活躍訂閱者</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-primary-200">已發布期數</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-primary-200">訂閱者滿意度</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-primary-200">專家作者</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}