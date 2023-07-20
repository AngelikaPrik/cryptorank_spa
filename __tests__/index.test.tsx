import Home from '@/app/page'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Home', () => {
  test('render homepage', () => {
    const { getByRole } = render(<Home />)
    const main = getByRole('main')
    expect(main).toBeInTheDocument()
  })
})
