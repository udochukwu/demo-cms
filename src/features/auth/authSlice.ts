import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { AuthState } from './types'
import { removeCookie } from 'utils/universalCookie'

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
    },
    logout: (state) => {
      state.isAuthenticated = false
      removeCookie('jwt')
    }
  }
})

export const { login, logout } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user
export default authSlice.reducer
