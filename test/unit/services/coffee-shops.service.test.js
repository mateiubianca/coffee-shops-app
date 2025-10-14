import { getCoffeeShopsRepository } from '#repositories/coffee-shops.repository'
import { getTokenService, refreshTokenService } from '#services/tokens.service'

import {
  getCoffeeShopsService,
  getClosestCoffeeShopsWithDistance,
} from '#services/coffee-shops.service'
import {
  getManhattanDistance,
  getEuclideanDistance,
} from '#utils/distance.utils'

jest.mock('#repositories/coffee-shops.repository')
jest.mock('#services/tokens.service')
jest.mock('#utils/distance.utils')

describe('Coffee Shop Service', () => {
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
    {
      id: 2,
      created_at: '2025-02-12T15:41:16.023Z',
      updated_at: '2025-02-12T15:41:16.023Z',
      name: 'Blue Bottle SF',
      x: '37.521',
      y: '-122.334',
    },
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getCoffeeShopsService', () => {
    it('should get the coffee shops', async () => {
      getCoffeeShopsRepository.mockResolvedValue([...mockData])
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
        .mockResolvedValue([...mockData])
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

  describe('getClosestCoffeeShopsWithDistance', () => {
    it('should return the closest coffee shops with their distance', async () => {
      const mockDistance = '10.0000'
      getCoffeeShopsRepository.mockResolvedValue([...mockData])
      getTokenService.mockResolvedValue(token)

      // this will make sure the mockData array is sorted: [mockData[1], mockData[0]]
      getManhattanDistance.mockReturnValueOnce(1)
      getManhattanDistance.mockReturnValueOnce(2)

      getEuclideanDistance.mockReturnValueOnce(mockDistance)

      const position = { x: 47.6, y: -122.4 }

      const result = await getClosestCoffeeShopsWithDistance({
        position,
        limit: 1,
      })

      expect(result).toEqual([{ ...mockData[1], distance: mockDistance }])
    })

    it('should return an empty array if an error is thrown', async () => {
      const error = { status: 503 }

      getCoffeeShopsRepository.mockRejectedValue(error)
      getTokenService.mockResolvedValue(token)

      const position = { x: 47.6, y: -122.4 }

      const result = await getClosestCoffeeShopsWithDistance({
        position,
        limit: 1,
      })

      expect(result).toEqual([])
    })
  })
})
