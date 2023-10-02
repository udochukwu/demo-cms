import { useMutation } from '@tanstack/react-query'
import { api } from 'api'
import { apiErrorHandler } from 'helpers/errorHandler'

export const changePasswordApi = async (payload: {
  currentPassword: string
  newPassword: string
  userId: string
}) => {
  const { userId, ...rest } = payload
  try {
    const response = await api('auth').put(`/users/${userId}/password`, rest)
    return response.data
  } catch (error: any) {
    apiErrorHandler(error)
  }
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordApi,
    cacheTime: 0
  })
}
