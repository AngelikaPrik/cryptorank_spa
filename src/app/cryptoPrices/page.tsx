'use client'
import { styled } from 'styled-components'
import { CurrencyListData } from '@/types'
import { COINDATA_API_URL } from '@/constants'
import { Loader } from '@/components/ui/Loader'
import { CurrencyTable } from '@/components/CurrencyTable'
import { UseFetching } from '@/hooks/useFetching'

const Container = styled.div`
  max-width: 80%;
  margin: 0 auto;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export default function CryptoPrices() {
  const { data, error, isLoading } =
    UseFetching<CurrencyListData>(COINDATA_API_URL)

  if (error) return <Container>Error loading data</Container>
  if (isLoading || !data) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  return (
    <Container>
      <CurrencyTable data={data} />
    </Container>
  )
}
