import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from 'api'
import { delay } from 'helpers/delay'
import { apiErrorHandler } from 'helpers/errorHandler'
import { useMemo } from 'react'

export const BRANDS_BASE_URL = 'brand'

export const createBrandApi = async (payload: Partial<BrandFormData>) => {
  try {
    const response = await api('product').post(BRANDS_BASE_URL, {
      ...payload
    })
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getBrandsApi = async () => {
  try {
    await delay(1000)
    const response = await api('product').get(BRANDS_BASE_URL)
    return response.data?.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getBrandApi = async (brandId?: string | null) => {
  try {
    await delay(1000)

    if (brandId) {
      const response = await api('product').get(`${BRANDS_BASE_URL}/${brandId}`)
      return response.data?.data
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const updateBrandApi = async (
  payload: Partial<BrandFormData> & { brandId: string }
) => {
  try {
    const { brandId, ...rest } = payload
    const response = await api('product').put(`${BRANDS_BASE_URL}/${brandId}`, {
      updatedData: {
        ...rest
      }
    })
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const deleteBrandApi = async (brandId?: string) => {
  try {
    if (brandId) {
      const response = await api('product').delete(
        `${BRANDS_BASE_URL}/${brandId}`
      )
      return response
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}

// react query hooks
export const useCreateBrand = () => {
  return useMutation({
    mutationFn: createBrandApi,
    cacheTime: 0
  })
}

export const useBrands = () => {
  return useQuery<Brand[]>({
    queryKey: [BRANDS_BASE_URL],
    queryFn: getBrandsApi
  })
}

export const useBrand = (brandId?: string | null) => {
  return useQuery<Brand>({
    queryKey: [BRANDS_BASE_URL, brandId],
    queryFn: () => getBrandApi(brandId),
    enabled: !!brandId
  })
}

export const useUpdateBrand = () => {
  return useMutation({
    mutationFn: updateBrandApi,
    cacheTime: 0
  })
}

export const useDeleteBrand = () => {
  return useMutation({
    mutationFn: deleteBrandApi,
    cacheTime: 0
  })
}
export const useBrandsAsOptions = () => {
  const { data, isLoading } = useBrands()
  const options = useMemo(
    () => data?.map((brand) => ({ label: brand.name, value: brand.id })),
    [data]
  )
  return { options, isLoading }
}
