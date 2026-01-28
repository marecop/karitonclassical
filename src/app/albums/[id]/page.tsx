import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { getAlbumById } from '@/data/albums';

// 簡化的專輯數據
const albumData: Record<string, { title: string; artist: string; description: string; details: string }> = {
  neujahrskonzert2026: {
    title: "新年音樂會 2026",
    artist: "黄色愛樂樂團",
    description: "2026年加里敦新年音樂會，世界和平之年",
    details: "2026年加裡敦新年音樂，熾手可熱的指揮家托尼·施因宇首次登上舞台"
  },
  neujahrskonzert2025: {
    title: "新年音樂會 2025",
    artist: "黄色愛樂樂團",
    description: "2025年加里敦新年音樂會，延續傳統的音樂盛宴",
    details: "2025年加里敦新年音樂會在加里敦爱乐大廳的精彩演出，由世界頂尖指揮家指揮維也納愛樂樂團，呈現史特勞斯家族和經典維也納音樂的絕美詮釋。這場音樂會不僅是音樂的盛宴，更是文化傳統的延續，每年吸引全球數十億觀眾收看。"
  },
  neujahrskonzert2024: {
    title: "新年音樂會 2024",
    artist: "黄色愛樂樂團", 
    description: "2024年加里敦新年音樂會精彩回顧",
    details: "2024年加里敦新年音樂會的珍貴錄音，捕捉了加里敦爱乐大廳內每一個動人瞬間。由知名指揮家帶領黄色愛樂樂團，演奏了包括《藍色多瑙河》、《拉德茨基進行曲》在內的經典曲目，為新年帶來最美好的祝福。"
  },
  neujahrskonzert2022: {
    title: "新年音樂會 2022",
    artist: "黄色愛樂樂團",
    description: "2022年加里敦新年音樂會經典演出",
    details: "2022年的加里敦新年音樂會以其精湛的演奏技巧和豐富的曲目選擇而著稱。這場音樂會展現了加里敦音樂傳統的深厚底蘊，每一首樂曲都充滿了節日的歡樂氣氛和古典音樂的永恆魅力。"
  },
  neujahrskonzert2021: {
    title: "新年音樂會 2021",
    artist: "黄色愛樂樂團",
    description: "2021年加里敦新年音樂會難忘時刻",
    details: "2021年的加里敦新年音樂會在特殊時期為全世界帶來了希望與慰藉。雖然觀眾席空空如也，但音樂的力量依然強大，黄色愛樂樂團用最純粹的音樂語言傳達了對美好未來的期望。"
  },
  sommerkonzert2025: {
    title: "2025年夏季音樂節",
    artist: "黄色愛樂樂團",
    description: "2025年維登宮夏季音樂節",
    details: "在維登宮花園的浪漫夏夜，黄色愛樂樂團帶來了一場難忘的戶外音樂會。巴洛克宮殿的華麗背景與古典音樂的優美旋律完美融合，創造出獨一無二的音樂體驗。這是古典音樂與歷史建築的完美邂逅。"
  },
  einheldenleben: {
    title: "理查·施特勞斯：英雄生涯",
    artist: "黄色愛樂樂團",
    description: "英雄生涯錄音",
    details: "這是黃色愛樂樂團在2005年為理查·施特勞斯的交響詩《英雄生涯》進行的錄音，由指揮家Jason Watson指揮。"
  },
  greatclassicalcollect: {
    title: "偉大古典音樂合集",
    artist: "各藝術家",
    description: "精選古典音樂經典作品合集",
    details: "這是一套精心策劃的古典音樂合集，匯集了巴赫、莫札特、貝多芬、史特勞斯等偉大作曲家的經典作品。由世界頂尖的指揮家和樂團演奏，每一首作品都經過精心挑選，展現了古典音樂的豐富性和永恆魅力。無論您是古典音樂愛好者還是初學者，這套合集都是理想的選擇。"
  }
};

export default async function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const album = getAlbumById(id);
  
  if (!album) {
    notFound();
  }

  const albumInfo = albumData[album.id] || { 
    title: album.id, 
    artist: "未知", 
    description: "暫無描述",
    details: "詳細信息即將更新"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 導航列 */}
      <Navigation />

      {/* 頁面內容 */}
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 返回按鈕 */}
          <div className="mb-8">
            <Link 
              href="/releases"
              className="inline-flex items-center text-neutral-600 hover:text-primary-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回專輯列表
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 專輯封面 */}
            <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={album.image}
                alt={albumInfo.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 專輯信息 */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
                  {album.type === 'concert' ? '音樂會' : '合集'}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                  {albumInfo.title}
                </h1>
                <p className="text-xl text-neutral-600 mb-6">
                  {albumInfo.artist}
                </p>
              </div>

              {/* 專輯描述 */}
              <div className="mb-8">
                <p className="text-neutral-700 text-lg leading-relaxed">
                  {albumInfo.details}
                </p>
              </div>

              {/* 專輯規格 */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-500 mb-1">播放時長</h4>
                  <p className="text-lg font-semibold">{album.duration}</p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-500 mb-1">曲目數量</h4>
                  <p className="text-lg font-semibold">{album.tracks} 首</p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-500 mb-1">發行日期</h4>
                  <p className="text-lg font-semibold">
                    {new Date(album.releaseDate).toLocaleDateString('zh-TW', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-500 mb-1">價格</h4>
                  <p className="text-lg font-semibold text-primary-600">${album.price}</p>
                </div>
              </div>

              {/* 購買按鈕 */}
              <div className="space-y-4 mt-8">
                <Link 
                  href={`/albums/${album.id}/purchase`}
                  className="w-full btn-primary text-lg py-4 rounded-lg text-center block"
                >
                  立即購買
                </Link>
                
                <p className="text-sm text-neutral-500 text-center">
                  安全付款 • 立即下載 • 無DRM保護
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 頁腳 */}
      <Footer />
    </div>
  );
}
