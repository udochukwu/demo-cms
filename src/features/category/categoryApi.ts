import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from 'api'
import { delay } from 'helpers/delay'
import { apiErrorHandler } from 'helpers/errorHandler'
import { useMemo } from 'react'

export const CATEGORY_BASE_URL = 'category'

export const createCategoryApi = async (payload: Partial<CategoryFormData>) => {
  try {
    const response = await api('product').post(CATEGORY_BASE_URL, {
      ...payload
    })
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getCategorysApi = async () => {
  try {
    await delay(1000)
    const response = await api('product').get(CATEGORY_BASE_URL)
    return response.data?.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getCategoryApi = async (categoryId?: string | null) => {
  try {
    await delay(1000)

    if (categoryId) {
      const response = await api('product').get(
        `${CATEGORY_BASE_URL}/${categoryId}`
      )
      return response.data?.data
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const updateCategoryApi = async (
  payload: Partial<CategoryFormData> & { categoryId: string }
) => {
  try {
    const { categoryId, ...rest } = payload
    const response = await api('product').put(
      `${CATEGORY_BASE_URL}/${categoryId}`,
      {
        updatedData: {
          ...rest
        }
      }
    )
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const deleteCategoryApi = async (categoryId?: string) => {
  try {
    if (categoryId) {
      const response = await api('product').delete(
        `${CATEGORY_BASE_URL}/${categoryId}`
      )
      return response
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}

// react query hooks
export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategoryApi,
    cacheTime: 0
  })
}

export const useCategorys = () => {
  return useQuery<Category[]>({
    queryKey: [CATEGORY_BASE_URL],
    queryFn: getCategorysApi
  })
}

export const useCategory = (categoryId?: string | null) => {
  return useQuery<Category>({
    queryKey: [CATEGORY_BASE_URL, categoryId],
    queryFn: () => getCategoryApi(categoryId),
    enabled: !!categoryId
  })
}

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: updateCategoryApi,
    cacheTime: 0
  })
}

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategoryApi,
    cacheTime: 0
  })
}

export const useCategorysAsOptions = () => {
  const { data, isLoading } = useCategorys()
  const options = useMemo(
    () =>
      data?.map((category) => ({ label: category.name, value: category.id })),
    [data]
  )
  return { options, isLoading }
}
