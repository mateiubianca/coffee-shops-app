import config from '@app/config/api.config'
import { httpRequest } from '@app/utils/http.utils'

export const getCoffeeShopsRepository = async (token) => {
  return httpRequest(`${config.API_URL}/v1/coffee_shops?token=${token}`)
}
