import { getCoffeeShopsRepository } from '#repositories/coffee-shops.repository'
import { getTokenService, refreshTokenService } from '#services/tokens.service'

import { getCoffeeShopsService } from '#services/coffee-shops.service'

jest.mock('#repositories/coffee-shops.repository')
jest.mock('#services/tokens.service')

describe('Coffee Shop Service', () => {
  describe('getCoffeeShopsService', () => {
    const token = 'test-token'
    const mockData = [
      {
        id: 1,
        created_at: '2025-02-12T15:41:16.016Z',
        updated_at: '2025-02-12T15:41:16.016Z',
        name: 'Blue Bottle Seattle',
        x: '47.581',
        y: '-122.316',
      },
    ]

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should get the coffee shops', async () => {
      getCoffeeShopsRepository.mockResolvedValue(mockData)
      getTokenService.mockResolvedValue(token)

      await getCoffeeShopsService()

      expect(getTokenService).toHaveBeenCalledTimes(1)
      expect(refreshTokenService).not.toHaveBeenCalled()

      expect(getCoffeeShopsRepository).toHaveBeenCalledTimes(1)
      expect(getCoffeeShopsRepository).toHaveBeenCalledWith(token)
    })

    it('should refresh the token if error with status 401 triggered, and retry to get the coffee shops', async () => {
      const newToken = 'new-token'

      getCoffeeShopsRepository
        .mockRejectedValueOnce({
          status: 401,
        })
        .mockResolvedValue(mockData)
      getTokenService.mockResolvedValue(token)
      refreshTokenService.mockResolvedValue(newToken)

      await getCoffeeShopsService()

      expect(getTokenService).toHaveBeenCalledTimes(1)
      expect(refreshTokenService).toHaveBeenCalledTimes(1)

      expect(getCoffeeShopsRepository).toHaveBeenCalledTimes(2)
      expect(getCoffeeShopsRepository).toHaveBeenNthCalledWith(1, token)
      expect(getCoffeeShopsRepository).toHaveBeenNthCalledWith(2, newToken)
    })

    it('should throw the error if error with status different than 401 triggered', async () => {
      const error = { status: 503 }

      getCoffeeShopsRepository.mockRejectedValue(error)
      getTokenService.mockResolvedValue(token)

      const promiseRespose = getCoffeeShopsService()

      await expect(promiseRespose).rejects.toEqual(error)
    })
  })
})
