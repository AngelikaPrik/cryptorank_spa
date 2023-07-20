'use client'
import useSWR from 'swr'
import { styled } from 'styled-components'
import { formatNumber } from '@/utils'
import { CurrencyListData } from '@/types'
import { COINDATA_API_URL } from '@/constants'
import { Loader } from '@/components/Loader'
import { fetcher } from '@/api/fetcher'

const Container = styled.div`
  max-width: 80%;
  margin: 0 auto;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`
const Table = styled.table`
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  overflow: hidden;
  border-spacing: 0;

  thead tr {
    background-color: #d5eeff;
  }
  tbody tr:nth-child(even) {
    background-color: #f4faff;
  }

  th,
  td {
    padding: 20px 10px;
    text-align: left;
  }
  th:first-child,
  td:first-child {
    padding-left: 30px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    th,
    td {
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    font-size: 12px;
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
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price USD</th>
            <th>Circulating Supply</th>
            <th>Market Cap</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map(
            ({ name, category, circulatingSupply, values, symbol }) => (
              <tr key={circulatingSupply}>
                <td>{name}</td>
                <td>$ {formatNumber(values.USD.price)}</td>
                <td>
                  {symbol} {formatNumber(circulatingSupply)}
                </td>
                <td>$ {formatNumber(values.USD.marketCap)}</td>
                <td>{category}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Container>
  )
}
