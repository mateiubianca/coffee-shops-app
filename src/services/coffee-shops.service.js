import { getCoffeeShopsRepository } from '#repositories/coffee-shops.repository'
import { getTokenService, refreshTokenService } from '#services/tokens.service'
import {
  getManhattanDistance,
  getEuclideanDistance,
} from '#utils/distance.utils'

export const getCoffeeShopsService = async () => {
  try {
    const token = await getTokenService()

    return await getCoffeeShopsRepository(token)
  } catch (e) {
    if (e.status === 401) {
      const newToken = await refreshTokenService()
      return getCoffeeShopsRepository(newToken)
    }

    throw e
  }
}

export const getClosestCoffeeShopsWithDistance = async ({
  position,
  limit = 3,
}) => {
  const coffeeShops = await getCoffeeShopsService()

  // First sort the coffee shops based on their Manhattan distance
  // there is no need to calculate the actual distance at this point. The Manhattan distance is enough to give us an idea of which coffee shops are closer than others
  const orderedCoffeeShops = coffeeShops.sort(
    (coffeeShopA, coffeeShopB) =>
      getManhattanDistance(position, coffeeShopA) -
      getManhattanDistance(position, coffeeShopB)
  )

  // only get the first {limit} coffee shops, and calculate the distance for them
  return orderedCoffeeShops.slice(0, limit).map((coffeeShop) => ({
    ...coffeeShop,
    distance: getEuclideanDistance(position, coffeeShop),
  }))
}
