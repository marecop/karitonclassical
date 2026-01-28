import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <Navigation />
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">精選影片</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">觀賞精彩的音樂會錄影</p>
            <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-12 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">影片庫即將開放</h2>
                <p className="text-neutral-600 text-lg max-w-2xl mx-auto">我們正在準備高品質的音樂會錄影、幕後花絮和藝術家訪談視頻。</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
