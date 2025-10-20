import config from '@app/config/api.config'
import { httpRequest } from '@app/utils/http.utils'
import { getCoffeeShopsRepository } from '@app/repositories/coffee-shops.repository'

jest.mock('@app/utils/http.utils')

describe('Coffee Shop Repository', () => {
  describe('getCoffeeShopsRepository', () => {
    const token = 'test-token'

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should call httpRequest with the correct url', async () => {
      httpRequest.mockResolvedValue([])

      await getCoffeeShopsRepository(token)

      expect(httpRequest).toHaveBeenCalledTimes(1)
      expect(httpRequest).toHaveBeenCalledWith(
        `${config.API_URL}/v1/coffee_shops?token=${token}`
      )
    })
  })
})
