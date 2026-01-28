'use client';

import { getFeaturedAlbums } from '@/data/albums';
import AlbumCard from './AlbumCard';
import Link from 'next/link';

/**
 * 精選專輯區塊組件
 * 展示首頁的精選專輯
 */
export default function FeaturedAlbums() {
  const featuredAlbums = getFeaturedAlbums();

  return (
    <section className="mobile-section bg-white">
      <div className="mobile-container">
        {/* 區塊標題 - 手機版優化 */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="mobile-title text-neutral-900 mb-3 sm:mb-4">
            精選專輯
          </h2>
          <p className="text-neutral-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
            探索我們精心挑選的古典音樂傑作，每一張專輯都是音樂藝術的瑰寶
          </p>
          <div className="w-16 sm:w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>
        
        {/* 專輯網格 - 手機版優化 */}
        <div className="mobile-grid">
          {featuredAlbums.map((album, index) => (
            <AlbumCard 
              key={album.id} 
              album={album}
              className={`animate-fade-in-up ${index > 2 ? 'hidden sm:block' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
        
        {/* 手機版顯示更多專輯按鈕 */}
        <div className="sm:hidden mt-6 text-center">
          <button className="btn-secondary text-sm px-4 py-2">
            顯示更多專輯
          </button>
        </div>
        
        {/* 查看全部按鈕 - 手機版優化 */}
        <div className="text-center mt-8 sm:mt-12">
          <Link 
            href="/releases"
            className="btn-secondary inline-flex items-center space-x-2 min-h-[44px] px-6 py-3"
          >
            <span>查看全部專輯</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        
        {/* 手機版統計信息 */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">50+</div>
            <div className="text-sm sm:text-base text-neutral-600">精選專輯</div>
          </div>
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">200+</div>
            <div className="text-sm sm:text-base text-neutral-600">經典曲目</div>
          </div>
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">25+</div>
            <div className="text-sm sm:text-base text-neutral-600">頂尖藝術家</div>
          </div>
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">HD</div>
            <div className="text-sm sm:text-base text-neutral-600">高品質音響</div>
          </div>
        </div>
      </div>
    </section>
  );
}
