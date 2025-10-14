import { getCoffeeShopsService } from '#services/coffee-shops.service'

describe('Coffee Shops Integration', () => {
  it('should return a list of coffee shops', async () => {
    const coffeeShops = await getCoffeeShopsService()

    expect(Array.isArray(coffeeShops)).toBe(true)
    expect(coffeeShops.length).toBeGreaterThan(0)
    expect(coffeeShops[0]).toHaveProperty('id')
    expect(coffeeShops[0]).toHaveProperty('name')
    expect(coffeeShops[0]).toHaveProperty('x')
    expect(coffeeShops[0]).toHaveProperty('y')
  })
})
