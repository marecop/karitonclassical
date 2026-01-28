'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPlaylists } from '@/data/playlists';
import { Play } from 'lucide-react';

export default function PlaylistsPage() {
  const playlists = getAllPlaylists();

  return (
    <div className="min-h-screen bg-white pt-16">
      <Navigation />
      
      {/* 標題區域 */}
      <section className="bg-neutral-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">播放清單</h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            精選古典音樂專輯，隨時隨地享受美妙旋律
          </p>
        </div>
      </section>

      {/* 播放清單列表 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {playlists.map((playlist) => (
              <Link key={playlist.id} href={`/playlists/${playlist.id}`} className="group">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                  <div className="relative aspect-square">
                    <Image
                      src={playlist.coverImage}
                      alt={playlist.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <Play className="w-8 h-8 text-primary-600 ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-1">
                      {playlist.title}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                      {playlist.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <span>{playlist.tracks.length} 首曲目</span>
                      <span className="text-primary-600 font-medium group-hover:underline">
                        開始播放
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
