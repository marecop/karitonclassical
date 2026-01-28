'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, User, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = 'bg-white shadow-sm' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: '首頁', icon: null },
    { href: '/news', label: '新聞', icon: null },
    { href: '/artists', label: '藝術家', icon: null },
    { href: '/releases', label: '發行', icon: null },
    { href: '/videos', label: '視頻', icon: null },
    { href: '/playlists', label: '播放清單', icon: null },
    { href: '/about', label: '關於', icon: null },
    { href: '/newsletter', label: '訂閱', icon: null },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // 如果傳入的 className 不包含 bg-，則使用默認的背景色
  const containerClass = className.includes('bg-') ? className : `${className} bg-white shadow-sm`;

  // 判斷是否為透明背景（用於播放列表頁）
  const isTransparent = className.includes('bg-transparent');
  const textColor = isTransparent ? 'text-white hover:text-gray-300' : 'text-neutral-600 hover:text-red-600';
  const logoSrc = isTransparent ? '/images/logo.png' : '/images/logo.png'; // 如果有白色 logo 可以替換

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${containerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="relative w-8 h-8 mr-2">
                <Image
                  src={logoSrc}
                  alt="Kariton Classical"
                  fill
                  className="object-contain"
                />
              </div>
              <span className={`font-serif font-bold text-xl ${isTransparent ? 'text-white' : 'text-neutral-900'}`}>
                Kariton<span className="text-red-600">Classical</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-red-600'
                    : textColor
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className={`${textColor} transition-colors`}>
              <Search className="w-5 h-5" />
            </button>
            <button className={`${textColor} transition-colors`}>
              <Globe className="w-5 h-5" />
            </button>
            <button className={`${textColor} transition-colors`}>
              <User className="w-5 h-5" />
            </button>
            <button className={`${textColor} transition-colors relative`}>
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              } focus:outline-none`}
            >
              {isOpen ? <X className="block w-6 h-6" /> : <Menu className="block w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'text-red-600 bg-red-50'
                    : 'text-neutral-600 hover:text-red-600 hover:bg-neutral-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
