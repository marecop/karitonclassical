import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

/**
 * 關於頁面
 * 介紹Kariton Classical的品牌故事和使命
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 導航列 */}
      <Navigation />

      {/* 英雄區塊 */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/Yellow Philharmoniker.png"
            alt="About Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            關於我們
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200">
            Kariton Classical - 傳承古典音樂的永恆之美
          </p>
        </div>
      </div>

      {/* 頁面內容 */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">我們的使命</h2>
              <p className="text-neutral-600 text-lg mb-6">
                Kariton Classical 致力於將世界頂尖的古典音樂演出帶給每一位音樂愛好者。我們相信古典音樂具有跨越時空的力量，能夠觸動人心，啟發靈感。
              </p>
              
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">品牌故事</h3>
              <p className="text-neutral-600 mb-6">
                成立於音樂之都維也納的精神指引下，Kariton Classical 專注於收集和分享世界上最精彩的古典音樂錄音。從維也納新年音樂會的輝煌傳統，到美泉宮夏夜音樂會的浪漫魅力，我們致力於保存這些珍貴的音樂瞬間。
              </p>
              
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">我們的承諾</h3>
              <ul className="text-neutral-600 space-y-2 mb-6">
                <li>• 提供最高品質的音樂錄音</li>
                <li>• 支持世界頂尖的音樂家和樂團</li>
                <li>• 讓古典音樂更容易被理解和欣賞</li>
                <li>• 傳承音樂文化的永恆價值</li>
              </ul>
              
              <div className="bg-primary-50 rounded-lg p-6 mt-8">
                <p className="text-primary-800 italic text-center">
                  "音樂是人類共同的語言，它超越了所有的界限。" - Head of Kariton Classical, Jason Huang
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
