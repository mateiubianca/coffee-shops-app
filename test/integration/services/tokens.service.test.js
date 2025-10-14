import { getTokenService, refreshTokenService } from '#services/tokens.service'

describe('Tokens Integration', () => {
  it('should return a token', async () => {
    const token = await getTokenService()

    expect(token).toBeDefined()
  })

  it('should refresh and return a token', async () => {
    const token = await refreshTokenService()

    expect(token).toBeDefined()
  })
})
