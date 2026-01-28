'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getArtistById, getAllArtists } from '@/data/artists';
import { notFound } from 'next/navigation';

export default function ArtistDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  
  const artist = getArtistById(slug);
  
  if (!artist) {
    notFound();
  }

  // 獲取同分類的其他藝術家作為推薦
  const relatedArtists = getAllArtists()
    .filter(a => a.category === artist.category && a.id !== artist.id)
    .slice(0, 4);

  const nextAlbum = () => {
    if (artist.currentAlbums && currentAlbumIndex < artist.currentAlbums.length - 1) {
      setCurrentAlbumIndex(currentAlbumIndex + 1);
    }
  };

  const prevAlbum = () => {
    if (currentAlbumIndex > 0) {
      setCurrentAlbumIndex(currentAlbumIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* 麵包屑導航 */}
      <div className="bg-neutral-50 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm text-neutral-600">
            <Link href="/" className="hover:text-neutral-900 transition-colors duration-200">
              首頁
            </Link>
            <svg className="w-4 h-4 mx-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/artists" className="hover:text-neutral-900 transition-colors duration-200">
              藝術家
            </Link>
            <svg className="w-4 h-4 mx-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-neutral-900 font-medium">
              {artist.name}
            </span>
          </nav>
        </div>
      </div>

      {/* 藝術家主要內容 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* 左側：藝術家照片 */}
            <div className="lg:col-span-1">
              <div className="relative aspect-square overflow-hidden bg-neutral-100 mb-8 group">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover group-hover:grayscale transition-all duration-300"
                  priority
                />
                {/* Red triangle indicator */}
                <div className="absolute top-4 left-4">
                  <div className="w-0 h-0 border-l-[16px] border-l-red-500 border-b-[10px] border-b-transparent border-t-[10px] border-t-transparent"></div>
                </div>
              </div>
              
              {/* 藝術家基本信息 */}
              <div className="space-y-4">
                <h1 className="text-3xl font-light text-neutral-900">
                  {artist.name.split(' ').reverse().join(', ')}
                </h1>
                
                <div className="text-neutral-600 space-y-2">
                  <p><span className="font-medium">國籍:</span> {artist.nationality}</p>
                  <p><span className="font-medium">出生:</span> {artist.birthYear}</p>
                  <p><span className="font-medium">年齡:</span> {new Date().getFullYear() - artist.birthYear}</p>
                </div>

                {/* 社交媒體連結 */}
                {artist.socialMedia && (
                  <div className="pt-6">
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">關注</h3>
                    <div className="flex gap-3">
                      {artist.socialMedia.website && (
                        <a href={artist.socialMedia.website} target="_blank" rel="noopener noreferrer" 
                           className="w-8 h-8 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors duration-200 flex items-center justify-center">
                          <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </a>
                      )}
                      {artist.socialMedia.youtube && (
                        <a href="#" target="_blank" rel="noopener noreferrer"
                           className="w-8 h-8 bg-neutral-100 hover:bg-red-100 rounded transition-colors duration-200 flex items-center justify-center">
                          <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.3.5c-1.1.3-1.9 1.1-2.2 2.2C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1.1 1.1 1.9 2.2 2.2 1.9.5 9.3.5 9.3.5s7.4 0 9.3-.5c1.1-.3 1.9-1.1 2.2-2.2.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5v-7l6.2 3.5-6.2 3.5z"/>
                          </svg>
                        </a>
                      )}
                      {artist.socialMedia.instagram && (
                        <a href="#" target="_blank" rel="noopener noreferrer"
                           className="w-8 h-8 bg-neutral-100 hover:bg-pink-100 rounded transition-colors duration-200 flex items-center justify-center">
                          <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.3-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4 1.3-.1 1.7-.1 4.9-.1zm0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.8.4 4.1.7c-.8.3-1.5.7-2.2 1.4C1.2 2.8.8 3.5.5 4.3.2 5 0 5.9.1 7.2 0 8.5 0 8.9 0 12.2s0 3.7.1 5c.1 1.3.3 2.2.6 2.9.3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.7.3 1.6.5 2.9.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.7.5-1.6.6-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.5-1.4-2.2C20.5 1.4 19.8 1 19 .7c-.7-.3-1.6-.5-2.9-.6C14.8 0 14.4 0 11.1 0H12zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm7.8-10.5c0 .8-.6 1.4-1.4 1.4s-1.4-.6-1.4-1.4.6-1.4 1.4-1.4 1.4.6 1.4 1.4z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 右側：傳記和當前專輯 */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* 傳記部分 */}
              <div>
                <h2 className="text-2xl font-light text-neutral-900 mb-6">藝術家傳記</h2>
                
                {/* 名言 */}
                {artist.quote && (
                  <blockquote className="text-lg italic text-neutral-700 mb-8 pl-6 border-l-3 border-neutral-300">
                    "{artist.quote}"
                  </blockquote>
                )}
                
                <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed">
                  {artist.fullBio.split('\n\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null;
                    return (
                      <p key={index} className="mb-4">
                        {paragraph.trim()}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* 當前專輯 */}
              {artist.currentAlbums && artist.currentAlbums.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-light text-neutral-900">當前專輯</h2>
                    
                    {/* 翻頁控制 */}
                    {artist.currentAlbums.length > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevAlbum}
                          disabled={currentAlbumIndex === 0}
                          className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded hover:border-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        
                        <span className="text-sm text-neutral-600 px-3">
                          {currentAlbumIndex + 1} / {artist.currentAlbums.length}
                        </span>
                        
                        <button
                          onClick={nextAlbum}
                          disabled={currentAlbumIndex === artist.currentAlbums.length - 1}
                          className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded hover:border-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 專輯內容 */}
                  <div className="bg-neutral-50 p-8 rounded-lg">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium text-neutral-900 mb-2">
                          {artist.currentAlbums[currentAlbumIndex].title}
                        </h3>
                        <div className="text-neutral-600 space-y-1">
                          <p><span className="font-medium">藝術家:</span> {artist.currentAlbums[currentAlbumIndex].artists.join(', ')}</p>
                          <p><span className="font-medium">發行日期:</span> {artist.currentAlbums[currentAlbumIndex].releaseDate}</p>
                          <p><span className="font-medium">唱片公司:</span> {artist.currentAlbums[currentAlbumIndex].label}</p>
                        </div>
                      </div>

                      <div className="text-neutral-700 leading-relaxed">
                        {artist.currentAlbums[currentAlbumIndex].description}
                      </div>

                      {/* 曲目列表 */}
                      <div>
                        <h4 className="font-medium text-neutral-900 mb-3">收錄作品</h4>
                        <ul className="space-y-2">
                          {artist.currentAlbums[currentAlbumIndex].works.map((work, index) => (
                            <li key={index} className="text-neutral-700 flex items-start">
                              <span className="w-1 h-1 bg-neutral-400 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                              {work}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 重要成就 */}
              <div>
                <h2 className="text-2xl font-light text-neutral-900 mb-6">重要成就</h2>
                <div className="space-y-3">
                  {artist.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                      <span className="text-neutral-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 代表曲目 */}
              <div>
                <h2 className="text-2xl font-light text-neutral-900 mb-6">代表曲目</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {artist.repertoire.map((piece, index) => (
                    <div key={index} className="border border-neutral-200 p-4 rounded">
                      <span className="text-neutral-700">{piece}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 相關藝術家 */}
      {relatedArtists.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-light text-neutral-900 mb-12 text-center">相關藝術家</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedArtists.map((relatedArtist) => (
                <Link key={relatedArtist.id} href={`/artists/${relatedArtist.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-square overflow-hidden bg-neutral-100 mb-3">
                      <Image
                        src={relatedArtist.image}
                        alt={relatedArtist.name}
                        fill
                        className="object-cover group-hover:grayscale transition-all duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <div className="w-0 h-0 border-l-[12px] border-l-red-500 border-b-[8px] border-b-transparent border-t-[8px] border-t-transparent"></div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-neutral-900 group-hover:text-red-500 transition-colors duration-200">
                        {relatedArtist.name.split(' ').reverse().join(', ')}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}