import clsx from 'clsx'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Select from 'components/Select/Select'
import TextField from 'components/TextField/TextField'
import { isValidEmail, required } from 'helpers/formValidation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
  USERS_BASE_URL,
  useCreateUser,
  useUpdateUser,
  useUser
} from './usersApi'
import { useQueryClient } from '@tanstack/react-query'
import Loader from 'components/Loader/Loader'
import { useRoles } from 'features/roles/rolesApi'
interface CreateAndUpdateUserModalProps {
  isOpen: boolean
  onClose: () => void
  userId?: string | null
}

const CreateAndUpdateUserModal: React.FC<CreateAndUpdateUserModalProps> = ({
  isOpen,
  onClose,
  userId
}) => {
  const { data: user, isLoading: isLoadingUser } = useUser(userId)
  const { data: roles } = useRoles()

  const rolesAsOptions = roles?.map((role) => ({
    value: role.id,
    label: role.name
  }))
  const defaultValues: UserFormData = {
    email: user?.email || '',
    username: user?.username || '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    mobileNumber: user?.mobileNumber || '',
    middlename: user?.middlename || '',
    roleId: user?.role?.id,
    position: user?.position || ''
  }

  const isUpdating = !!userId

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<UserFormData>({
    defaultValues,
    values: defaultValues,
    mode: 'all'
  })

  const { mutate: createUserMutation } = useCreateUser()
  const { mutate: updateUserMutation } = useUpdateUser()
  const queryClient = useQueryClient()
  const onSubmit = handleSubmit((formData) => {
    if (isUpdating) {
      updateUserMutation(
        { ...formData, userId },
        {
          onSuccess() {
            toast.success('User updated successfully')
            handleClose()
            queryClient.invalidateQueries({ queryKey: [USERS_BASE_URL] })
          },
          onError(error: any) {
            toast.error(error.message)
          }
        }
      )
    } else {
      createUserMutation(formData, {
        onSuccess() {
          toast.success('User created successfully')
          handleClose()
          queryClient.invalidateQueries({ queryKey: [USERS_BASE_URL] })
        },
        onError(error: any) {
          toast.error(error.message)
        }
      })
    }
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      className="w-[600px]"
      isOpen={isOpen}
      title={isUpdating ? 'Update User' : 'Create user'}
      onClose={handleClose}
      titleClassName="font-semibold"
      titleBorder
    >
      {isUpdating && isLoadingUser ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div className="py-7 px-5 md:px-6 max-h-96 md:max-h-[500px] overflow-y-scroll">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="email"
                rules={{
                  required: 'Email Address is required',
                  validate: isValidEmail
                }}
                control={control}
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    label="Email"
                    hasErrors={!!errors?.email}
                    error={errors?.email?.message as string}
                    {...field}
                  />
                )}
              />
              <Controller
                name="username"
                rules={{
                  required
                }}
                control={control}
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    label="Username"
                    hasErrors={!!errors?.username}
                    error={errors?.username?.message as string}
                    {...field}
                  />
                )}
              />
              <Controller
                name="firstname"
                rules={{
                  required
                }}
                control={control}
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    label="First Name"
                    hasErrors={!!errors?.firstname}
                    error={errors?.firstname?.message as string}
                    {...field}
                  />
                )}
              />
              <Controller
                name="lastname"
                rules={{
                  required
                }}
                control={control}
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    label="Last Name"
                    hasErrors={!!errors?.lastname}
                    error={errors?.lastname?.message as string}
                    {...field}
                  />
                )}
              />
              <Controller
                name="middlename"
                control={control}
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    label="Middle Name (optional)"
                    {...field}
                  />
                )}
              />
              <Controller
                name="mobileNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    label="Mobile Number (optional)"
                    {...field}
                  />
                )}
              />
              <Controller
                name="roleId"
                control={control}
                render={({ field }) => (
                  <Select
                    options={rolesAsOptions || []}
                    label="Role"
                    {...field}
                  />
                )}
              />
              <Controller
                name="position"
                control={control}
                rules={{ required }}
                render={({ field }) => (
                  <TextField className="w-full" label="Position" {...field} />
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
              label={isUpdating ? 'Update user' : 'Create user'}
              className={clsx('w-[150px]')}
              onClick={onSubmit}
              disabled={!isValid}
            />
          </div>
        </>
      )}
    </Modal>
  )
}
export default CreateAndUpdateUserModal
