type Brand = {
  id: string
  name: string
  productCount: number
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
type BrandFormData = {
  name: string
  description?: string
  isActive: boolean
}
