'use client';

import { Album } from '@/data/albums';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Play, Star } from 'lucide-react';

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
      className={`group cursor-pointer bg-white rounded-lg p-3 hover:bg-neutral-100 transition-all duration-300 ${className}`}
      style={style}
    >
      {/* 專輯封面 */}
      <div className="relative aspect-square overflow-hidden rounded-md shadow-sm mb-4">
        <Image
          src={album.image}
          alt={albumInfo.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        
        {/* 懸停播放按鈕 */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-end p-3">
          <button 
            onClick={handlePlayClick}
            className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 hover:bg-primary-500 active:scale-95 transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 delay-75"
          >
            <Play className="w-5 h-5 fill-current ml-1" />
          </button>
        </div>
        
        {/* 特色標籤 */}
        {album.featured && (
          <div className="absolute top-2 left-2 bg-primary-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            精選
          </div>
        )}
      </div>
      
      {/* 專輯信息 */}
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-neutral-900 truncate group-hover:underline decoration-neutral-400 underline-offset-4 decoration-1">
          {albumInfo.title}
        </h3>
        <p className="text-sm text-neutral-500 truncate line-clamp-1">
          {albumInfo.artist}
        </p>
      </div>
    </div>
  );
}
