import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedAlbums from '@/components/FeaturedAlbums';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';

/**
 * 首頁組件
 * 整合所有主要區塊，展示網站的核心內容
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* 導航列 */}
      <Navigation />
      
      {/* 英雄區塊 */}
      <HeroSection />
      
      {/* 精選專輯區塊 */}
      <FeaturedAlbums />
      
      {/* 新聞區塊 */}
      <NewsSection />
      
      {/* 頁腳 */}
      <Footer />
    </div>
  );
}