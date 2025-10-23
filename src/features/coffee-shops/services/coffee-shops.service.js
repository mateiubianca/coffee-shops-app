import { getCoffeeShopsRepository } from '@app/coffee-shops/repositories/coffee-shops.repository'
import {
  getTokenService,
  refreshTokenService,
} from '@app/coffee-shops/services/tokens.service'
import { getSquaredEuclideanDistance } from '@app/coffee-shops/utils/distance.utils'

const sortCoffeeShopsByDistance = (position, coffeeShops) => {
  const coffeeShopsWithSquaredDistance = coffeeShops.map((coffeeShop) => ({
    ...coffeeShop,
    distance: Math.sqrt(
      getSquaredEuclideanDistance(position, coffeeShop)
    ).toFixed(4),
  }))

  // We use the squaredDistance for sorting, since it is slower to calculate the square root
  return coffeeShopsWithSquaredDistance.sort(
    (coffeeShopA, coffeeShopB) => coffeeShopA.distance - coffeeShopB.distance
  )
}

const filterCoffeeShopsByName = (name, coffeeShops) => {
  return coffeeShops.filter((shop) =>
    shop.name.toLowerCase().includes(name.toLowerCase())
  )
}

export const getCoffeeShopsService = async ({
  noResults,
  errorCase,
  x,
  y,
  name,
}) => {
  if (noResults) {
    return []
  }

  if (errorCase) {
    throw { status: 401, message: 'Unauthorized' }
  }

  let coffeeShops

  try {
    const token = await getTokenService()

    coffeeShops = await getCoffeeShopsRepository(token)
  } catch (e) {
    if (e.status === 401) {
      // if unauthorized error, refresh the token and retry the operation
      const newToken = await refreshTokenService()
      coffeeShops = getCoffeeShopsRepository(newToken)
    }

    throw e
  }

  let filteredShops = coffeeShops

  if (name) {
    filteredShops = filterCoffeeShopsByName(name, filteredShops)
  }

  if (x && y) {
    filteredShops = sortCoffeeShopsByDistance({ x, y }, filteredShops)
  }

  return filteredShops
}

export const getClosestCoffeeShopsWithDistance = async ({
  position,
  limit = 3,
}) => {
  try {
    const coffeeShops = await getCoffeeShopsService()

    // First augment the coffee shops with the squared euclidean distance
    const coffeeShopsWithSquaredDistance = coffeeShops.map((coffeeShop) => ({
      ...coffeeShop,
      squaredDistance: getSquaredEuclideanDistance(position, coffeeShop),
    }))

    // We use the squaredDistance for sorting, since it is slower to calculate the square root
    const orderedCoffeeShops = coffeeShopsWithSquaredDistance.sort(
      (coffeeShopA, coffeeShopB) =>
        coffeeShopA.squaredDistance - coffeeShopB.squaredDistance
    )

    // only get the first {limit} coffee shops, and calculate the distance for them
    return orderedCoffeeShops
      .slice(0, limit)
      .map(({ squaredDistance, ...coffeeShop }) => ({
        ...coffeeShop,
        distance: Math.sqrt(squaredDistance).toFixed(4),
      }))
  } catch (e) {
    return []
  }
}
