import config from '@app/config/api.config'
import { httpRequest } from '@app/utils/http.utils'
import { getTokenRepository } from '@app/coffee-shops/repositories/tokens.repository'

jest.mock('@app/utils/http.utils')

describe('Tokens Repository', () => {
  describe('getTokenRepository', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should call httpRequest with the correct url', async () => {
      httpRequest.mockResolvedValue({})

      await getTokenRepository()

      expect(httpRequest).toHaveBeenCalledTimes(1)
      expect(httpRequest).toHaveBeenCalledWith(`${config.API_URL}/v1/tokens`, {
        method: 'POST',
      })
    })
  })
})
