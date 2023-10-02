import { useMutation } from '@tanstack/react-query'
import { api } from 'api'
import { useAppDispatch } from 'app/hooks/useAppDispath'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { setCookie } from 'utils/universalCookie'
import { login } from './authSlice'
import { apiErrorHandler } from 'helpers/errorHandler'
export const loginApi = async (payload: {
  email: string
  password: string
}) => {
  try {
    const response = await api('auth').post('/auth/login', payload)
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: loginApi,
    cacheTime: 0,
    onSuccess(data, variables, context) {
      if (data.success && data.token) {
        setCookie('jwt', data.token)
        const decodedToken: any = jwt_decode(data.token)
        dispatch(login(decodedToken))
        navigate('/')
      }
    }
  })
}
