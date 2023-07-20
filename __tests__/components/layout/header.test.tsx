import { Header } from '@/components/layout/Header'
import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { NextRouter } from 'next/router'

export const createMockRouter = (
  router: Partial<NextRouter> = {}
): NextRouter =>
  ({
    ...router,
  }) as NextRouter

describe('Header', () => {
  test('should render the Header component', () => {
    const { getByText } = render(<Header />)
    const converterLink = getByText('Converter')
    const cryptoPricesLink = getByText('Cryptocurrency prices')

    expect(converterLink).toBeInTheDocument()
    expect(cryptoPricesLink).toBeInTheDocument()
  })

  test('should navigate to "/" when clicking on "Converter" text', () => {
    const router = createMockRouter({
      pathname: '/',
    })

    const { getByText } = render(<Header />)

    const converterLink = getByText('Converter')
    fireEvent.click(converterLink)

    waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/')
    })
  })

  test('should navigate to "/cryptoPrices" when clicking on "Cryptocurrency prices" text', () => {
    const router = createMockRouter({
      pathname: '/',
    })

    const { getByText } = render(<Header />)

    const cryptoPricesLink = getByText('Cryptocurrency prices')
    fireEvent.click(cryptoPricesLink)

    waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/cryptoPrices')
    })
  })
})
