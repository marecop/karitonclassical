'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePlayer } from '@/context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, ListMusic, Maximize2, ChevronUp } from 'lucide-react';

export default function PlayerBar() {
  const { 
    currentTrack, 
    currentPlaylist, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    prevTrack,
    currentTime,
    duration,
    seek,
    volume,
    setVolume,
    isMuted,
    toggleMute
  } = usePlayer();

  const [isSeeking, setIsSeeking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* 玻璃擬態背景 */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"></div>
      
      <div className="relative container mx-auto px-4 h-[90px] flex items-center justify-between">
        {/* 左側：曲目信息 */}
        <div className="flex items-center w-[30%] min-w-[180px] group">
          {currentPlaylist && (
            <div className="relative w-14 h-14 rounded-md overflow-hidden mr-4 shadow-md hidden sm:block group-hover:shadow-lg transition-all duration-300">
              <Image 
                src={currentPlaylist.coverImage} 
                alt={currentTrack.title} 
                fill 
                className="object-cover" 
              />
              {/* 封面上的展開指示器 */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <ChevronUp className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
          <div className="flex flex-col justify-center overflow-hidden mr-4">
            <div className="font-bold text-sm truncate hover:underline cursor-pointer text-neutral-900 transition-colors">
              {currentTrack.title}
            </div>
            <div className="text-xs text-neutral-500 truncate hover:text-primary-600 hover:underline cursor-pointer transition-colors mt-0.5">
              {currentTrack.composer}
            </div>
          </div>
          <button className="text-neutral-400 hover:text-primary-600 transition-colors ml-2 hidden lg:block">
            {/* 這裡可以放喜歡按鈕 */}
          </button>
        </div>

        {/* 中間：播放控制 */}
        <div className="flex flex-col items-center max-w-[40%] w-full">
          <div className="flex items-center gap-6 mb-2">
            <button className="text-neutral-400 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-neutral-100">
              <Shuffle className="w-4 h-4" />
            </button>
            <button 
              onClick={prevTrack} 
              className="text-neutral-600 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-neutral-100"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={togglePlay} 
              className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white hover:scale-105 hover:bg-primary-500 transition-all shadow-lg active:scale-95"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <button 
              onClick={nextTrack} 
              className="text-neutral-600 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-neutral-100"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
            <button className="text-neutral-400 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-neutral-100">
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          
          <div className="w-full flex items-center gap-3 text-xs text-neutral-500 font-mono">
            <span className="w-10 text-right tabular-nums">{formatTime(currentTime)}</span>
            <div className="flex-grow relative h-1 group cursor-pointer py-2">
              <div className="absolute top-1/2 left-0 right-0 h-1 -mt-0.5 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 rounded-full relative group-hover:bg-primary-500 transition-colors" 
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                ></div>
              </div>
              {/* 滑塊圓點 - 懸停時顯示 */}
              <div 
                className="absolute top-1/2 h-3 w-3 bg-white border border-neutral-300 rounded-full shadow -mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ left: `calc(${(currentTime / (duration || 1)) * 100}% - 6px)` }}
              ></div>
              <input 
                type="range" 
                min="0" 
                max={duration || 0} 
                value={currentTime} 
                onChange={handleSeek}
                onMouseDown={handleSeekStart}
                onMouseUp={handleSeekEnd}
                onTouchStart={handleSeekStart}
                onTouchEnd={handleSeekEnd}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="w-10 tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        {/* 右側：音量和其他 */}
        <div className="flex items-center justify-end w-[30%] min-w-[180px] gap-2">
          <button className="text-neutral-400 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-neutral-100">
            <ListMusic className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 group w-32 mx-2">
            <button onClick={toggleMute} className="text-neutral-600 hover:text-primary-600 transition-colors">
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="flex-grow relative h-1 cursor-pointer py-2">
              <div className="absolute top-1/2 left-0 right-0 h-1 -mt-0.5 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 rounded-full group-hover:bg-primary-500 transition-colors" 
                  style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                ></div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolume}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          
          <button className="text-neutral-400 hover:text-primary-600 transition-colors p-2 rounded-full hover:bg-neutral-100">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
