import { Converter } from '@/components/Converter'
import { render, waitFor } from '@testing-library/react'

describe('Converter: ', () => {
  test('should render converter components', () => {
    const { getByTestId } = render(<Converter />)

    waitFor(() => {
      expect(getByTestId('amount-input')).toBeInTheDocument()
      expect(getByTestId('from')).toBeInTheDocument()
      expect(getByTestId('to')).toBeInTheDocument()
      expect(getByTestId('flipCurrency')).toBeInTheDocument()
      expect(getByTestId('result')).toBeInTheDocument()
    })
  })
})
