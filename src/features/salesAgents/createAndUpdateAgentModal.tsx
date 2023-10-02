import React from 'react'
import clsx from 'clsx'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Select from 'components/Select/Select'
import TextField from 'components/TextField/TextField'
import { isValidEmail, required } from 'helpers/formValidation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
  SALES_AGENTS_BASE_URL,
  useCreateSalesAgent,
  useUpdateSalesAgent,
  useSalesAgent
} from './salesAgentsApi'
import { useQueryClient } from '@tanstack/react-query'
import Loader from 'components/Loader/Loader'
import { SalesAgentFormData } from './types'
interface CreateAndUpdateAgentModalProps {
  isOpen: boolean
  onClose: () => void
  userId?: string | null
}

const CreateAndUpdateAgentModal: React.FC<CreateAndUpdateAgentModalProps> = ({
  isOpen,
  onClose,
  userId
}) => {
  const { data: user, isLoading: isLoadingUser } = useSalesAgent(userId)

  const defaultValues: SalesAgentFormData = {
    email: user?.email || '',
    username: user?.username || '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    mobileNumber: user?.mobileNumber || '',
    middlename: user?.middlename || '',
    position: user?.position || ''
  }

  const isUpdating = !!userId

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<SalesAgentFormData>({
    defaultValues,
    values: defaultValues,
    mode: 'all'
  })

  const { mutate: createUserMutation } = useCreateSalesAgent()
  const { mutate: updateUserMutation } = useUpdateSalesAgent()
  const queryClient = useQueryClient()
  const onSubmit = handleSubmit((formData) => {
    if (isUpdating) {
      updateUserMutation(
        { ...formData, userId },
        {
          onSuccess() {
            toast.success('Agent updated successfully')
            handleClose()
            queryClient.invalidateQueries({ queryKey: [SALES_AGENTS_BASE_URL] })
          },
          onError(error: any) {
            toast.error(error.message)
          }
        }
      )
    } else {
      createUserMutation(formData, {
        onSuccess() {
          toast.success('Agent created successfully')
          handleClose()
          queryClient.invalidateQueries({ queryKey: [SALES_AGENTS_BASE_URL] })
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
      title={isUpdating ? 'Update Agent' : 'Create Agent'}
      onClose={handleClose}
      titleClassName="font-semibold"
      titleBorder
    >
      {/* {isUpdating && isLoadingUser ? (
        <div className='w-full flex py-4 items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <> */}
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
          label={isUpdating ? 'Update Agent' : 'Create Agent'}
          className={clsx('w-[150px]')}
          onClick={onSubmit}
          disabled={!isValid}
        />
      </div>
      {/* </>
      )} */}
    </Modal>
  )
}
export default CreateAndUpdateAgentModal
