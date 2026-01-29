import { Inter } from 'next/font/google'
import './globals.css'
import { PlayerProvider } from '@/context/PlayerContext';
import PlayerBar from '@/components/PlayerBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kariton Classical | 加里敦古典音樂',
  description: '探索古典音樂的永恆之美 - Discover the Timeless Beauty of Classical Music',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <PlayerProvider>
          {/* 頁面內容添加 padding-top，避免被 fixed navigation 遮擋 */}
          {/* Navigation 在 children 中，但因為是 fixed 定位，不受此 padding 影響 */}
          <div className="pt-16">
            {children}
          </div>
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  )
}
