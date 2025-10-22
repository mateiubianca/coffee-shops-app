import { useCoffeeShops } from '@app/coffee-shops/contexts/coffee-shops.context'
import { CoffeeShopsList } from '@app/coffee-shops/components/coffee-shops-list'
import { render, screen } from '@testing-library/react'

jest.mock('@app/coffee-shops/contexts/coffee-shops.context')

describe('Coffee Shops list', () => {
  let initializeCoffeeShopsMock
  const coffeeShops = [
    { id: 1, name: 'Shop 1', x: 10, y: 20, distance: 5 },
    { id: 2, name: 'Shop 2', x: 15, y: 25, distance: 10 },
    { id: 3, name: 'Shop 3', x: 20, y: 30, distance: 15 },
    { id: 4, name: 'Shop 4', x: 25, y: 35, distance: 20 },
  ]

  beforeEach(() => {
    initializeCoffeeShopsMock = jest.fn()

    useCoffeeShops.mockReturnValue({
      initializeCoffeeShops: initializeCoffeeShopsMock,
      coffeeShops,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render no coffee shops available when there are no coffee shops', async () => {
    useCoffeeShops.mockReturnValueOnce({
      initializeCoffeeShops: initializeCoffeeShopsMock,
      coffeeShops: [],
    })

    render(<CoffeeShopsList result={[]} />)

    expect(screen.getByText('No coffee shops available.')).toBeInTheDocument()
  })

  it('should render coffee shops list correctly', async () => {
    render(<CoffeeShopsList result={coffeeShops} />)

    expect(initializeCoffeeShopsMock).toHaveBeenCalledWith(coffeeShops)
    expect(initializeCoffeeShopsMock).toHaveBeenCalledTimes(1)

    const coffeeShopElements = screen.getAllByRole('heading', { level: 2 })
    expect(coffeeShopElements).toHaveLength(4)
  })

  it('should highlight the first three coffee shops based on distance', async () => {
    render(<CoffeeShopsList result={coffeeShops} />)

    const shopsHeadings = screen.getAllByRole('heading', { level: 2 })

    shopsHeadings.forEach((shop) =>
      expect(shop.parentElement).toHaveClass('[&:nth-child(-n+3)]:text-chart-4')
    )
  })

  it('should not highlight any coffee shops if distances are not provided', async () => {
    const shopsWithoutDistance = coffeeShops.map(
      ({ distance, ...shop }) => shop
    )

    useCoffeeShops.mockReturnValueOnce({
      initializeCoffeeShops: initializeCoffeeShopsMock,
      coffeeShops: shopsWithoutDistance,
    })

    render(<CoffeeShopsList result={shopsWithoutDistance} />)

    const allShops = screen.getAllByRole('heading', { level: 2 })
    allShops.forEach((shop) => {
      expect(shop.parentElement).not.toHaveClass(
        '[&:nth-child(-n+3)]:text-chart-4'
      )
    })
  })
})
