import { getCoffeeShopsService } from '#services/coffee-shops.service'

/**
 * @param {Object} position
 * @param {Number} position.x
 * @param {Number} position.y
 *
 * @returns {Array<position>}
 */
export async function getNearestShops(position) {
  // code
  await getCoffeeShopsService()

  return []
}
