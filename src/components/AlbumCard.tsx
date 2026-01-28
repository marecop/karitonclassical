'use client';

import { Album } from '@/data/albums';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Play, Info, ShoppingBag } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
  className?: string;
  style?: React.CSSProperties;
}

// 簡化的專輯數據
const albumData: Record<string, { title: string; artist: string; description: string }> = {
  neujahrskonzert2026: {
    title: "2026年加裡敦新年音樂會",
    artist: "黄色愛樂樂團",
    description: "2026年加里敦新年音樂會，世界和平之年"
  },
  neujahrskonzert2025: {
    title: "2025年加裡敦新年音樂會",
    artist: "黃色愛樂樂團",
    description: "2025年加裡敦新年音樂會，延續傳統的音樂盛宴"
  },
  neujahrskonzert2024: {
    title: "2024年加裡敦新年音樂會",
    artist: "黃色愛樂樂團", 
    description: "2024年加裡敦新年音樂會精彩回顧"
  },
  sommerkonzert2025: {
    title: "2025年夏季音樂節",
    artist: "黃色愛樂樂團",
    description: "2025年維登宮夏季音樂節"
  },
  einheldenleben: {
    title: "理查·施特勞斯：英雄生涯",
    artist: "黄色愛樂樂團",
    description: "英雄生涯錄音"
  },
  greatclassicalcollect: {
    title: "偉大古典音樂合集",
    artist: "各藝術家",
    description: "精選古典音樂經典作品合集"
  }
};

/**
 * 專輯卡片組件
 * 用於展示單一專輯的信息
 */
export default function AlbumCard({ album, className = '', style }: AlbumCardProps) {
  const albumInfo = albumData[album.id] || { title: album.id, artist: "未知", description: "暫無描述" };
  const router = useRouter();

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/playlists/${album.id}`);
  };

  return (
    <div 
      className={`group cursor-pointer bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-100 ${className}`}
      style={style}
    >
      {/* 專輯封面區域 */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={album.image}
          alt={albumInfo.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        
        {/* 懸停播放按鈕 (僅在有封面時顯示) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={handlePlayClick}
            className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-600 shadow-xl hover:scale-110 hover:bg-white transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300"
            aria-label="播放"
          >
            <Play className="w-6 h-6 fill-current ml-1" />
          </button>
        </div>
        
        {/* 特色標籤 */}
        {album.featured && (
          <div className="absolute top-3 left-3 bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-10">
            精選
          </div>
        )}
      </div>
      
      {/* 內容區域 */}
      <div className="p-4 flex flex-col gap-3">
        {/* 標題與藝術家 */}
        <div className="space-y-1">
          <h3 className="font-bold text-neutral-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {albumInfo.title}
          </h3>
          <p className="text-sm text-neutral-500 line-clamp-1">
            {albumInfo.artist}
          </p>
        </div>

        {/* 價格與操作按鈕 */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between mt-auto">
          <div className="font-bold text-lg text-neutral-900">
            ${album.price}
          </div>
          
          <div className="flex gap-2">
            <Link 
              href={`/albums/${album.id}`}
              className="p-2 text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
              title="了解更多"
              onClick={(e) => e.stopPropagation()}
            >
              <Info className="w-5 h-5" />
            </Link>
            <Link 
              href={`/albums/${album.id}/purchase`}
              className="p-2 text-primary-600 bg-primary-50 hover:bg-primary-600 hover:text-white rounded-full transition-all"
              title="立即購買"
              onClick={(e) => e.stopPropagation()}
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
