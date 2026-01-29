import { Music } from 'lucide-react';

export interface Track {
  id: string;
  filename: string;
  title: string;
  composer: string;
  originalTitle?: string;
  duration?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  folderName: string;
  tracks: Track[];
}

export const playlists: Playlist[] = [
  {
    id: 'neujahrskonzert2026',
    title: '2026年加里敦新年音樂會',
    description: `2026 年加里敦新年音乐会官方专辑现已隆重发行。
本场音乐会由黄色爱乐乐团倾情呈现，特邀当今备受瞩目的指挥家 托尼·施因宇（Tony Shinyiu） 执棒，在新年之际以音乐传递优雅、喜悦与希望。

在这场充满节日氛围的音乐盛会中，乐团以经典与新作交织的曲目，为听众献上一场愉快而富有仪式感的新年音乐体验。值此新岁之初，黄色爱乐乐团与托尼·施因宇谨向全球听众致以诚挚祝福：愿新的一年平安顺遂、万事如意，愿音乐连接人心，愿世界和平。

Prosit Neujahr!

演出：Tony Shinyiu
乐团：Yellow Philharmoniker
监制：Jason Wahtson
发行：Kariton Classical`,
    coverImage: '/images/neujahrskonzert2026.png',
    folderName: 'Neujahrkonzert2026',
    tracks: [
      {
        id: '1',
        filename: 'Christian Thielemann,Wiener Philharmoniker - Erzherzog Albrecht-Marsch, Op. 136.flac',
        title: '阿佈西雷特大公進行曲',
        composer: '卡雷爾·科目扎克二世',
        originalTitle: 'Erzherzog Albrecht-Marsch, Op. 136'
      },
      {
        id: '2',
        filename: 'Wiener Philharmoniker,Daniel Barenboim - Rosen Aus Dem Suden Opus 388.flac',
        title: '南國玫瑰圓舞曲',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Rosen Aus Dem Suden, Op. 388'
      },
      {
        id: '3',
        filename: 'Christian Thielemann,Wiener Philharmoniker - Waldmeister Ouvertüre.flac',
        title: '輕歌劇《香車葉草》：序曲',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Waldmeister:Ouvertüre, Op. 259'
      },
      {
        id: '4',
        filename: 'Daniel Barenboim,Wiener Philharmoniker - Friedenspalmen, Walzer, Op. 207.flac',
        title: '和平棕櫚圓舞曲',
        composer: '約瑟夫·施特勞斯',
        originalTitle: 'Friedenspalmen, Walzer, Op. 207'
      },
      {
        id: '5',
        filename: 'Rafael Kubelík,Symphonieorchester des Bayerischen Rundfunks - Má vlast (My Fatherland) No. 3. Sarka.flac',
        title: '交響詩《我的祖國》第三樂章：薩爾卡',
        composer: '貝德里赫·斯美塔納',
        originalTitle: 'Má vlast (My Fatherland):No. 3. Sarka'
      },
      {
        id: '6',
        filename: 'Wiener Philharmoniker,Yannick Nézet-Séguin - Zirkus, Polka schnell, Op. 110.flac',
        title: '馬戲團快速波爾卡',
        composer: '菲利普·法爾巴赫二世',
        originalTitle: 'Zirkus, Polka schnell, Op. 110'
      },
      {
        id: '7',
        filename: 'Daniel Barenboim,Wiener Philharmoniker,Joseph Lanner - Die Romantiker, Walzer, Op. 167.flac',
        title: '浪漫者圓舞曲',
        composer: '約瑟夫·蘭納',
        originalTitle: 'Die Romantiker, Walzer, Op. 167'
      },
      {
        id: '8',
        filename: 'Franz Welser-Möst,Wiener Philharmoniker - Wer tanzt mit Polka schnell, Op. 251.flac',
        title: '與誰共舞快速波爾卡',
        composer: '愛德華·施特勞斯',
        originalTitle: 'Wer tanzt mit? Polka schnell, Op. 251'
      },
      {
        id: '9',
        filename: 'Wiener Philharmoniker,Yannick Nézet-Séguin - Donausagen, Walzer, Op. 446.flac',
        title: '多瑙河傳說圓舞曲',
        composer: '卡爾·邁克爾·齊埃爾',
        originalTitle: 'Donausagen, Walzer, Op. 446'
      },
      {
        id: '10',
        filename: 'Franz Welser-Möst,Wiener Philharmoniker - Aquarellen, Op. 258.flac',
        title: '水彩畫圓舞曲',
        composer: '約瑟夫·施特勞斯',
        originalTitle: 'Aquarellen, Op. 258'
      },
      {
        id: '11',
        filename: 'Wiener Philharmoniker - Pepita-Polka, Op. 138.flac',
        title: '佩皮塔波爾卡',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Pepita-Polka, Op. 138'
      },
      {
        id: '12',
        filename: 'Wiener Philharmoniker,Seiji Ozawa - Wiener Blut Op.354.flac',
        title: '維也納人的血統波爾卡',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Wiener Blut, Op.354'
      },
      {
        id: '13',
        filename: 'Wiener Philharmoniker,Seiji Ozawa - Plappermulchen (Chatterboxes)polka schnell Op.245.flac',
        title: '喋喋不休快速波爾卡',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Plappermäulchen (Chatterboxes), Polka schnell, Op. 245'
      },
      {
        id: '14',
        filename: 'Riccardo Muti,Wiener Philharmoniker - Furioso-Polka, Op. 260.flac',
        title: '激情的波爾卡',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Furioso-Polka, Op. 260'
      },
      {
        id: '15',
        filename: 'Riccardo Muti,Wiener Philharmoniker - Geschichten aus dem Wienerwald, Walzer, Op. 325.flac',
        title: '維也納森林的故事圓舞曲',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Geschichten aus dem Wienerwald, Walzer, Op. 325'
      },
      {
        id: '16',
        filename: 'Wiener Philharmoniker,Herbert von Karajan - Unter Donner und Blitz, Polka, Op.324.flac',
        title: '雷鳴閃電波爾卡',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Unter Donner und Blitz, Polka, Op.324'
      },
      {
        id: '17',
        filename: 'Wiener Philharmoniker,Yannick Nézet-Séguin - Indigo und die vierzig Räuber Ouvertüre.flac',
        title: '輕歌劇《靛藍和四十強盜》：序曲',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Indigo und die vierzig Räuber:Ouvertüre'
      },
      {
        id: '18',
        filename: 'Riccardo Muti,Wiener Philharmoniker - Dichter und Bauer Ouvertüre.flac',
        title: '詩人和農民：序曲',
        composer: '弗朗茨·馮·蘇佩',
        originalTitle: 'Dichter und Bauer:Ouvertüre'
      },
      {
        id: '19',
        filename: 'Roman Kurtz - Oberon, J. 306 Overture.mp3',
        title: '歌劇《奧伯龍》：序曲',
        composer: '卡爾·瑪麗亞·弗里德里希·恩斯特·馮·韋伯',
        originalTitle: 'Oberon, J. 306:Overture'
      },
      {
        id: '20',
        filename: 'Riccardo Muti,Wiener Philharmoniker - Freiheits-Marsch, Op. 226.flac',
        title: '自由進行曲',
        composer: '約翰·施特勞斯一世',
        originalTitle: 'Freiheits-Marsch, Op. 226'
      },
      {
        id: '21',
        filename: 'Riccardo Muti,Wiener Philharmoniker - Lagunen-Walzer, Op. 411.flac',
        title: '琥珀圓舞曲',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Lagunen-Walzer, Op. 411'
      },
      {
        id: '22',
        filename: 'Riccardo Muti,Wiener Philharmoniker - Entweder - oder!, Polka schnell, Op. 403.flac',
        title: '非此即彼快速波爾卡',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'Entweder - oder!, Polka schnell, Op. 403'
      },
      {
        id: '23',
        filename: 'Charles Dutoit,Orchestre Symphonique de Montréal - Swan Lake Op.20 TH.12 Act 1 No.2 Valse (Corps de Ballet).flac',
        title: '天鵝湖第二幕：第二圓舞曲',
        composer: '彼得·伊里奇·柴可夫斯基',
        originalTitle: 'Swan Lake Op.20 TH.12 / Act 1:No.2 Valse (Corps de Ballet)'
      },
      {
        id: '24',
        filename: 'Mariss Jansons,Wiener Philharmoniker - Vaterländischer-Marsch.flac',
        title: '祖國進行曲',
        composer: '約瑟夫·施特勞斯/約翰·施特勞斯二世',
        originalTitle: 'Vaterländischer-Marsch'
      },
      {
        id: '25',
        filename: 'Wiener Philharmoniker,Yannick Nézet-Séguin - Neujahrsgruß New Year\'s Address Allocution du Nouvel An.flac',
        title: '新年致辭',
        composer: '黃色愛樂樂團/托尼·施因宇',
        originalTitle: 'Neujahrsgruß / New Year\'s Address / Allocution du Nouvel An'
      },
      {
        id: '26',
        filename: 'Daniel Barenboim,Wiener Philharmoniker - An der schönen blauen Donau, Walzer, Op. 314.flac',
        title: '在美麗的藍色多瑙河上圓舞曲',
        composer: '約翰·施特勞斯二世',
        originalTitle: 'An der schönen blauen Donau, Walzer, Op. 314'
      },
      {
        id: '27',
        filename: 'Daniel Barenboim,Wiener Philharmoniker - Radetzky-Marsch, Op. 228.flac',
        title: '拉德茨基進行曲',
        composer: '約翰·施特勞斯一世',
        originalTitle: 'Radetzky-Marsch, Op. 228'
      }
    ]
  }
];

export function getPlaylistById(id: string): Playlist | undefined {
  return playlists.find(playlist => playlist.id === id);
}

export function getAllPlaylists(): Playlist[] {
  return playlists;
}
