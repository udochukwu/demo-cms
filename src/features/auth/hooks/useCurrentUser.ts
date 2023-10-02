import { useAppSelector } from 'app/hooks/useAppSelector'
import { selectUser } from '../authSlice'

const useCurrentUser = () => {
  const user = useAppSelector(selectUser)

  return { user }
}

export default useCurrentUser
