import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './registry'
import { Header } from '@/components/layout/Header'

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
