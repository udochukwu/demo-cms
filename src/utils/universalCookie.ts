import Cookies, { CookieGetOptions, CookieSetOptions } from 'universal-cookie'

const cookieClient = new Cookies()

export const setCookie = (
  key: string,
  value: unknown,
  options?: CookieSetOptions | undefined
) => {
  if (!key) {
    return
  }

  cookieClient.set(key, value, options)
}

export const getCookie = (
  key: string,
  options?: CookieGetOptions | undefined
) => {
  return cookieClient.get(key, options)
}

export const removeCookie = (
  key: string,
  options?: CookieSetOptions | undefined
) => {
  if (!key) {
    return
  }

  cookieClient.remove(key, options)
}
