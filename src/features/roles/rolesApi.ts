import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from 'api'
import { delay } from 'helpers/delay'
import { apiErrorHandler } from 'helpers/errorHandler'

export const ROLES_BASE_URL = 'roles'

export const createRoleApi = async (payload: Partial<RoleFormData>) => {
  try {
    const response = await api('auth').post(ROLES_BASE_URL, payload)
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getRolesApi = async () => {
  try {
    await delay(1000)
    const response = await api('auth').get(ROLES_BASE_URL)
    return response.data?.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const getRoleApi = async (roleId?: string | null) => {
  try {
    if (roleId) {
      const response = await api('auth').get(`${ROLES_BASE_URL}/${roleId}`)
      return response.data?.data
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const updateRoleApi = async (
  payload: Partial<RoleFormData> & { roleId: string }
) => {
  try {
    const { roleId, ...rest } = payload
    const response = await api('auth').put(`${ROLES_BASE_URL}/${roleId}`, {
      ...rest
    })
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

export const deleteRoleApi = async (roleId?: string) => {
  try {
    if (roleId) {
      const response = await api('auth').delete(`${ROLES_BASE_URL}/${roleId}`)
      return response
    }
  } catch (error) {
    apiErrorHandler(error)
  }
}

// react query hooks
export const useCreateRole = () => {
  return useMutation({
    mutationFn: createRoleApi,
    cacheTime: 0
  })
}

export const useRoles = () => {
  return useQuery<Role[]>({
    queryKey: [ROLES_BASE_URL],
    queryFn: getRolesApi
  })
}

export const useRole = (roleId?: string | null) => {
  return useQuery<Role>({
    queryKey: [ROLES_BASE_URL, roleId],
    queryFn: () => getRoleApi(roleId),
    enabled: !!roleId
  })
}

export const useUpdateRole = () => {
  return useMutation({
    mutationFn: updateRoleApi,
    cacheTime: 0
  })
}

export const useDeleteRole = () => {
  return useMutation({
    mutationFn: deleteRoleApi,
    cacheTime: 0
  })
}
