'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { getAllArtists, getFeaturedArtists, getArtistsByCategory, categoryConfig, searchArtists } from '@/data/artists';

export default function ArtistsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 獲取所有藝術家
  const allArtists = getAllArtists();

  // 分類統計
  const categories = [
    { id: 'all', name: '全部', count: allArtists.length },
    { id: 'pianist', name: '鋼琴家', count: allArtists.filter(a => a.category === 'pianist').length },
    { id: 'violinist', name: '小提琴家', count: allArtists.filter(a => a.category === 'violinist').length },
    { id: 'conductor', name: '指揮家', count: allArtists.filter(a => a.category === 'conductor').length },
    { id: 'cellist', name: '大提琴家', count: allArtists.filter(a => a.category === 'cellist').length },
    { id: 'singer', name: '歌唱家', count: allArtists.filter(a => a.category === 'singer').length },
    { id: 'composer', name: '作曲家', count: allArtists.filter(a => a.category === 'composer').length }
  ];

  // 篩選藝術家
  let filteredArtists = allArtists;
  
  if (selectedCategory !== 'all') {
    filteredArtists = getArtistsByCategory(selectedCategory);
  }
  
  if (searchTerm.trim()) {
    filteredArtists = searchArtists(searchTerm).filter(artist => 
      selectedCategory === 'all' || artist.category === selectedCategory
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <Navigation />
      
      {/* Simple Header */}
      <section className="py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light text-neutral-900 mb-4">藝術家</h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              發現世界級音樂家和他們的藝術
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="搜尋藝術家姓名、國籍或樂器..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 border rounded-md ${
                    selectedCategory === category.id
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArtists.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <p className="text-neutral-600">
                  找到 {filteredArtists.length} 位藝術家
                  {searchTerm && ` 關於 "${searchTerm}"`}
                  {selectedCategory !== 'all' && ` 在 ${categories.find(c => c.id === selectedCategory)?.name}`}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredArtists.map((artist) => (
                  <Link key={artist.id} href={`/artists/${artist.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative aspect-square overflow-hidden bg-neutral-100 mb-3">
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          fill
                          className="object-cover group-hover:grayscale transition-all duration-300"
                        />
                        {/* Red triangle indicator */}
                        <div className="absolute top-3 left-3">
                          <div className="w-0 h-0 border-l-[12px] border-l-red-500 border-b-[8px] border-b-transparent border-t-[8px] border-t-transparent"></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="font-medium text-neutral-900 group-hover:text-red-500 transition-colors duration-200">
                          {artist.name.split(' ').reverse().join(', ')}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-neutral-900 mb-2">找不到藝術家</h3>
              <p className="text-neutral-600 mb-6">請嘗試調整搜尋條件</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-neutral-900 text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition-colors duration-200"
              >
                顯示所有藝術家
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}