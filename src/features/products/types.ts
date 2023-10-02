type Product = {
  id: string
  name: string
  image: string
  brandId: string
  categoryId: string
  price: string
  discountPrice: string
  userId: string
  description: string
  stocks: string
  category: Category
  brand: Category
  startDate?: string
  endDate?: string
  variants?: Record<string, any>;
  productCode?: string
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProductFormData = {
  name: string
  image: string
  brandId: string
  categoryId: string
  price: string
  discountPrice: string
  userId: string
  description: string
  stocks: string
  variants: { [key: string]: number | string }
  weight: string
  length: string
  width: string
  height: string
  startDate: string
  endDate: string
  isActive?: boolean;
}
