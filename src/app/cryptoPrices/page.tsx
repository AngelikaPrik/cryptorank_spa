'use client'
import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import { styled } from 'styled-components'
import { formatNumber } from '@/utils'
import { CurrencyListData } from '@/types'
import { COINDATA_API_URL } from '@/constants'
import { Loader } from '@/components/Loader'

const Container = styled.div`
  max-width: 80%;
  margin: 0 auto;
`
const Table = styled.table`
  margin: 10px;
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
`
const fetcher: Fetcher<CurrencyListData, string> = async (url: string) => {
  const { data } = await axios.get(url)
  return data
}

export default function CryptoPrices() {
  const { data, error } = useSWR<CurrencyListData>(COINDATA_API_URL, fetcher)

  if (error) return <Container>Error loading data</Container>
  if (!data)
    return (
      <Container>
        <Loader />
      </Container>
    )

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
