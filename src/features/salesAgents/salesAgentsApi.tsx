import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from 'api'
import { apiErrorHandler } from 'helpers/errorHandler'
import {SalesAgent,SalesAgentFormData} from './types'

export const SALES_AGENTS_BASE_URL = 'sales-agents'

export const createSalesAgentApi = async (payload: Partial<SalesAgentFormData>) => {
  try {
    const response = await api('auth').post(SALES_AGENTS_BASE_URL, {
      ...payload,
      roleIds: [],
      password: '12345678'
    })
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getSalesAgentsApi = async () => {
  try {
    const response = await api('auth').get(SALES_AGENTS_BASE_URL)
    return response.data?.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getSalesAgentApi = async (salesAgentId?: string | null) => {
  try {
    if (salesAgentId) {
      const response = await api('auth').get(`${SALES_AGENTS_BASE_URL}/${salesAgentId}`)
      return response.data?.data
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}


export const updateSalesAgentApi = async (
  payload: Partial<SalesAgentFormData> & { userId: string }
) => {
  try {
    const { userId, ...rest } = payload
    const response = await api('auth').put(`${SALES_AGENTS_BASE_URL}/${userId}`, {
      ...rest
    })
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const useSalesAgents = () => {
  return useQuery<SalesAgent[]>({
    queryKey: [SALES_AGENTS_BASE_URL],
    queryFn: getSalesAgentsApi
  })
}

export const useSalesAgent = (salesAgentId?: string | null) => {
  return useQuery<SalesAgent>({
    queryKey: [SALES_AGENTS_BASE_URL, salesAgentId],
    queryFn: () => getSalesAgentApi(salesAgentId),
    enabled: !!salesAgentId
  })
}

export const deleteAgentApi = async (userId?: string) => {
  try {
    if (userId) {
      const response = await api('auth').delete(`${SALES_AGENTS_BASE_URL}/${userId}`)
      return response
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}
// react query hooks
export const useCreateSalesAgent = () => {
  return useMutation({
    mutationFn: createSalesAgentApi,
    cacheTime: 0
  })
}

export const useUpdateSalesAgent = () => {
  return useMutation({
    mutationFn: updateSalesAgentApi,
    cacheTime: 0
  })
}

export const useDeleteAgent = () => {
  return useMutation({
    mutationFn: deleteAgentApi,
    cacheTime: 0
  })
}
