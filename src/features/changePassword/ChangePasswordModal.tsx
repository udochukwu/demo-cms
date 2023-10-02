import clsx from 'clsx'
import Button from 'components/Button'
import Modal from 'components/Modal'
import PasswordField from 'components/PasswordField/PasswordField'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useChangePassword } from './changePasswordApi'
import useCurrentUser from 'features/auth/hooks/useCurrentUser'
interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}
const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose
}) => {
  type ChangePasswordFormData = {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
  }

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors, isValid }
  } = useForm<ChangePasswordFormData>({ mode: 'all' })

  const { mutate: changePasswordMutation } = useChangePassword()
  const { user } = useCurrentUser()
  const onSubmit = handleSubmit(({ currentPassword, newPassword }) => {
    changePasswordMutation(
      { currentPassword, newPassword, userId: user?.id as string },
      {
        onSuccess() {
          toast.success('Password successfully updated')
          handleClose()
        },
        onError(error: any) {
          setError('currentPassword', {
            type: 'manual',
            message: 'Incorrect current password'
          })
          toast.error(error.message)
        }
      }
    )
  })

  const handleClose = () => {
    reset({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
    onClose()
  }

  const validatePasswordMatch = (value: string) =>
    value === getValues('newPassword') || 'Passwords do not match'

  return (
    isOpen && (
      <Modal
        className="w-[500px]"
        isOpen={isOpen}
        title="Change Password"
        onClose={handleClose}
        titleClassName="m-aut font-semibold"
        titleBorder
      >
        <div className="py-7 px-5 md:px-6">
          <div className="grid grid-cols-1 gap-6">
            <Controller
              name="currentPassword"
              rules={{
                required: 'Required field'
              }}
              control={control}
              render={({ field }) => (
                <PasswordField
                  label="Current password"
                  hasErrors={!!errors?.currentPassword}
                  error={errors?.currentPassword?.message as string}
                  {...field}
                />
              )}
            />
            <Controller
              name="newPassword"
              rules={{
                required: 'Required field',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                }
              }}
              control={control}
              render={({ field }) => (
                <PasswordField
                  label="New Password"
                  hasErrors={!!errors?.newPassword}
                  error={errors?.newPassword?.message as string}
                  {...field}
                />
              )}
            />
            <Controller
              name="confirmNewPassword"
              rules={{
                required: 'Required field',
                validate: validatePasswordMatch
              }}
              control={control}
              render={({ field }) => (
                <PasswordField
                  label="Confirm new password"
                  hasErrors={!!errors?.confirmNewPassword}
                  error={errors?.confirmNewPassword?.message as string}
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-between gap-4 p-6 border-t border-butter">
          <Button
            label="Cancel"
            appearance="outline"
            className="w-[150px]"
            onClick={handleClose}
          />
          <Button
            label="Save changes"
            className={clsx('w-[150px]')}
            disabled={!isValid}
            onClick={onSubmit}
          />
        </div>
      </Modal>
    )
  )
}
export default ChangePasswordModal
