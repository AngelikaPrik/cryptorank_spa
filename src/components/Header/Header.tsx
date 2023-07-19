'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { styled } from 'styled-components'

const HeaderBox = styled.header`
  max-width: 95%;
  margin: 10px auto;
  padding: 20px;
  margin-bottom: 30px;
  background: #fff;
  border-radius: 10px;
`
const Box = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`

export default function Header() {
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
