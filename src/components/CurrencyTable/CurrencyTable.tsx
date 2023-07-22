import { formatNumber } from '@/utils'
import { CurrencyListData } from '@/types'
import { Table } from '../ui/Table'
import { memo } from 'react'

export const CurrencyTable = memo(({ data }: PropsType) => {
  const theads = [
    'Name',
    'Price USD',
    'Circulating Supply',
    'Market Cap',
    'Category',
  ]

  return (
    <Table theads={theads}>
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
    </Table>
  )
})

interface PropsType {
  data: CurrencyListData
}
