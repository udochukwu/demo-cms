export const isValidEmail = (value: string) => {
  if (!value.trim()) return
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return !regex.test(value) ? 'Invalid email address' : undefined
}

export const validatePasswordMatch = (
  confirmNewPassword: string,
  newPassword: string
) => newPassword === confirmNewPassword || 'Passwords do not match'

export const required = { value: true, message: 'This field is required' }
