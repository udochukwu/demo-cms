import { useQuery } from '@tanstack/react-query'
import { api } from 'api'

export const USERS_BASE_URL = 'users'

export const getUserApi = async (id: string) => {
  try {
    const response = await api('auth').get(`${USERS_BASE_URL}/${id}`)
    return response.data?.data
  } catch (e) {
    return e
  }
}

