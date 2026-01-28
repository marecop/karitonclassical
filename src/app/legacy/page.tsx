'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState } from 'react';
import { Music, Users, BookOpen, Star, Globe, History, School } from 'lucide-react';

type MusicEraKey = 'baroque' | 'classical' | 'romantic' | 'modern';

export default function LegacyPage() {
  const [activeEra, setActiveEra] = useState<MusicEraKey>('baroque');

  const musicEras: Record<MusicEraKey, {
    name: string;
    period: string;
    description: string;
    characteristics: string[];
    composers: { name: string; nationality: string; works: string; }[];
  }> = {
    baroque: {
      name: '巴洛克時期',
      period: '1600-1750',
      description: '以對位法和裝飾性旋律為特色的音樂時代',
      characteristics: ['複雜的對位結構', '裝飾性旋律線', '連續低音', '宗教音樂的黃金時代'],
      composers: [
        { name: '約翰·塞巴斯蒂安·巴赫', nationality: '德國', works: '《馬太受難曲》、《布蘭登堡協奏曲》' },
        { name: '喬治·弗里德里希·韓德爾', nationality: '德英', works: '《彌賽亞》、《水上音樂》' },
        { name: '安東尼奧·維瓦爾第', nationality: '意大利', works: '《四季》協奏曲' }
      ]
    },
    classical: {
      name: '古典主義時期',
      period: '1750-1820',
      description: '追求平衡與優雅，確立了奏鳴曲式和交響曲的經典形式',
      characteristics: ['明確的結構形式', '平衡的樂句', '主調音樂', '器樂作品的發展'],
      composers: [
        { name: '沃爾夫岡·阿瑪迪斯·莫札特', nationality: '奧地利', works: '《費加羅的婚禮》、第40號交響曲' },
        { name: '路德維希·范·貝多芬', nationality: '德國', works: '《第九交響曲》、《月光奏鳴曲》' },
        { name: '約瑟夫·海頓', nationality: '奧地利', works: '《創世紀》、倫敦交響曲' }
      ]
    },
    romantic: {
      name: '浪漫主義時期',
      period: '1820-1900',
      description: '強調情感表達和個人風格，音樂語言更加豐富多彩',
      characteristics: ['豐富的和聲語言', '情感的深度表達', '標題音樂的興起', '民族風格的發展'],
      composers: [
        { name: '弗雷德里克·肖邦', nationality: '波蘭', works: '《夜曲》、《敘事曲》' },
        { name: '約翰內斯·布拉姆斯', nationality: '德國', works: '《匈牙利舞曲》、第一號鋼琴協奏曲' },
        { name: '彼得·伊里奇·柴可夫斯基', nationality: '俄國', works: '《天鵝湖》、《胡桃夾子》' }
      ]
    },
    modern: {
      name: '現代時期',
      period: '1900-現在',
      description: '打破傳統束縛，探索新的音樂語言和表現方式',
      characteristics: ['無調性音樂', '新的節拍概念', '電子音樂的興起', '跨文化融合'],
      composers: [
        { name: '伊果·史特拉汶斯基', nationality: '俄法', works: '《春之祭》、《火鳥》' },
        { name: '克勞德·德布西', nationality: '法國', works: '《月光》、《大海》' },
        { name: '阿諾·荀白克', nationality: '奧地利', works: '《月迷彼埃羅》' }
      ]
    }
  };

  const legacyValues = [
    {
      icon: <Music className="w-10 h-10 text-primary-600" />,
      title: '藝術傳承',
      description: '古典音樂承載著數百年來人類的智慧結晶，每一個音符都訴說著歷史的故事。'
    },
    {
      icon: <Users className="w-10 h-10 text-primary-600" />,
      title: '文化瑰寶',
      description: '跨越國界和語言，古典音樂成為全人類共同的文化遺產和精神財富。'
    },
    {
      icon: <School className="w-10 h-10 text-primary-600" />,
      title: '教育價值',
      description: '通過古典音樂教育，培養審美能力、想像力和創造力，豐富精神世界。'
    },
    {
      icon: <Star className="w-10 h-10 text-primary-600" />,
      title: '永恆價值',
      description: '真正偉大的音樂作品超越時代，在每個時代都能找到新的詮釋和理解。'
    }
  ];

  const achievements = [
    {
      year: '1685',
      title: '巴赫與韓德爾誕生',
      description: '兩位巴洛克音樂巨匠的誕生，為音樂史寫下重要篇章'
    },
    {
      year: '1756',
      title: '莫札特誕生',
      description: '音樂神童的降臨，開創古典主義音樂的黃金時代'
    },
    {
      year: '1770',
      title: '貝多芬誕生',
      description: '音樂史上最偉大的作曲家之一，連接古典與浪漫時期'
    },
    {
      year: '1875',
      title: '維也納音樂之友協會成立',
      description: '世界著名的金色大廳啟用，成為古典音樂的聖地'
    },
    {
      year: '1957',
      title: '卡拉揚時代開始',
      description: '赫伯特·馮·卡拉揚接掌柏林愛樂，開創指揮藝術新紀元'
    },
    {
      year: '2025',
      title: 'Kariton Classical 使命',
      description: '致力於將古典音樂傳承給新世代，讓美好的音樂永續流傳'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-8 pb-16">
        {/* 頁面標題區域 */}
        <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/Yellow Philharmoniker.png"
              alt="Classical Heritage"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                音樂傳承
              </h1>
              <p className="text-xl md:text-2xl font-light mb-8 text-neutral-200 max-w-3xl mx-auto animate-fade-in-up">
                穿越時空的旋律，承載著人類文明的精華
              </p>
              <div className="w-32 h-1 bg-primary-500 mx-auto animate-fade-in-up"></div>
            </div>
          </div>
        </section>

        {/* 傳承理念區域 */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">傳承的力量</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                古典音樂不僅是聲音的藝術，更是文化的載體、歷史的見證、心靈的橋樑
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {legacyValues.map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{value.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 音樂歷史時期 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">音樂歷史長河</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                從巴洛克的莊嚴到現代的創新，探索古典音樂的演變歷程
              </p>
            </div>

            {/* 時期選擇器 */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {(Object.keys(musicEras) as MusicEraKey[]).map((key) => {
                const era = musicEras[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveEra(key)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      activeEra === key
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {era.name}
                  </button>
                );
              })}
            </div>

            {/* 當前時期詳情 */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-3xl font-bold text-neutral-900">
                      {musicEras[activeEra].name}
                    </h3>
                    <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {musicEras[activeEra].period}
                    </span>
                  </div>
                  <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                    {musicEras[activeEra].description}
                  </p>
                  
                  <h4 className="text-xl font-bold text-neutral-900 mb-4">時代特色</h4>
                  <ul className="space-y-3">
                    {musicEras[activeEra].characteristics.map((char, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-neutral-700">{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-6">代表作曲家</h4>
                  <div className="space-y-6">
                    {musicEras[activeEra].composers.map((composer, index) => (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-start justify-between mb-3">
                          <h5 className="text-lg font-bold text-neutral-900">{composer.name}</h5>
                          <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm">
                            {composer.nationality}
                          </span>
                        </div>
                        <p className="text-neutral-600 text-sm">{composer.works}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 歷史里程碑 */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">歷史里程碑</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                記錄古典音樂發展歷程中的重要時刻
              </p>
            </div>

            <div className="relative">
              {/* 時間線 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 h-full"></div>
              
              <div className="space-y-12">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="text-2xl font-bold text-primary-600 mb-2">{achievement.year}</div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">{achievement.title}</h3>
                        <p className="text-neutral-600">{achievement.description}</p>
                      </div>
                    </div>
                    
                    {/* 時間點 */}
                    <div className="relative z-10">
                      <div className="w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Kariton Classical 使命 */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">我們的使命</h2>
            <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed">
              Kariton Classical 致力於保存、傳承和推廣古典音樂文化。我們相信，
              通過現代科技與傳統藝術的結合，能夠讓更多人感受到古典音樂的魅力，
              讓這份珍貴的文化遺產在新時代綻放光芒。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <Music className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">保存經典</h3>
                <p className="text-primary-100">數位化保存珍貴的音樂錄音，確保經典作品永世流傳</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <School className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">教育推廣</h3>
                <p className="text-primary-100">通過教育和推廣活動，培養新一代的古典音樂愛好者</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">全球連結</h3>
                <p className="text-primary-100">打破地域界限，讓世界各地的人們都能接觸到優質的古典音樂</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}