import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AlbumCard from '@/components/AlbumCard';
import { getAllAlbums } from '@/data/albums';

/**
 * 發行頁面
 * 展示所有專輯的完整列表
 */
export default function ReleasesPage() {
  const allAlbums = getAllAlbums();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 導航列 */}
      <Navigation />

      {/* 頁面內容 */}
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 頁面標題 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              最新發行
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              探索我們完整的古典音樂專輯收藏，從傳統音樂會到精選合集
            </p>
            <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
          </div>

          {/* 專輯網格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allAlbums.map((album) => (
              <AlbumCard 
                key={album.id} 
                album={album}
                className="animate-fade-in-up"
              />
            ))}
          </div>
        </div>
      </main>

      {/* 頁腳 */}
      <Footer />
    </div>
  );
}
