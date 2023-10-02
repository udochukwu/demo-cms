import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from 'api'
import { delay } from 'helpers/delay'
import { apiErrorHandler } from 'helpers/errorHandler'

export const PRODUCTS_BASE_URL = 'products'

export const createProductApi = async (payload: Partial<ProductFormData>) => {
  try {
    const response = await api('product').post(PRODUCTS_BASE_URL, {
      ...payload,
      discountPrice: '50',
      userId: 'ed2a1fbe-c234-41fa-ba1e-3708c6ad34c7',
      stocks: '10',
      variants: {
        color: 'Red',
        size: 'Medium'
      },
      weight: '23',
      length: '11',
      width: '11',
      height: '11',
      startDate: '10/10/2023',
      endDate: '10/10/2023'
    })
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getProductsApi = async () => {
  try {
    await delay(1000)
    const response = await api('product').get(PRODUCTS_BASE_URL)
    return response.data?.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getProductApi = async (productId?: string | null) => {
  try {
    await delay(1000)

    if (productId) {
      const response = await api('product').get(
        `${PRODUCTS_BASE_URL}/${productId}`
      )
      return response.data?.data
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const updateProductApi = async (
  payload: Partial<ProductFormData> & { productId: string }
) => {
  try {
    const { productId, ...rest } = payload
    const response = await api('product').put(
      `${PRODUCTS_BASE_URL}/${productId}`,
      {
        updatedData: {
          ...rest,
          discountPrice: '50',
          userId: 'ed2a1fbe-c234-41fa-ba1e-3708c6ad34c7',
          stocks: '10',
          variants: {
            color: 'Red',
            size: 'Medium'
          },
          weight: '23',
          length: '11',
          width: '11',
          height: '11',
          startDate: '10/10/2023',
          endDate: '10/10/2023'
        }
      }
    )
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const deleteProductApi = async (productId?: string) => {
  try {
    if (productId) {
      const response = await api('product').delete(
        `${PRODUCTS_BASE_URL}/${productId}`
      )
      return response
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}

// react query hooks
export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProductApi,
    cacheTime: 0
  })
}

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: [PRODUCTS_BASE_URL],
    queryFn: getProductsApi
  })
}

export const useProduct = (productId?: string | null) => {
  return useQuery<Product>({
    queryKey: [PRODUCTS_BASE_URL, productId],
    queryFn: () => getProductApi(productId),
    enabled: !!productId
  })
}

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProductApi,
    cacheTime: 0
  })
}

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProductApi,
    cacheTime: 0
  })
}
