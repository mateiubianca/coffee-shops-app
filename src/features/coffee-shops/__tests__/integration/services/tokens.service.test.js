import {
  getTokenService,
  refreshTokenService,
} from '@app/coffee-shops/services/tokens.service'

describe('Tokens Integration', () => {
  describe('getTokenService', () => {
    it('should return a token', async () => {
      const token = await getTokenService()

      expect(token).toBeDefined()
    })
  })

  describe('refreshTokenService', () => {
    it('should refresh and return a token', async () => {
      const token = await refreshTokenService()

      expect(token).toBeDefined()
    })
  })
})
