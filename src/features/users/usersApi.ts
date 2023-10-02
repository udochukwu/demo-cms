import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from 'api'
import { delay } from 'helpers/delay'
import { apiErrorHandler } from 'helpers/errorHandler'

export const USERS_BASE_URL = 'users'

export const createUserApi = async (payload: Partial<UserFormData>) => {
  try {
    const response = await api('auth').post(USERS_BASE_URL, {
      ...payload,
      password: '12345678'
    })
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getUsersApi = async () => {
  try {
    await delay(1000)
    const response = await api('auth').get(USERS_BASE_URL)
    return response.data?.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getUserApi = async (userId?: string | null) => {
  try {
    if (userId) {
      const response = await api('auth').get(`${USERS_BASE_URL}/${userId}`)
      return response.data?.data
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const updateUserApi = async (
  payload: Partial<UserFormData> & { userId: string }
) => {
  try {
    const { userId, ...rest } = payload
    const response = await api('auth').put(`${USERS_BASE_URL}/${userId}`, {
      ...rest
    })
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const deleteUserApi = async (userId?: string) => {
  try {
    if (userId) {
      const response = await api('auth').delete(`${USERS_BASE_URL}/${userId}`)
      return response
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}

// react query hooks
export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUserApi,
    cacheTime: 0
  })
}

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: [USERS_BASE_URL],
    queryFn: getUsersApi
  })
}

export const useUser = (userId?: string | null) => {
  return useQuery<User>({
    queryKey: [USERS_BASE_URL, userId],
    queryFn: () => getUserApi(userId),
    enabled: !!userId
  })
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUserApi,
    cacheTime: 0
  })
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUserApi,
    cacheTime: 0
  })
}
