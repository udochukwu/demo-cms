export type SalesAgent = {
  id: string
  email: string
  username?: string
  firstname?: string
  lastname?: string
  middlename?: string
  position?: string
  mobileNumber?: string
  name?: string
  group?: string
  date?: string
  time?: string
  createdAt: string
  status?: string
}

export type SalesAgentFormData = {
  email: string
  firstname: string
  lastname: string
  middlename?: string
  position?: string
  username?: string
  mobileNumber?: string
}
