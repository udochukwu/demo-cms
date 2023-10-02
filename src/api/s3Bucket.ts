import { useMutation } from '@tanstack/react-query'
import { api } from 'api'
import { apiErrorHandler } from 'helpers/errorHandler'

export const uploadToS3 = async ({
  presignedUrl,
  file
}: {
  presignedUrl: string
  file: File
}) => {
  fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type
    }
  })
    .then((response) => {
      if (response.ok) {
        return { success: true }
      } else {
        apiErrorHandler({}, 'Could Not Upload Image')
      }
    })
    .catch((error) => {
      apiErrorHandler(error)
    })
}

export const generateSignedUrl = async (payload: {
  service: string
  uploadType: 'Image'
  category: string
  imageName: string
}) => {
  try {
    const response = await api('product').post(
      '/products/presigned-url',
      payload
    )
    return response.data
  } catch (error) {
    apiErrorHandler(error)
  }
}

// react query hooks
export const useGenerateSignedUrl = () => {
  return useMutation({
    mutationFn: generateSignedUrl,
    cacheTime: 0
  })
}

// react query hooks
export const useUploadToS3 = () => {
  return useMutation({
    mutationFn: uploadToS3,
    cacheTime: 0
  })
}
