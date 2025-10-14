import { getCoffeeShopsRepository } from '#repositories/coffee-shops.repository'
import { getTokenService, refreshTokenService } from '#services/tokens.service'

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
