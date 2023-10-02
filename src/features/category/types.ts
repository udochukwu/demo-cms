type Category = {
  id: string
  name: string
  description?: string
  productCount: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

type CategoryFormData = {
  name: string
  description?: string
  isActive: boolean
}
