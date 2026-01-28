'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getPlaylistById } from '@/data/playlists';
import { usePlayer } from '@/context/PlayerContext';
import { Play, Pause, Clock, ArrowLeft, Heart, MoreHorizontal, Music2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PlaylistDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const playlist = getPlaylistById(id);
  
  const { currentTrack, isPlaying, playTrack, getTrackDuration, trackDurations } = usePlayer();
  const [scrolled, setScrolled] = useState(false);

  // 監聽滾動以改變導航欄背景
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (seconds: number | null | undefined): string => {
    if (seconds === null || seconds === undefined || isNaN(seconds) || seconds === 0) return "--:--";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!playlist) {
    notFound();
  }

  const isCurrentPlaylist = currentTrack && playlist.tracks.some(t => t.id === currentTrack.id);

  // 當 trackDurations 更新時，強制重新渲染以顯示時長
  const durationsArray = Array.from(trackDurations.entries());
  useEffect(() => {
    // 這個 effect 只是為了觸發重新渲染
  }, [durationsArray.length]);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans pt-16">
      <Navigation className={scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"} />
      
      <main className="flex-grow pb-[120px]">
        {/* 頂部區域：背景模糊 + 專輯信息 */}
        <div className="relative pt-8 pb-8 overflow-hidden">
          {/* 背景模糊層 */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212] z-10"></div>
            <Image
              src={playlist.coverImage}
              alt="Background"
              fill
              className="object-cover opacity-30 blur-2xl transform scale-110"
              priority
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <Link 
              href="/playlists" 
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8 text-sm font-medium tracking-wide"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回音樂庫
            </Link>

            <div className="flex flex-col md:flex-row items-end gap-8">
              {/* 專輯封面 */}
              <div className="relative w-52 h-52 md:w-64 md:h-64 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden flex-shrink-0 group">
                <Image
                  src={playlist.coverImage}
                  alt={playlist.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* 專輯詳情 */}
              <div className="flex flex-col gap-4 flex-grow mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-500">
                  Album / Playlist
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  {playlist.title}
                </h1>
                <p className="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-2">
                  {playlist.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                  <span className="font-semibold text-white">Kariton Classical</span>
                  <span>•</span>
                  <span>{playlist.tracks.length} 首曲目</span>
                  <span>•</span>
                  <span>2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 播放控制與列表區域 */}
        <div className="container mx-auto px-6 relative z-20 bg-gradient-to-b from-[#121212]/50 to-[#121212]">
          
          {/* 操作按鈕 */}
          <div className="flex items-center gap-6 py-6">
            <button 
              onClick={() => playTrack(playlist.tracks[0], playlist)}
              className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center hover:scale-105 hover:bg-primary-500 transition-all shadow-lg text-white"
            >
              {isCurrentPlaylist && isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>
            
            <button className="text-gray-400 hover:text-white transition-colors">
              <Heart className="w-8 h-8" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-8 h-8" />
            </button>
          </div>

          {/* 列表頭部 */}
          <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_4fr_3fr_auto] gap-4 px-4 py-3 border-b border-gray-800 text-sm font-medium text-gray-400 uppercase tracking-wider sticky top-[70px] bg-[#121212] z-30">
            <div className="w-8 text-center">#</div>
            <div>標題</div>
            <div className="hidden md:block">作曲家</div>
            <div className="flex justify-end pr-2"><Clock className="w-4 h-4" /></div>
          </div>

          {/* 歌曲列表 */}
          <div className="flex flex-col">
            {playlist.tracks.map((track, index) => {
              const isPlayingTrack = currentTrack?.id === track.id;
              
              return (
                <div 
                  key={track.id}
                  onClick={() => playTrack(track, playlist)}
                  className={`
                    group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_4fr_3fr_auto] gap-4 px-4 py-3 
                    rounded-md transition-colors cursor-pointer items-center border-b border-gray-800/50 hover:bg-white/10
                    ${isPlayingTrack ? 'bg-white/10' : ''}
                  `}
                >
                  {/* 序號 / 播放狀態 */}
                  <div className="w-8 flex justify-center items-center text-gray-400 group-hover:text-white relative min-h-[20px]">
                    {isPlayingTrack && isPlaying ? (
                      <div className="flex items-end gap-[2px] h-4 w-4 justify-center">
                        <div className="w-[3px] bg-primary-500 animate-[music-bar_0.6s_ease-in-out_infinite]"></div>
                        <div className="w-[3px] bg-primary-500 animate-[music-bar_0.8s_ease-in-out_infinite_0.2s]"></div>
                        <div className="w-[3px] bg-primary-500 animate-[music-bar_0.5s_ease-in-out_infinite_0.4s]"></div>
                      </div>
                    ) : (
                      <>
                        <span className="group-hover:hidden font-mono text-sm">{index + 1}</span>
                        <Play className="w-4 h-4 fill-white hidden group-hover:block text-white" />
                      </>
                    )}
                  </div>

                  {/* 標題信息 */}
                  <div className="flex flex-col justify-center min-w-0">
                    <span className={`font-medium text-base truncate ${isPlayingTrack ? 'text-primary-500' : 'text-white'}`}>
                      {track.title}
                    </span>
                    <span className="text-xs text-gray-500 truncate mt-0.5 group-hover:text-gray-300">
                      {track.originalTitle}
                    </span>
                    {/* 移動端顯示作曲家 */}
                    <span className="md:hidden text-xs text-gray-500 truncate mt-0.5">
                      {track.composer}
                    </span>
                  </div>

                  {/* 作曲家 (桌面端) */}
                  <div className="hidden md:flex items-center text-sm text-gray-400 group-hover:text-gray-200 truncate">
                    {track.composer}
                  </div>

                  {/* 時長 */}
                  <div className="text-sm text-gray-400 font-mono text-right pr-2">
                    {formatTime(getTrackDuration(track.id))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer className="bg-[#121212] border-t border-gray-800 text-gray-500" />
    </div>
  );
}
