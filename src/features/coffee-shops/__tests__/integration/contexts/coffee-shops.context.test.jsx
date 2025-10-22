import {
  CoffeeShopsProvider,
  useCoffeeShops,
} from '@app/coffee-shops/contexts/coffee-shops.context'
import { renderHook, act } from '@testing-library/react'

describe('Coffee Shops Context Integration', () => {
  const coffeeShops = [
    { id: 1, name: 'Shop 1 test', x: 10, y: 20 },
    { id: 2, name: 'Shop 2 test', x: 15, y: 25 },
    { id: 3, name: 'Shop 3 test', x: 20, y: 30 },
    { id: 4, name: 'Shop 4', x: 25, y: 35 },
  ]

  it('should initialize coffee shops correctly', async () => {
    const wrapper = ({ children }) => (
      <CoffeeShopsProvider>{children}</CoffeeShopsProvider>
    )
    const { result } = renderHook(() => useCoffeeShops(), { wrapper })

    act(() => {
      result.current.initializeCoffeeShops(coffeeShops)
    })

    expect(result.current.coffeeShops).toHaveLength(coffeeShops.length)
  })

  it('should filter coffee shops by name correctly', async () => {
    const wrapper = ({ children }) => (
      <CoffeeShopsProvider>{children}</CoffeeShopsProvider>
    )
    const { result } = renderHook(() => useCoffeeShops(), { wrapper })

    act(() => {
      result.current.initializeCoffeeShops(coffeeShops)
    })

    act(() => {
      result.current.filterCoffeeShops({ name: 'Shop 2' })
    })

    expect(result.current.coffeeShops).toHaveLength(1)
    expect(result.current.coffeeShops[0].name).toBe('Shop 2 test')
  })

  it('should sort coffee shops by distance correctly', async () => {
    const wrapper = ({ children }) => (
      <CoffeeShopsProvider>{children}</CoffeeShopsProvider>
    )
    const { result } = renderHook(() => useCoffeeShops(), { wrapper })

    act(() => {
      result.current.initializeCoffeeShops(coffeeShops)
    })

    const position = { x: 15, y: 25 }

    act(() => {
      result.current.filterCoffeeShops({ position })
    })

    result.current.coffeeShops.forEach((shop) => {
      expect(shop.distance).toBeDefined()
    })

    expect(result.current.coffeeShops[0].name).toBe('Shop 2 test')
    expect(result.current.coffeeShops[1].name).toBe('Shop 1 test')
    expect(result.current.coffeeShops[2].name).toBe('Shop 3 test')
    expect(result.current.coffeeShops[3].name).toBe('Shop 4')
  })

  it('should filter and sort coffee shops correctly', async () => {
    const wrapper = ({ children }) => (
      <CoffeeShopsProvider>{children}</CoffeeShopsProvider>
    )
    const { result } = renderHook(() => useCoffeeShops(), { wrapper })

    act(() => {
      result.current.initializeCoffeeShops(coffeeShops)
    })

    const position = { x: 15, y: 25 }

    act(() => {
      result.current.filterCoffeeShops({ name: 'test', position })
    })

    expect(result.current.coffeeShops).toHaveLength(3)
    expect(result.current.coffeeShops[0].name).toBe('Shop 2 test')
    expect(result.current.coffeeShops[1].name).toBe('Shop 1 test')
    expect(result.current.coffeeShops[2].name).toBe('Shop 3 test')
  })

  it('should reset coffee shops to initial state after filtering', async () => {
    const wrapper = ({ children }) => (
      <CoffeeShopsProvider>{children}</CoffeeShopsProvider>
    )
    const { result } = renderHook(() => useCoffeeShops(), { wrapper })

    act(() => {
      result.current.initializeCoffeeShops(coffeeShops)
    })

    act(() => {
      result.current.filterCoffeeShops({ name: 'Shop 1' })
    })

    expect(result.current.coffeeShops).toHaveLength(1)

    act(() => {
      result.current.filterCoffeeShops({})
    })

    expect(result.current.coffeeShops).toHaveLength(coffeeShops.length)
  })
})
