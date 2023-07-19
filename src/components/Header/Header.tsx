'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, HeaderBox } from './style'

export const Header = () => {
  const pathname = usePathname()

  const activePath = (path = '/') => {
    return pathname === path ? { textDecoration: 'underline' } : {}
  }

  return (
    <HeaderBox>
      <Box>
        <Link href='/'>
          <p style={activePath('/')}>Converter</p>
        </Link>
        <Link href='/cryptoPrices'>
          <p style={activePath('/cryptoPrices')}>Cryptocurrency prices</p>
        </Link>
      </Box>
    </HeaderBox>
  )
}
