export interface User {
  id: string
  firstname: string
  lastname: string
}
export interface AuthState {
  isAuthenticated: boolean
  user: User | null
}
