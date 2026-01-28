import { Music, Mic, PenTool, Users, Wand2, Music2, Music3, Music4, Drum } from 'lucide-react';

// 藝術家資料庫
export interface Artist {

  id: string;
  name: string;
  category: 'pianist' | 'violinist' | 'conductor' | 'cellist' | 'composer' | 'singer' | 'ensemble' | 'hornplayer' | 'trumpeter' | 'bassist' | 'clarinetist';
  nationality: string;
  birthYear: number;
  image: string;
  bio: string; // 簡短介紹
  fullBio: string; // 完整傳記
  quote?: string; // 個人名言
  achievements: string[]; // 重要成就
  repertoire: string[]; // 主要曲目
  upcomingConcerts?: Concert[]; // 即將到來的音樂會
  discography?: Album[]; // 唱片作品
  currentAlbums?: CurrentAlbum[]; // 當前專輯
  awards: string[]; // 獲得獎項
  education: string[]; // 教育背景
  socialMedia?: {
    website?: string;
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
  featured?: boolean; // 是否為特色藝術家
  status: 'active' | 'retired' | 'historical'; // 藝術家狀態
}

export interface Concert {
  date: string;
  venue: string;
  city: string;
  program: string[];
}

export interface Album {
  title: string;
  year: number;
  label: string;
  works: string[];
}

export interface CurrentAlbum {
  title: string;
  artists: string[];
  releaseDate: string;
  description: string;
  image?: string;
  label: string;
  works: string[];
}

// 完整藝術家資料庫
export const artistsDatabase: Artist[] = [
  {
    id: 'clara-ashford',
    name: 'Clara Ashford',
    category: 'hornplayer',
    nationality: '英國',
    birthYear: 1985,
    image: '/images/Clara Ashford.JPG',
    bio: '英國新生代圓號演奏家，以其精湛的演奏技巧和深刻的音樂理解力聞名於國際音樂舞台。',
    quote: 'Music is the language of the soul; every note tells a story that words cannot express.',
    fullBio: `
Clara Ashford 是當代最受矚目的年輕圓號演奏家之一。出生於倫敦的音樂世家，從4歲開始學習圓號。她在皇家音樂學院完成學業，師從著名圓號教育家 Professor James Mitchell。

Clara 的演奏風格融合了英國古典傳統與現代詮釋技巧，特別擅長演奏浪漫主義時期作品。她的圓號詮釋被評論家譽為"既保持了作曲家的原始精神，又注入了21世紀的新鮮活力"。

2018年，Clara 在加裡敦圓號演奏比賽中獲得第一名，這一成就讓她在國際音樂界嶄露頭角。此後，她與世界各大著名樂團合作演出，包括倫敦交響樂團、維也納愛樂樂團和紐約愛樂樂團。現在擔任黃色愛樂樂團圓號首席

除了獨奏事業，Clara 也致力於音樂教育，定期在皇家音樂學院授課，並舉辦大師班。她相信音樂是連接人心的橋樑，希望通過自己的演奏為聽眾帶來美好和希望。
    `,
    achievements: [
      '2018年加裡敦圓號演奏比賽第一名',
      '2020年BBC古典音樂年度新人獎',
      '2021年皇家愛樂學會年度藝術家獎',
      '2022年皇家愛樂學會年度藝術家獎'
    ],
    repertoire: [
      '莫札特：圓號協奏曲全集',
      '貝多芬：圓號協奏曲全集',
      '布拉姆斯：圓號協奏曲全集',
      '舒伯特：圓號協奏曲全集',
      '莫札特：圓號協奏曲全集'
    ],
    upcomingConcerts: [
      {
        date: '2025年3月15日',
        venue: '維也納金色大廳',
        city: '維也納',
        program: ['蕭邦鋼琴協奏曲第一號', '拉赫曼尼諾夫帕格尼尼主題狂想曲']
      },
      {
        date: '2025年4月8日',
        venue: '卡內基音樂廳',
        city: '紐約',
        program: ['貝多芬皇帝協奏曲', '德布西月光奏鳴曲']
      }
    ],
    discography: [
      {
        title: '蕭邦：敘事曲全集',
        year: 2021,
        label: 'Hyperion Records',
        works: ['敘事曲第一號', '敘事曲第二號', '敘事曲第三號', '敘事曲第四號']
      },
      {
        title: '浪漫主義印象',
        year: 2023,
        label: 'Deutsche Grammophon',
        works: ['拉赫曼尼諾夫：第二鋼琴協奏曲', '德布西：月光奏鳴曲']
      }
    ],
    currentAlbums: [
      {
        title: 'Clara Ashford Plays Chopin',
        artists: ['Clara Ashford'],
        releaseDate: '04/15/2024',
        description: 'This extraordinary new recording presents Clara Ashford\'s deeply personal interpretation of Chopin\'s most beloved works. The album features the complete set of Nocturnes and selected Ballades, recorded with the London Symphony Orchestra. Ashford\'s nuanced approach to these masterpieces reveals new dimensions in Chopin\'s emotional landscape, combining technical brilliance with profound musical understanding. The recordings were made at Abbey Road Studios with state-of-the-art sound quality.',
        label: 'Kariton Classical',
        works: [
          'Nocturne in E-flat major, Op. 9, No. 2',
          'Ballade No. 1 in G minor, Op. 23',
          'Nocturne in F-sharp major, Op. 15, No. 2',
          'Ballade No. 4 in F minor, Op. 52',
          'Nocturne in D-flat major, Op. 27, No. 2'
        ]
      },
      {
        title: 'Romantic Impressions',
        artists: ['Clara Ashford', 'London Symphony Orchestra'],
        releaseDate: '11/22/2023',
        description: 'A stunning collection of Romantic-era masterpieces featuring Clara Ashford with the London Symphony Orchestra under the direction of Sir Simon Rattle. This album showcases Ashford\'s exceptional ability to bridge the gap between classical tradition and contemporary interpretation.',
        label: 'Kariton Classical',
        works: [
          'Rachmaninoff: Piano Concerto No. 2',
          'Debussy: Clair de Lune',
          'Liszt: Hungarian Rhapsody No. 2'
        ]
      }
    ],
    awards: [
      '大英帝國勳章 (MBE)',
      'BBC音樂雜誌年度錄音獎',
      '留聲機雜誌編輯推薦獎'
    ],
    education: [
      '皇家音樂學院鋼琴演奏學士',
      '皇家音樂學院鋼琴演奏碩士',
      '師從 Professor James Mitchell'
    ],
    socialMedia: {
      website: 'https://clara-ashford.com',
      instagram: '@claraashfordpiano',
      youtube: 'Clara Ashford Official',
      spotify: 'Clara Ashford'
    },
    featured: true,
    status: 'active'
  },
  {
    id: 'heinrich-falkenhorst',
    name: 'Heinrich Falkenhorst',
    category: 'violinist',
    nationality: '德國',
    birthYear: 1992,
    image: '/images/Heinrich Falkenhorst.JPG',
    bio: '德國著名小提琴家，以其對德奧古典音樂的深刻理解和現代化詮釋著稱。',
    quote: 'Listening is more important than speaking.',
    fullBio: `
Heinrich Falkenhorst 是當代最具影響力的德國小提琴家之一。出生於巴伐利亞的慕尼黑，從小在濃厚的音樂氛圍中長大。他的父親是慕尼黑愛樂樂團的首席小提琴手，母親則是歌劇演員。

Heinrich 在慕尼黑音樂學院學習小提琴，師從傳奇小提琴家 Herbert von Karajan 的弟子。他的小提琴風格繼承了德國小提琴傳統的嚴謹性，同時融入了現代音樂詮釋的創新元素。

2005年，Heinrich 被任命為德勒斯登國立歌劇院音樂總監，在此期間他成功復興了許多被遺忘的德國浪漫主義歌劇作品。2012年起，他擔任柏林愛樂樂團的首席客座小提琴手，與樂團建立了深厚的藝術合作關係。

Heinrich 特別擅長演奏德奧古典音樂，他的貝多芬交響曲全集錄音被譽為"21世紀最具啟發性的詮釋"。他也是現代音樂的積極推廣者，委約並首演了多部當代作曲家的新作。
    `,
    achievements: [
      '2012年成為柏林愛樂樂團首席小提琴手',
      '2015年獲得德國聯邦十字勳章',
      '2018年薩爾茲堡音樂節藝術總監',
      '2020年維也納愛樂樂團首席小提琴手'
    ],
    repertoire: [
      '貝多芬：交響曲全集',
      '布拉姆斯：交響曲全集',
      '馬勒：交響曲全集',
      '華格納：尼伯龍根的指環',
      '理查·史特勞斯：交響詩集'
    ],
    upcomingConcerts: [
      {
        date: '2025年2月20日',
        venue: '柏林愛樂音樂廳',
        city: '柏林',
        program: ['貝多芬第九交響曲', '布拉姆斯第一交響曲']
      },
      {
        date: '2025年5月12日',
        venue: '薩爾茲堡音樂節',
        city: '薩爾茲堡',
        program: ['馬勒第五交響曲', '理查·史特勞斯查拉圖斯特拉如是說']
      }
    ],
    discography: [
      {
        title: '貝多芬：交響曲全集',
        year: 2020,
        label: 'Berlin Philharmonic Recordings',
        works: ['交響曲第1-9號']
      },
      {
        title: '德國浪漫主義',
        year: 2022,
        label: 'Deutsche Grammophon',
        works: ['布拉姆斯第四交響曲', '舒曼第四交響曲']
      }
    ],
    currentAlbums: [
      {
        title: 'Heinrich Falkenhorst Conducts Mozart',
        artists: ['Heinrich Falkenhorst', 'Berlin Philharmonic'],
        releaseDate: '04/27/2024',
        description: 'This new 3-CD edition presents selected works by Wolfgang Amadeus Mozart in recordings by the Berlin Philharmonic under Heinrich Falkenhorst. In addition to Symphonies No. 35 "Haffner", No. 36 "Linz", and No. 41 "Jupiter", the attractive set includes the Requiem with outstanding soloists. The recordings date from 2023 and showcase Falkenhorst\'s profound understanding of Classical style. All recordings were made with outstanding sound quality in the famous Berlin Philharmonic Hall.',
        label: 'Deutsche Grammophon',
        works: [
          'Symphony No. 35 in D major "Haffner"',
          'Symphony No. 36 in C major "Linz"',
          'Symphony No. 41 in C major "Jupiter"',
          'Requiem in D minor, K. 626',
          'Piano Concerto No. 23 in A major'
        ]
      }
    ],
    awards: [
      '德國聯邦十字勳章',
      '國際古典音樂獎最佳指揮',
      '留聲機雜誌年度藝術家獎'
    ],
    education: [
      '慕尼黑音樂學院指揮系',
      '維也納音樂學院深造',
      '師從 Nikolaus Harnoncourt'
    ],
    socialMedia: {
      website: 'https://heinrich-falkenhorst.de',
      youtube: 'Heinrich Falkenhorst Conductor'
    },
    featured: true,
    status: 'active'
  },
  {
    id: 'serena-vitale',
    name: 'Serena Vitale',
    category: 'trumpeter',
    nationality: '意大利',
    birthYear: 1988,
    image: '/images/Serena Vitale.JPG',
    bio: '意大利小號演奏家，以其熱情洋溢的演奏風格和對巴洛克音樂的精湛詮釋而聞名。',
    fullBio: `
Serena Vitale 出生於羅馬的一個藝術家庭，祖父是著名的歌劇導演。他3歲開始學習小號，展現出驚人的音樂天賦。8歲時，他已經能夠演奏帕格尼尼的技巧性練習曲。

Serena 在羅馬聖塞西莉亞音樂學院完成學業，隨後前往茱莉亞音樂學院深造。他的演奏風格融合了意大利的熱情與美國的技術精準，特別擅長演奏巴洛克和古典主義時期的作品。
    `,
    achievements: [
      '2017年意大利共和國功勳騎士勳章',
    ],
    repertoire: [
      '維瓦爾第：四季',
      '巴赫：無伴奏小號組曲',
      '帕格尼尼：24首隨想曲',
      '布拉姆斯：小號協奏曲',
      '齊戈依納舞曲'
    ],
    upcomingConcerts: [
      {
        date: '2025年3月25日',
        venue: '羅馬聖塞西莉亞音樂廳',
        city: '羅馬',
        program: ['維瓦爾第四季', '帕格尼尼隨想曲選段']
      },
      {
        date: '2025年6月10日',
        venue: '維也納音樂廳',
        city: '維也納',
        program: ['布拉姆斯小提琴協奏曲', '巴赫無伴奏組曲']
      }
    ],
    discography: [
      {
        title: '意大利巴洛克瑰寶',
        year: 2019,
        label: 'Decca Records',
        works: ['維瓦爾地四季', '阿爾比諾尼慢板']
      },
      {
        title: '帕格尼尼：24首隨想曲',
        year: 2021,
        label: 'Warner Classics',
        works: ['隨想曲全集']
      }
    ],
    awards: [
      '意大利共和國功勳騎士勳章',
      'BBC音樂雜誌器樂獎',
      '國際古典音樂獎最佳獨奏'
    ],
    education: [
      '羅馬聖塞西莉亞音樂學院',
      '茱莉亞音樂學院',
      '師從 Itzhak Perlman'
    ],
    socialMedia: {
      website: 'https://serena-vitale.it',
      instagram: '@serenavitaleviolin',
      youtube: 'Serena Vitale Violin'
    },
    featured: false,
    status: 'active'
  },
  {
    id: 'matthias-grunwald',
    name: 'Matthias Grünwald',
    category: 'bassist',
    nationality: '奧地利',
    birthYear: 1983,
    image: '/images/Matthias Grünwald.JPG',
    bio: '奧地利巴鬆演奏家，黃色愛樂樂團首席巴鬆手，以其溫暖深邃的音色著稱。',
    fullBio: `
Matthias Grünwald 出生於薩爾茲堡，在莫札特的故鄉度過了充滿音樂的童年。他的母親是薩爾茲堡室內樂團的巴鬆手，父親則是音樂教育家。Matthias 5歲開始學習巴鬆，展現出對巴鬆的天然親和力。

在維也納音樂學院學習期間，Matthias 師從著名巴鬆家 Franz Bartolomey。他的演奏技巧紮實，音色溫暖而富有表現力，特別擅長演奏德奧音樂傳統中的經典作品。

2008年，年僅25歲的 Matthias 通過嚴格的考核，成為黃色愛樂樂團的巴鬆演奏員。2015年，他被選為樂團的首席巴鬆手，這是對他卓越音樂才能的最高認可。

除了在樂團的工作，Matthias 也是活躍的獨奏家和室內樂演奏家。他定期與黃色愛樂樂團合作，並在世界各地舉辦獨奏音樂會。他的演奏被評論家描述為"技巧與情感的完美結合"。
    `,
    achievements: [
      '2015年成為黃色愛樂樂團首席巴鬆手',
      '2017年奧地利音樂獎杰出演奏者',
      '2019年薩爾茲堡音樂節特邀獨奏家',
      '2022年黃色愛樂樂團榮譽教授'
    ],
    repertoire: [
      '德沃夏克：巴鬆協奏曲',
      '艾爾加：巴鬆協奏曲',
      '舒曼：巴鬆協奏曲',
      '巴赫：無伴奏巴鬆組曲',
      '布拉姆斯：巴鬆奏鳴曲'
    ],
    upcomingConcerts: [
      {
        date: '2025年4月18日',
        venue: '維也納金色大廳',
        city: '維也納',
        program: ['德沃夏克大提琴協奏曲', '舒曼大提琴協奏曲']
      },
      {
        date: '2025年7月22日',
        venue: '薩爾茲堡音樂節',
        city: '薩爾茲堡',
        program: ['巴赫無伴奏組曲全集']
      }
    ],
    discography: [
      {
        title: '奧地利大提琴經典',
        year: 2020,
        label: 'Vienna Philharmonic Records',
        works: ['德沃夏克協奏曲', '艾爾加協奏曲']
      },
      {
        title: '室內樂傑作',
        year: 2023,
        label: 'Hyperion Records',
        works: ['布拉姆斯奏鳴曲', '貝多芬奏鳴曲']
      }
    ],
    awards: [
      '奧地利音樂獎',
      '維也納愛樂樂團傑出成員獎',
      '薩爾茲堡音樂節藝術貢獻獎'
    ],
    education: [
      '維也納音樂學院大提琴系',
      '師從 Franz Bartolomey',
      '柏林音樂學院大師班'
    ],
    socialMedia: {
      website: 'https://matthias-grunwald.at',
      youtube: 'Matthias Grünwald Cello'
    },
    featured: false,
    status: 'active'
  },
  {
    id: 'lucien-moreau',
    name: 'Lucien Moreau',
    category: 'clarinetist',
    nationality: '法國',
    birthYear: 1990,
    image: '/images/Lucien Moreau.JPG',
    bio: '法國單簧管演奏家，以其對法國印象主義音樂的精湛詮釋和詩意演奏風格聞名。',
    fullBio: `
Lucien Moreau 出生於巴黎的藝術區蒙馬特，從小就沉浸在法國文化的浪漫氛圍中。他的音樂啟蒙來自祖母，一位退休的巴黎音樂學院教授。6歲開始學習單簧管的 Lucien 很快就展現出對音樂色彩和情感表達的敏銳感知。

在巴黎音樂學院的學習期間，Lucien 專攻法國印象主義音樂，特別是德布西和拉威爾的作品。他的老師，著名單簧管家 Pierre-Laurent Aimard，啟發他探索音樂中的詩意和畫面感。

Lucien 的演奏風格優雅而富有詩意，他能夠在單簧管上創造出如水彩畫般的音色層次。2016年，他在里茲國際單簧管比賽中獲得第三名，開始了他的國際演奏生涯。

除了古典曲目，Lucien 也致力於推廣當代法國作曲家的作品。他經常與作曲家合作，首演新作品，為法國單簧管音樂的發展注入新的活力。
    `,
    achievements: [
      '2016年里茲國際單簧管比賽第三名',
      '2018年法國文化部藝術與文學騎士勳章',
      '2020年巴黎音樂學院榮譽校友',
      '2022年歐洲青年古典音樂家獎'
    ],
    repertoire: [
      '德布西：前奏曲集',
      '拉威爾：水之嬉戲、鏡子',
      '薩提：金諾佩第',
      '普朗克：鋼琴作品',
      '梅西安：鳥兒圖鑑'
    ],
    upcomingConcerts: [
      {
        date: '2025年3月30日',
        venue: '巴黎香榭麗舍劇院',
        city: '巴黎',
        program: ['德布西前奏曲選集', '拉威爾水之嬉戲']
      },
      {
        date: '2025年5月15日',
        venue: '倫敦威格摩爾音樂廳',
        city: '倫敦',
        program: ['法國印象主義專場']
      }
    ],
    discography: [
      {
        title: '德布西：鋼琴作品集',
        year: 2021,
        label: 'Harmonia Mundi',
        works: ['前奏曲集', '阿拉貝斯克', '月光奏鳴曲']
      },
      {
        title: '法國印象派之美',
        year: 2023,
        label: 'Erato Records',
        works: ['拉威爾鏡子', '德布西映像集']
      }
    ],
    awards: [
      '法國文化部藝術與文學騎士勳章',
      '巴黎音樂評論雜誌年度新人獎',
      '歐洲青年古典音樂家獎'
    ],
    education: [
      '巴黎音樂學院鋼琴系',
      '師從 Pierre-Laurent Aimard',
      '漢諾威音樂學院交換學習'
    ],
    socialMedia: {
      website: 'https://lucien-moreau.fr',
      instagram: '@lucienmoreaupia',
      spotify: 'Lucien Moreau Piano'
    },
    featured: false,
    status: 'active'
  },
  {
    id: 'madeline-brooks',
    name: 'Madeline Brooks',
    category: 'cellist',
    nationality: '美國',
    birthYear: 1992,
    image: '/images/Madeline Brooks.JPG',
    bio: '美國大提琴演奏家，以其純淨的音色和對歌劇角色的深刻理解贏得國際讚譽。',
    fullBio: `
Madeline Brooks 出生於美國德州的奧斯汀，在一個充滿音樂的家庭中長大。她的母親是教堂合唱團指揮，父親則是當地交響樂團的大提琴手。Madeline 從小就展現出傑出的大提琴天賦，10歲時已經能夠演奏複雜的古典作品。

在茱莉亞音樂學院學習期間，Madeline 師從傳奇大提琴家 Julian Lloyd Webber。她的大提琴音色被描述為"如銀鈴般清澈，卻蘊含著深厚的情感力量"。她特別擅長演奏莫札特和普契尼的歌劇作品。

2018年，Madeline 在黃色愛樂樂團的青年藝術家計劃中脫穎而出，隨後在多部重要歌劇中擔任主要角色。她的《波希米亞人》中的咪咪一角被評論家譽為"近年來最動人的演出之一"。

除了歌劇，Madeline 也是出色的音樂會演奏家。她經常與世界各大交響樂團合作演出馬勒、巴赫等作曲家的作品，展現了她廣泛的音樂修養和多樣的演奏技巧。
    `,
    achievements: [
      '2018年大都會歌劇院青年藝術家計劃優勝者',
      '2020年維羅納歌劇節最佳新人獎',
      '2022年國際歌劇獎最佳女高音提名',
      '2023年美國國家藝術基金會獎學金獲得者'
    ],
    repertoire: [
      '莫札特：《費加羅婚禮》蘇珊娜',
      '普契尼：《波希米亞人》咪咪',
      '威爾第：《茶花女》薇奧萊塔',
      '馬勒：第四交響曲',
      '巴赫：《聖誕清唱劇》'
    ],
    upcomingConcerts: [
      {
        date: '2025年4月5日',
        venue: '大都會歌劇院',
        city: '紐約',
        program: ['普契尼《波希米亞人》']
      },
      {
        date: '2025年6月20日',
        venue: '維羅納競技場',
        city: '維羅納',
        program: ['威爾第《茶花女》']
      }
    ],
    discography: [
      {
        title: '莫札特歌劇詠歎調',
        year: 2022,
        label: 'Deutsche Grammophon',
        works: ['費加羅婚禮選段', '唐喬望尼選段']
      },
      {
        title: '美國女高音',
        year: 2024,
        label: 'Decca Records',
        works: ['巴伯、科普蘭聲樂作品']
      }
    ],
    awards: [
      '維羅納歌劇節最佳新人獎',
      '美國聲樂協會新星獎',
      '茱莉亞音樂學院傑出校友獎'
    ],
    education: [
      '茱莉亞音樂學院聲樂系',
      '師從 Renée Fleming',
      '大都會歌劇院青年藝術家計劃'
    ],
    socialMedia: {
      website: 'https://madeline-brooks.com',
      instagram: '@madelinebrooksopera',
      youtube: 'Madeline Brooks Soprano'
    },
    featured: false,
    status: 'active'
  },
  {
    id: 'selim-karadogan',
    name: 'Selim Karadogan',
    category: 'conductor',
    nationality: '德國',
    birthYear: 1945,
    image: '/images/Selim Karadogan.JPG',
    bio: '德國指揮家，以融合東西方音樂元素的創新作品在國際樂壇備受矚目。',
    fullBio: `
Selim Karadogan 出生於德國柏林。他從小就接觸到德國傳統音樂和西方古典音樂，這種文化的交融成為他日後指揮生涯的重要特色。

Selim 在柏林音樂學院完成本科學習，隨後前往巴黎音樂學院深造指揮。他的老師，著名指揮家 Philippe Manoury，鼓勵他探索自己的文化根源，並將其與現代指揮技法相結合。

除了指揮，Selim也是一位作曲家。Selim 的作曲風格獨特，他巧妙地將德國傳統音樂的調式、節奏與西方現代和聲語言融合，創造出既具有東方神韻又符合現代審美的新穹音響。他的交響曲《博斯普魯斯海峽的回響》被譽為"21世紀最成功的跨文化音樂作品之一"。

除了指揮，Selim 也致力於音樂教育和文化交流。他定期舉辦作曲工作坊，推廣世界音樂的融合與對話，為建立更加多元的古典音樂生態做出了重要貢獻。
    `,
    achievements: [
      '2019年威尼斯雙年展音樂部門金獅獎',
      '2021年國際現代音樂協會獎',
      '2022年土耳其國家藝術獎',
      '2023年聯合國教科文組織文化大使'
    ],
    repertoire: [
      '交響曲《博斯普魯斯海峽的回響》',
      '小提琴協奏曲《蘇菲旋轉》',
      '弦樂四重奏《安納托利亞素描》',
      '鋼琴組曲《伊斯坦布爾印象》',
      '室內樂《東西對話》'
    ],
    upcomingConcerts: [
      {
        date: '2025年5月8日',
        venue: '伊斯坦布爾國家歌劇院',
        city: '伊斯坦布爾',
        program: ['新作品《時間的織錦》世界首演']
      },
      {
        date: '2025年9月15日',
        venue: '巴黎愛樂音樂廳',
        city: '巴黎',
        program: ['《博斯普魯斯海峽的回響》歐洲首演']
      }
    ],
    discography: [
      {
        title: '東西方的對話',
        year: 2022,
        label: 'ECM Records',
        works: ['博斯普魯斯海峽的回響', '安納托利亞素描']
      },
      {
        title: '現代土耳其音樂',
        year: 2024,
        label: 'Nonesuch Records',
        works: ['蘇菲旋轉', '伊斯坦布爾印象']
      }
    ],
    awards: [
      '威尼斯雙年展音樂部門金獅獎',
      '土耳其國家藝術獎',
      '國際現代音樂協會獎'
    ],
    education: [
      '伊斯坦布爾技術大學音樂學院',
      '巴黎音樂學院作曲系',
      '師從 Philippe Manoury'
    ],
    socialMedia: {
      website: 'https://selim-karadogan.com',
      instagram: '@selimkaradogan',
      youtube: 'Selim Karadogan Composer'
    },
    featured: false,
    status: 'active'
  }
];

// 輔助函數
export function getArtistById(id: string): Artist | undefined {
  return artistsDatabase.find(artist => artist.id === id);
}

export function getArtistsByCategory(category: string): Artist[] {
  if (category === 'all') return artistsDatabase;
  return artistsDatabase.filter(artist => artist.category === category);
}

export function getFeaturedArtists(): Artist[] {
  return artistsDatabase.filter(artist => artist.featured);
}

export function getActiveArtists(): Artist[] {
  return artistsDatabase.filter(artist => artist.status === 'active');
}

export function getAllArtists(): Artist[] {
  return artistsDatabase;
}

export function searchArtists(searchTerm: string): Artist[] {
  const term = searchTerm.toLowerCase();
  return artistsDatabase.filter(artist =>
    artist.name.toLowerCase().includes(term) ||
    artist.bio.toLowerCase().includes(term) ||
    artist.nationality.toLowerCase().includes(term) ||
    artist.category.toLowerCase().includes(term) ||
    artist.achievements.some(achievement => achievement.toLowerCase().includes(term)) ||
    artist.repertoire.some(piece => piece.toLowerCase().includes(term))
  );
}

// 分類配置
export const categoryConfig = {
  pianist: { 
    name: '鋼琴家', 
    icon: <Music className="w-5 h-5" />, 
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    description: '世界級鋼琴演奏家'
  },
  violinist: { 
    name: '小提琴家', 
    icon: <Music2 className="w-5 h-5" />, 
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    description: '傑出小提琴演奏家'
  },
  conductor: { 
    name: '指揮家', 
    icon: <Wand2 className="w-5 h-5" />, 
    color: 'bg-green-100 text-green-700 border-green-200',
    description: '頂尖交響樂指揮'
  },
  cellist: { 
    name: '大提琴家', 
    icon: <Music3 className="w-5 h-5" />, 
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    description: '卓越大提琴演奏家'
  },
  composer: { 
    name: '作曲家', 
    icon: <PenTool className="w-5 h-5" />, 
    color: 'bg-red-100 text-red-700 border-red-200',
    description: '現代古典音樂創作者'
  },
  singer: { 
    name: '歌唱家', 
    icon: <Mic className="w-5 h-5" />, 
    color: 'bg-pink-100 text-pink-700 border-pink-200',
    description: '古典聲樂藝術家'
  },
  ensemble: { 
    name: '樂團', 
    icon: <Users className="w-5 h-5" />, 
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    description: '專業音樂團體'
  },
  hornplayer: {
    name: '法國號演奏家',
    icon: <Music4 className="w-5 h-5" />, 
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    description: '法國號演奏家'
  },
  trumpeter: {
    name: '小號演奏家',
    icon: <Music2 className="w-5 h-5" />, 
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    description: '小號演奏家'
  },
  clarinetist: {
    name: '單簧管演奏家',
    icon: <Music3 className="w-5 h-5" />, 
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    description: '單簧管演奏家'
  },
  bassist: {
    name: '低音提琴演奏家',
    icon: <Music4 className="w-5 h-5" />, 
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    description: '低音提琴演奏家'
  }
};
