'use client'
import useSWR from 'swr'
import { styled } from 'styled-components'
import { CurrencyListData } from '@/types'
import { COINDATA_API_URL } from '@/constants'
import { Loader } from '@/components/ui/Loader'
import { fetcher } from '@/api/fetcher'
import { CurrencyTable } from '@/components/CurrencyTable'

const Container = styled.div`
  max-width: 80%;
  margin: 0 auto;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export default function CryptoPrices() {
  const { data, error, isLoading } = useSWR<CurrencyListData, Error>(
    COINDATA_API_URL,
    fetcher
  )

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
