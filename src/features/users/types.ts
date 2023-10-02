type User = {
  id: string
  email: string
  username?: string
  firstname?: string
  lastname?: string
  middlename?: string
  position?: string
  mobileNumber?: string
  name?: string
  role?: Role
  group?: string
  date?: string
  time?: string
  createdAt: string
  status?: string
}


type UserFormData = {
  email: string
  firstname: string
  lastname: string
  middlename?: string
  position?: string
  username?: string
  mobileNumber?: string
  roleId?: string
}
