'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Music, Video, Music2, Trophy, Star, ChevronDown } from 'lucide-react';

/**
 * 首頁英雄區塊組件
 * 展示主要視覺內容和品牌訊息
 */
export default function HeroSection() {

  return (
    <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden min-h-[80vh] sm:min-h-[90vh] flex items-center">
      {/* 背景圖片 */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/Yellow Philharmoniker.png"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      
      {/* 內容區域 */}
      <div className="relative mobile-container mobile-section">
        <div className="max-w-4xl">
          {/* 主標題 - 手機版優化 */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in-up leading-tight">
            加里敦古典音樂
          </h1>
          
          {/* 副標題 - 手機版優化 */}
          <p className="mobile-subtitle font-light mb-6 sm:mb-8 text-neutral-200 animate-fade-in-up">
            探索古典音樂的永恆之美
          </p>
          
          {/* 描述文字 - 手機版優化 */}
          <p className="mobile-body text-neutral-300 mb-8 sm:mb-10 max-w-2xl animate-fade-in-up">
            體驗世界頂尖藝術家的精彩演出，感受古典音樂的深度與魅力
          </p>
          
          {/* 行動按鈕 - 手機版優化 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up">
            <Link 
              href="/releases"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-center min-h-[44px] flex items-center justify-center"
            >
              <Music className="w-5 h-5 mr-2" />
              探索專輯
            </Link>
            <Link 
              href="/videos"
              className="border-2 border-white text-white hover:bg-white hover:text-neutral-900 active:bg-neutral-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-all duration-200 text-center min-h-[44px] flex items-center justify-center"
            >
              <Video className="w-5 h-5 mr-2" />
              觀看影片
            </Link>
          </div>
          
          {/* 手機版額外信息 */}
          <div className="mt-8 sm:mt-12 flex flex-wrap gap-4 text-sm text-neutral-300">
            <div className="flex items-center">
              <Music2 className="w-4 h-4 mr-2" />
              <span>精選古典樂曲</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-2" />
              <span>頂尖音樂家</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              <span>高品質音響</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 裝飾性元素 - 手機版優化 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-neutral-50 to-transparent"></div>
      
      {/* 向下滾動指示器 - 手機版 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <ChevronDown className="w-6 h-6 text-white opacity-70" />
      </div>
    </section>
  );
}
