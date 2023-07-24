import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import StyledComponentsRegistry from './registry'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoRank SPA',
  description: 'Test task',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
          <div className={inter.className}>
            <Header />
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
