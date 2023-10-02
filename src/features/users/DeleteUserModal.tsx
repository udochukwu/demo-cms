import Button from 'components/Button'
import Modal from 'components/Modal'
import { toast } from 'react-toastify'
import { USERS_BASE_URL, useDeleteUser } from './usersApi'
import { useQueryClient } from '@tanstack/react-query'
interface DeleteUserModal {
  isOpen: boolean
  onClose: () => void
  userId: string
}

const DeleteUserModal: React.FC<DeleteUserModal> = ({
  isOpen,
  onClose,
  userId
}) => {

  const { mutate: deleteUserMutation } = useDeleteUser()
  const queryClient = useQueryClient()
  const handleDelete = () => {
    deleteUserMutation(userId, {
      onSuccess() {
        toast.success('User deleted successfully')
        queryClient.invalidateQueries({ queryKey: [USERS_BASE_URL] })
        onClose()
      },
      onError(error: any) {
        toast.error(error.message)
      }
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      title='Delete user'
      onClose={() => onClose()}
      titleClassName="font-semibold"
      titleBorder
    >
      <div className="py-8 px-5 md:px-6 pt-0 ">
        <p className="pb-6 text-dark mt-3">Are you sure you want to delete user?</p>
        <div className="flex justify-between gap-4">
          <Button
            label="Cancel"
            appearance="outline"
            className="w-[150px]"
            onClick={() => onClose()}
          />
          <Button label="Yes" className="w-[150px]" onClick={handleDelete} />
        </div>
      </div>
    </Modal>
  )
}
export default DeleteUserModal
