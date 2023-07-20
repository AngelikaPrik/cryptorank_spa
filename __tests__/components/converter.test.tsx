import { Converter } from '@/components/Converter'
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'

describe('Converter: ', () => {
  test('should render converter components', () => {
    const { getByTestId, getByText } = render(<Converter />)

    waitFor(() => {
      expect(getByTestId('amount-input')).toBeInTheDocument()
      expect(getByTestId('from')).toBeInTheDocument()
      expect(getByTestId('to')).toBeInTheDocument()
      expect(getByTestId('flipCurrency')).toBeInTheDocument()
      expect(getByTestId('result')).toBeInTheDocument()
    })
    waitForElementToBeRemoved(getByTestId('loader'))

    jest.mock('axios', () => ({
      get: jest.fn(() => Promise.reject(new Error('Failed to fetch data'))),
    }))

    waitFor(() => {
      expect(getByText('Error loading data')).toBeInTheDocument()
    })

    waitFor(() => {
      const amountInput = getByTestId('amount-input') as HTMLInputElement
      fireEvent.change(amountInput, { target: { value: '1' } })
      expect(amountInput.value).toBe('1')
    })

    waitFor(() => {
      const flipCurrencyButton = getByTestId('flipCurrency')

      expect(flipCurrencyButton).toBeInTheDocument()
      expect(flipCurrencyButton).toBeEnabled()

      fireEvent.click(flipCurrencyButton)
    })

    waitFor(() => {
      expect((getByTestId('from') as HTMLSelectElement).value).toBe('USD')
      expect((getByTestId('to') as HTMLSelectElement).value).toBe('BTC')
    })
  })
})
