import { MAX_REQUEST_RETRIES } from '#constants/index'

export class HttpError extends Error {
  status

  constructor(message, status) {
    super(message)
    this.status = status
  }
}

export const httpRequest = async (
  url,
  options = {},
  retries = MAX_REQUEST_RETRIES
) => {
  let attempts = 0
  let lastError

  while (attempts < retries) {
    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        const text = await response.text()
        throw new HttpError(text, response.status)
      }

      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        return await response.json()
      }

      return await response.text()
    } catch (err) {
      lastError = err

      if (err.status && err.status >= 500 && err.status < 600) {
        attempts += 1
        console.warn(`Retrying fetch for ${url}... (${attempts}/${retries})`)
      } else {
        break
      }
    }
  }

  throw lastError
}
