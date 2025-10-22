import { CoffeeShopsFilters } from '@app/coffee-shops/components/coffee-shops-filters'
import { fireEvent, render, screen } from '@testing-library/react'
import { useCoffeeShops } from '@app/coffee-shops/contexts/coffee-shops.context'

jest.mock('@app/coffee-shops/contexts/coffee-shops.context')

describe('Coffee Shops `filters Tests', () => {
  let filterCoffeeShopsMock

  beforeEach(() => {
    filterCoffeeShopsMock = jest.fn()

    useCoffeeShops.mockReturnValue({
      filterCoffeeShops: filterCoffeeShopsMock,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render filters correctly', async () => {
    render(<CoffeeShopsFilters />)

    const xCoordinateInput = screen.getByRole('spinbutton', {
      name: /X/i,
    })
    const yCoordinateInput = screen.getByRole('spinbutton', {
      name: /Y/i,
    })
    const nameInput = screen.getByRole('textbox', { name: /Name/i })

    expect(xCoordinateInput).toBeInTheDocument()
    expect(yCoordinateInput).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
  })

  it('should sort by distance when coordinates are provided', async () => {
    render(<CoffeeShopsFilters />)

    const xCoordinateInput = screen.getByRole('spinbutton', {
      name: /X/i,
    })
    const yCoordinateInput = screen.getByRole('spinbutton', {
      name: /Y/i,
    })

    fireEvent.change(xCoordinateInput, { target: { value: '10' } })
    fireEvent.change(yCoordinateInput, { target: { value: '20' } })

    // wait for debounce
    await new Promise((r) => setTimeout(r, 600))

    expect(filterCoffeeShopsMock).toHaveBeenCalledWith({
      position: {
        x: 10,
        y: 20,
      },
    })
  })

  it('should filter coffee shops with no params when one coordinate is provided, and no name provided', async () => {
    render(<CoffeeShopsFilters />)

    const xCoordinateInput = screen.getByRole('spinbutton', {
      name: /X/i,
    })
    const yCoordinateInput = screen.getByRole('spinbutton', {
      name: /Y/i,
    })

    fireEvent.change(xCoordinateInput, { target: { value: '10' } })
    fireEvent.change(yCoordinateInput, { target: { value: '' } })

    // wait for debounce
    await new Promise((r) => setTimeout(r, 600))

    expect(filterCoffeeShopsMock).toHaveBeenCalledWith({})
  })

  it('should filter coffee shops when one coordinate is provided, and name is provided', async () => {
    render(<CoffeeShopsFilters />)

    const xCoordinateInput = screen.getByRole('spinbutton', {
      name: /X/i,
    })
    const yCoordinateInput = screen.getByRole('spinbutton', {
      name: /Y/i,
    })
    const nameInput = screen.getByRole('textbox', { name: /Name/i })

    fireEvent.change(xCoordinateInput, { target: { value: '10' } })
    fireEvent.change(yCoordinateInput, { target: { value: '' } })
    fireEvent.change(nameInput, { target: { value: 'test' } })

    // wait for debounce
    await new Promise((r) => setTimeout(r, 600))

    expect(filterCoffeeShopsMock).toHaveBeenCalledWith({
      name: 'test',
    })
  })

  it('should filter coffee shops when name is provided', async () => {
    render(<CoffeeShopsFilters />)

    const nameInput = screen.getByRole('textbox', { name: /Name/i })

    fireEvent.change(nameInput, { target: { value: 'Starbucks' } })

    // wait for debounce
    await new Promise((r) => setTimeout(r, 600))

    expect(filterCoffeeShopsMock).toHaveBeenCalledWith({
      name: 'Starbucks',
    })
  })

  it('should filter coffee shops with no params when name is empty, and no coordinates provided', async () => {
    render(<CoffeeShopsFilters />)

    const nameInput = screen.getByRole('textbox', { name: /Name/i })

    fireEvent.change(nameInput, { target: { value: 'test' } })
    fireEvent.change(nameInput, { target: { value: '' } })

    // wait for debounce
    await new Promise((r) => setTimeout(r, 600))

    expect(filterCoffeeShopsMock).toHaveBeenCalledWith({})
  })

  it('should only filter coffee shops once if multiple changes are made within the debounce time', async () => {
    render(<CoffeeShopsFilters />)

    const xCoordinateInput = screen.getByRole('spinbutton', {
      name: /X/i,
    })
    const yCoordinateInput = screen.getByRole('spinbutton', {
      name: /Y/i,
    })
    const nameInput = screen.getByRole('textbox', { name: /Name/i })

    fireEvent.change(xCoordinateInput, { target: { value: '10' } })
    fireEvent.change(yCoordinateInput, { target: { value: '' } })
    fireEvent.change(nameInput, { target: { value: 'Starbucks' } })

    // wait for debounce
    await new Promise((r) => setTimeout(r, 600))

    expect(filterCoffeeShopsMock).toHaveBeenCalledTimes(1)
  })

  it('should filter multiple times if changes are made outside the debounce time', async () => {
    render(<CoffeeShopsFilters />)

    const xCoordinateInput = screen.getByRole('spinbutton', {
      name: /X/i,
    })
    const yCoordinateInput = screen.getByRole('spinbutton', {
      name: /Y/i,
    })

    fireEvent.change(xCoordinateInput, { target: { value: '10' } })

    // wait for debounce
    await new Promise((r) => setTimeout(r, 600))

    fireEvent.change(yCoordinateInput, { target: { value: '20' } })

    // wait for debounce
    await new Promise((r) => setTimeout(r, 600))

    expect(filterCoffeeShopsMock).toHaveBeenCalledTimes(2)
  })
})
