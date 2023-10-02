export const apiErrorHandler = (error: any, errorMessage?: string) => {
  if (error?.response?.status === 400 && error?.response?.data?.message) {
    throw new Error(error?.response?.data?.message) // You can provide a more specific error message if needed
  }
  throw new Error(
    errorMessage || error?.response?.data?.message || 'Server error'
  )
}
