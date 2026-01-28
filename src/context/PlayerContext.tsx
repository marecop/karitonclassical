'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { Track, Playlist } from '@/data/playlists';
import { Howl, Howler } from 'howler';

interface PlayerContextType {
  currentTrack: Track | null;
  currentPlaylist: Playlist | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  trackDurations: Map<string, number>; // 存儲每個 track 的時長
  playTrack: (track: Track, playlist: Playlist) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  getTrackDuration: (trackId: string) => number | null;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [trackDurations, setTrackDurations] = useState<Map<string, number>>(new Map());
  
  const soundRef = useRef<Howl | null>(null);
  const requestRef = useRef<number>();
  const currentPlaylistRef = useRef<Playlist | null>(null);
  const currentTrackRef = useRef<Track | null>(null);
  const playTrackRef = useRef<((track: Track, playlist: Playlist) => void) | null>(null);

  // 定時更新進度 - 使用 useCallback 確保總是使用最新的狀態
  const updateProgress = useCallback(() => {
    if (soundRef.current && soundRef.current.playing()) {
      const seekTime = soundRef.current.seek();
      if (typeof seekTime === 'number' && !isNaN(seekTime) && seekTime >= 0) {
        setCurrentTime(seekTime);
      }
      requestRef.current = requestAnimationFrame(updateProgress);
    } else {
      // 如果音頻不在播放，停止更新
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
    }
  }, []); // 空依賴數組，因為我們總是從 soundRef.current 讀取最新值

  useEffect(() => {
    // 取消之前的動畫幀
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }

    if (isPlaying && soundRef.current && soundRef.current.playing()) {
      // 立即更新一次，然後開始動畫循環
      updateProgress();
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
    };
  }, [isPlaying, updateProgress]);

  // 輔助函數：更新 track 時長
  const updateTrackDuration = (trackId: string, duration: number) => {
    setTrackDurations(prev => {
      const newMap = new Map(prev);
      newMap.set(trackId, duration);
      return newMap;
    });
  };

  const playTrack = (track: Track, playlist: Playlist) => {
    // 如果點擊的是當前歌曲
    if (currentTrack?.id === track.id && soundRef.current) {
      togglePlay();
      return;
    }

    // 停止並卸載當前歌曲
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }
    
    // 取消當前的動畫幀
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }

    // 切換到遠程音樂服務器路徑
    // 基礎 URL: http://98.159.109.110/music/
    // 注意：需要確保文件名被正確編碼，以處理空格和特殊字符
    const encodedFilename = encodeURIComponent(track.filename);
    // 構建遠程 URL
    const src = `http://98.159.109.110/music/${playlist.folderName}/${encodedFilename}`;
    
    console.log('Loading remote audio from:', src);
    
    const sound = new Howl({
      src: [src],
      html5: true, // 強制使用 HTML5 Audio，這對大文件和流式傳輸很重要，也能解決跨域問題
      preload: true,
      volume: isMuted ? 0 : volume,
      onplay: () => {
        setIsPlaying(true);
        // 播放時再次嘗試獲取時長（此時音頻肯定已經加載）
        const dur = sound.duration();
        if (dur && dur > 0 && !isNaN(dur)) {
          setDuration(dur);
          updateTrackDuration(track.id, dur);
          console.log(`Track ${track.id} playing, duration: ${dur} seconds`);
        } else {
          // 如果時長仍不可用，稍後再試
          setTimeout(() => {
            const dur2 = sound.duration();
            if (dur2 && dur2 > 0 && !isNaN(dur2)) {
              setDuration(dur2);
              updateTrackDuration(track.id, dur2);
              console.log(`Track ${track.id} duration retrieved during playback: ${dur2} seconds`);
            }
          }, 1000);
        }
        // 確保進度更新開始 - 使用最新的 updateProgress
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = undefined;
        }
        requestRef.current = requestAnimationFrame(updateProgress);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onend: () => {
        setIsPlaying(false);
        // 使用 ref 來獲取最新的值
        const playlist = currentPlaylistRef.current;
        const track = currentTrackRef.current;
        if (playlist && track && playTrackRef.current) {
          const currentIndex = playlist.tracks.findIndex(t => t.id === track.id);
          if (currentIndex < playlist.tracks.length - 1) {
            const nextTrackItem = playlist.tracks[currentIndex + 1];
            playTrackRef.current(nextTrackItem, playlist);
          }
        }
      },
      onload: () => {
        // 音頻加載完成後立即獲取時長
        // 對於某些格式（如 FLAC），可能需要稍等片刻
        const tryGetDuration = () => {
          const dur = sound.duration();
          if (dur && dur > 0 && !isNaN(dur)) {
            setDuration(dur);
            updateTrackDuration(track.id, dur);
            console.log(`Track ${track.id} loaded, duration: ${dur} seconds (${Math.floor(dur / 60)}:${Math.floor(dur % 60).toString().padStart(2, '0')})`);
          } else {
            // 如果時長還不可用，稍後再試
            setTimeout(() => {
              const dur2 = sound.duration();
              if (dur2 && dur2 > 0 && !isNaN(dur2)) {
                setDuration(dur2);
                updateTrackDuration(track.id, dur2);
                console.log(`Track ${track.id} duration loaded after delay: ${dur2} seconds`);
              }
            }, 500);
          }
        };
        tryGetDuration();
      },
      onloaderror: (id, error) => {
        console.error("Load Error:", error, "for track:", track.id);
      },
      onplayerror: (id, error) => {
        console.error("Play Error:", error);
        sound.once('unlock', () => {
          sound.play();
        });
      }
    });

    soundRef.current = sound;
    setCurrentTrack(track);
    setCurrentPlaylist(playlist);
    // 同時更新 ref
    currentTrackRef.current = track;
    currentPlaylistRef.current = playlist;
    sound.play();
  };
  
  // 將 playTrack 存儲到 ref 中，以便在回調中使用
  playTrackRef.current = playTrack;

  const togglePlay = () => {
    if (!soundRef.current) return;
    
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const seek = useCallback((time: number) => {
    if (!soundRef.current) return;
    const clampedTime = Math.max(0, Math.min(time, duration || time));
    soundRef.current.seek(clampedTime);
    setCurrentTime(clampedTime);
    
    // 取消當前的動畫幀
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
    
    // 如果音頻正在播放，立即重新啟動進度更新
    if (soundRef.current.playing()) {
      requestRef.current = requestAnimationFrame(updateProgress);
    }
  }, [duration, updateProgress]);

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    if (vol > 0 && isMuted) setIsMuted(false);
    if (soundRef.current) {
      soundRef.current.volume(isMuted ? 0 : vol);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (soundRef.current) {
      soundRef.current.volume(newMuted ? 0 : volume);
    }
  };

  const nextTrack = () => {
    // 使用 ref 來獲取最新的值，避免閉包問題
    const playlist = currentPlaylistRef.current;
    const track = currentTrackRef.current;
    if (!playlist || !track) return;
    
    const currentIndex = playlist.tracks.findIndex(t => t.id === track.id);
    if (currentIndex < playlist.tracks.length - 1) {
      const nextTrackItem = playlist.tracks[currentIndex + 1];
      playTrack(nextTrackItem, playlist);
    } else {
      setIsPlaying(false);
    }
  };

  const prevTrack = () => {
    // 使用 ref 來獲取最新的值
    const playlist = currentPlaylistRef.current;
    const track = currentTrackRef.current;
    if (!playlist || !track) return;
    
    const currentIndex = playlist.tracks.findIndex(t => t.id === track.id);
    
    // 如果播放超過 3 秒，則回到開頭
    if (soundRef.current && soundRef.current.seek() > 3) {
      seek(0);
      return;
    }

    if (currentIndex > 0) {
      const prevTrackItem = playlist.tracks[currentIndex - 1];
      playTrack(prevTrackItem, playlist);
    } else {
      seek(0);
    }
  };

  const getTrackDuration = (trackId: string): number | null => {
    return trackDurations.get(trackId) || null;
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      currentPlaylist,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      trackDurations,
      playTrack,
      togglePlay,
      seek,
      setVolume,
      toggleMute,
      nextTrack,
      prevTrack,
      getTrackDuration
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
