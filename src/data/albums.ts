// 專輯數據配置
// 您可以輕鬆在這裡添加新的專輯

export interface Album {
  id: string;
  titleKey: string; // 翻譯key
  artistKey: string; // 翻譯key  
  descriptionKey: string; // 翻譯key
  detailsKey: string; // 詳細描述key
  image: string;
  releaseDate: string;
  featured: boolean; // 是否為精選專輯
  type: 'concert' | 'collection'; // 專輯類型
  price: number; // 價格（美元）
  duration: string; // 播放時長
  tracks: number; // 曲目數量
  format: string[]; // 格式（CD, Digital, Vinyl等）
}

export const albums: Album[] = [
  {
    id: 'neujahrskonzert2026',
    titleKey: 'New Year Concert 2026',
    artistKey: 'albums.neujahrskonzert2026.artist',
    descriptionKey: 'albums.neujahrskonzert2026.description',
    detailsKey: 'albums.neujahrskonzert2026.details',
    image: '/images/neujahrskonzert2026.png',
    releaseDate: '2026-01-01',
    featured: true,
    type: 'concert',
    price: 26.99,
    duration: '2:20:45',
    tracks: 27,
    format: ['CD', 'Digital', 'Vinyl']
  },
  {
    id: 'neujahrskonzert2025',
    titleKey: 'albums.neujahrskonzert2025.title',
    artistKey: 'albums.neujahrskonzert2025.artist', 
    descriptionKey: 'albums.neujahrskonzert2025.description',
    detailsKey: 'albums.neujahrskonzert2025.details',
    image: '/images/neujahrskonzert2025.JPG',
    releaseDate: '2025-01-01',
    featured: false,
    type: 'concert',
    price: 28.99,
    duration: '2:50:00',
    tracks: 18,
    format: ['CD', 'Digital', 'Vinyl']
  },
  {
    id: 'sommerkonzert2025',
    titleKey: 'albums.sommerkonzert2025.title',
    artistKey: 'albums.sommerkonzert2025.artist',
    descriptionKey: 'albums.sommerkonzert2025.description',
    detailsKey: 'albums.sommerkonzert2025.details',
    image: '/images/sommerkonzert2025.JPG',
    releaseDate: '2025-06-01',
    featured: true,
    type: 'concert',
    price: 22.99,
    duration: '1:58:45',
    tracks: 15,
    format: ['CD', 'Digital']
  },
  {
    id: 'neujahrskonzert2024', 
    titleKey: 'albums.neujahrskonzert2024.title',
    artistKey: 'albums.neujahrskonzert2024.artist',
    descriptionKey: 'albums.neujahrskonzert2024.description',
    detailsKey: 'albums.neujahrskonzert2024.details',
    image: '/images/neujahrskonzert2024.JPG',
    releaseDate: '2024-01-01',
    featured: false,
    type: 'concert',
    price: 19.99,
    duration: '2:10:20',
    tracks: 16,
    format: ['CD', 'Digital', 'Vinyl']
  },
  {
    id: 'neujahrskonzert2022',
    titleKey: 'albums.neujahrskonzert2022.title', 
    artistKey: 'albums.neujahrskonzert2022.artist',
    descriptionKey: 'albums.neujahrskonzert2022.description',
    detailsKey: 'albums.neujahrskonzert2022.details',
    image: '/images/neujahrskonzert2022.JPG',
    releaseDate: '2022-01-01',
    featured: false,
    type: 'concert',
    price: 17.99,
    duration: '2:05:15',
    tracks: 14,
    format: ['CD', 'Digital']
  },
  {
    id: 'neujahrskonzert2021',
    titleKey: 'albums.neujahrskonzert2021.title',
    artistKey: 'albums.neujahrskonzert2021.artist', 
    descriptionKey: 'albums.neujahrskonzert2021.description',
    detailsKey: 'albums.neujahrskonzert2021.details',
    image: '/images/neujahrskonzert2021.JPG',
    releaseDate: '2021-01-01',
    featured: false,
    type: 'concert',
    price: 16.99,
    duration: '1:59:30',
    tracks: 13,
    format: ['CD', 'Digital']
  },
  {
    id: 'einheldenleben',
    titleKey: 'albums.einheldenleben.title',
    artistKey: 'albums.einheldenleben.artist',
    descriptionKey: 'albums.einheldenleben.description',
    detailsKey: 'albums.einheldenleben.details',
    image: '/images/einheldenleben.PNG',
    releaseDate: '2005-03-05',
    featured: true,
    type: 'collection',
    price: 42.99,
    duration: '1:58:45',
    tracks: 15,
    format: ['CD', 'Digital']
  },
  {
    id: 'greatclassicalcollect',
    titleKey: 'albums.greatclassicalcollect.title',
    artistKey: 'albums.greatclassicalcollect.artist',
    descriptionKey: 'albums.greatclassicalcollect.description',
    detailsKey: 'albums.greatclassicalcollect.details',
    image: '/images/greatclassicalcollect.JPG', 
    releaseDate: '2024-03-21',
    featured: true,
    type: 'collection',
    price: 29.99,
    duration: '4:32:10',
    tracks: 42,
    format: ['CD', 'Digital', 'Vinyl', 'Box Set']
  }
];

// 獲取精選專輯
export const getFeaturedAlbums = (): Album[] => {
  return albums.filter(album => album.featured);
};

// 獲取所有專輯
export const getAllAlbums = (): Album[] => {
  return albums.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
};

// 根據ID獲取專輯
export const getAlbumById = (id: string): Album | undefined => {
  return albums.find(album => album.id === id);
};
