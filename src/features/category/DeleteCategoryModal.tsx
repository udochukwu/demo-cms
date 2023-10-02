import Button from 'components/Button'
import Modal from 'components/Modal'
import { toast } from 'react-toastify'
import { CATEGORY_BASE_URL, useDeleteCategory } from './categoryApi'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
interface DeleteCategoryModal {
  isOpen: boolean
  onClose: () => void
  categoryId: string
}

const DeleteCategoryModal: React.FC<DeleteCategoryModal> = ({
  isOpen,
  onClose,
  categoryId
}) => {
  const { mutate: deleteCategoryMutation } = useDeleteCategory()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const handleDelete = () => {
    deleteCategoryMutation(categoryId, {
      onSuccess() {
        toast.success('Category deleted successfully')
        queryClient.invalidateQueries({ queryKey: [CATEGORY_BASE_URL] })
        onClose()
        navigate('/catalogue/category')
      },
      onError(error: any) {
        toast.error(error.message)
      }
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Delete Category"
      onClose={() => onClose()}
      titleClassName="font-semibold"
      titleBorder
    >
      <div className="py-8 px-5 md:px-6 pt-0 ">
        <p className="pb-6 text-dark mt-3">
          Are you sure you want to delete this category?
        </p>
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
export default DeleteCategoryModal
