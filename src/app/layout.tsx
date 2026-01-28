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
          {children}
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  )
}
