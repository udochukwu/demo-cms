import { useAppDispatch } from 'app/hooks/useAppDispath'
import { useAppSelector } from 'app/hooks/useAppSelector'
import { ReactNode, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getCookie } from 'utils/universalCookie'
import { login, logout, selectIsAuthenticated } from './authSlice'
import jwt_decode, { JwtPayload } from 'jwt-decode'
type AuthCheckProps = {
  children: ReactNode
}
const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useEffect(() => {
    const jwt = getCookie('jwt')

    if (jwt) {
      try {
        const decodedToken: JwtPayload = jwt_decode(jwt)
        const currentTime: number = Date.now() / 1000 // Convert current time to seconds
        // Compare the token's expiration time with the current time
        if (decodedToken?.exp && decodedToken.exp < currentTime) {
          dispatch(logout())
        }
        dispatch(login(decodedToken))
        if (location.pathname === '/login') {
          navigate('/')
        }
      } catch (e) {
        dispatch(logout())
      }
    } else {
      dispatch(logout())
      navigate('/login')
    }
  }, [location.pathname, dispatch, navigate])

  if (location.pathname !== '/login' && !isAuthenticated) {
    return null
  }
  return children
}

export default AuthCheck
