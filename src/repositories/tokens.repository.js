import config from '@app/config/api.config'
import { httpRequest } from '@app/utils/http.utils'

export const getTokenRepository = async () => {
  return httpRequest(`${config.API_URL}/v1/tokens`, {
    method: 'POST',
  })
}
