import { CurrencyTable } from '@/components/CurrencyTable'
import { render, waitFor } from '@testing-library/react'

const mockData = {
  data: [
    {
      name: 'Bitcoin',
      category: 'Cryptocurrency',
      circulatingSupply: 18789787,
      values: {
        USD: {
          price: 40000,
          marketCap: 800000000,
        },
      },
      symbol: 'BTC',
    },
  ],
}

describe('CurrencyTable', () => {
  test('should render table rows with correct data', () => {
    const { getByText } = render(<CurrencyTable data={mockData} />)

    const nameColumn = getByText('Bitcoin')
    const priceColumn = getByText('$ 40,000')
    const circulatingSupplyColumn = getByText('BTC 18.79M')
    const marketCapColumn = getByText('$ 800.00M')
    const categoryColumn = getByText('Cryptocurrency')

    waitFor(() => {
      expect(nameColumn).toBeInTheDocument()
      expect(priceColumn).toBeInTheDocument()
      expect(circulatingSupplyColumn).toBeInTheDocument()
      expect(marketCapColumn).toBeInTheDocument()
      expect(categoryColumn).toBeInTheDocument()
    })
  })
})
