'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * 頁腳組件
 * 包含網站連結、社交媒體和版權信息
 */
interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const footerLinks = {
    explore: [
      { name: '藝術家', href: '/artists' },
      { name: '發行', href: '/releases' },
      { name: '播放清單', href: '/playlists' },
      { name: '影片', href: '/videos' },
    ],
    company: [
      { name: '關於', href: '/about' },
      { name: '消息', href: '/news' },
      { name: '傳承', href: '/legacy' },
      { name: '電子報', href: '/newsletter' },
    ]
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      ),
      href: 'https://facebook.com'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.295C3.95 14.81 3.017 13.041 3.017 11.987c0-2.17 1.76-3.93 3.93-3.93s3.93 1.76 3.93 3.93c0 2.17-1.76 3.93-3.93 3.93zM16.988 8.449c-1.297 0-2.448-.49-3.323-1.295C12.49 6.27 11.557 4.501 11.557 3.447c0-2.17 1.76-3.93 3.93-3.93s3.93 1.76 3.93 3.93c0 2.17-1.76 3.93-3.93 3.93z"/>
        </svg>
      ),
      href: 'https://instagram.com'
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      href: 'https://youtube.com'
    }
  ];

  return (
    <footer className={`bg-neutral-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo和描述 */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Image
                src="/images/logo.png"
                alt="Kariton Classical Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">
                Kariton Classical
              </span>
            </Link>
            
            <p className="text-neutral-300 mb-6 max-w-md">
              探索古典音樂的永恆之美，體驗世界頂尖藝術家的精彩演出，感受古典音樂的深度與魅力。
            </p>
            
            {/* 社交媒體連結 */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 探索連結 */}
          <div>
            <h3 className="font-semibold text-white mb-4">探索</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 公司連結 */}
          <div>
            <h3 className="font-semibold text-white mb-4">公司</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 版權信息 */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Kariton Classical. 版權所有。</p>
        </div>
      </div>
    </footer>
  );
}