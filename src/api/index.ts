import axios from 'axios'
import { getCookie } from 'utils/universalCookie'

const serviceUrlMap = {
  auth: import.meta.env.VITE_AUTH_SERVICE_API_URL,
  product: import.meta.env.VITE_PRODUCT_SERVICE_API_URL
}
export const api = (service: 'auth' | 'product') =>
  axios.create({
    baseURL: serviceUrlMap[service],
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('jwt')}`
    }
  })
