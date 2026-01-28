import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PurchaseForm from '@/components/PurchaseForm';
import Link from 'next/link';
import Image from 'next/image';
import { getAlbumById } from '@/data/albums';

// 簡化的專輯數據
const albumData: Record<string, { title: string; artist: string; description: string }> = {
  neujahrskonzert2026: {
    title: "新年音樂會 2026",
    artist: "黄色愛樂樂團",
    description: "2026年加里敦新年音樂會，世界和平之年"
  },
  neujahrskonzert2025: {
    title: "新年音樂會 2025",
    artist: "維也納愛樂樂團",
    description: "2025年維也納新年音樂會，延續傳統的音樂盛宴"
  },
  neujahrskonzert2024: {
    title: "新年音樂會 2024",
    artist: "維也納愛樂樂團", 
    description: "2024年維也納新年音樂會精彩回顧"
  },
  neujahrskonzert2022: {
    title: "新年音樂會 2022",
    artist: "維也納愛樂樂團",
    description: "2022年維也納新年音樂會經典演出"
  },
  neujahrskonzert2021: {
    title: "新年音樂會 2021",
    artist: "維也納愛樂樂團",
    description: "2021年維也納新年音樂會難忘時刻"
  },
  sommerkonzert2025: {
    title: "夏日音樂會 2025",
    artist: "黃色愛樂樂團",
    description: "2025年維登宮夏季音樂節"
  },
  greatclassicalcollect: {
    title: "偉大古典音樂合集",
    artist: "各藝術家",
    description: "精選古典音樂經典作品合集"
  }
};

export default async function PurchasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const album = getAlbumById(id);
  
  if (!album) {
    notFound();
  }

  const albumInfo = albumData[album.id] || { 
    title: album.id, 
    artist: "未知", 
    description: "暫無描述"
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 導航列 */}
      <Navigation />

      {/* 頁面內容 */}
      <main className="pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 返回按鈕 */}
          <div className="mb-8">
            <Link 
              href={`/albums/${album.id}`}
              className="inline-flex items-center text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回專輯詳情
            </Link>
          </div>

          {/* 頁面標題 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              購買專輯
            </h1>
            <p className="text-neutral-600">
              購買 {albumInfo.title}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 專輯信息 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={album.image}
                    alt={albumInfo.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  {albumInfo.title}
                </h2>
                <p className="text-neutral-600 mb-4">
                  {albumInfo.artist}
                </p>
                <p className="text-neutral-500 text-sm">
                  {albumInfo.description}
                </p>
              </div>

              {/* 專輯規格 */}
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">播放時長：</span>
                  <span className="font-medium">{album.duration}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">曲目數量：</span>
                  <span className="font-medium">{album.tracks} 首</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">發行日期：</span>
                  <span className="font-medium">
                    {new Date(album.releaseDate).toLocaleDateString('zh-TW', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between py-2 text-lg font-bold">
                  <span className="text-neutral-900">價格：</span>
                  <span className="text-primary-600">${album.price}</span>
                </div>
              </div>
            </div>

            {/* 購買表單 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <PurchaseForm album={album} albumTitle={albumInfo.title} />
            </div>
          </div>
        </div>
      </main>

      {/* 頁腳 */}
      <Footer />
    </div>
  );
}