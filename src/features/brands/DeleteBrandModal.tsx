import Button from 'components/Button'
import Modal from 'components/Modal'
import { toast } from 'react-toastify'
import { BRANDS_BASE_URL, useDeleteBrand } from './brandsApi'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
interface DeleteBrandModal {
  isOpen: boolean
  onClose: () => void
  brandId: string
}

const DeleteBrandModal: React.FC<DeleteBrandModal> = ({
  isOpen,
  onClose,
  brandId
}) => {
  const { mutate: deleteBrandMutation } = useDeleteBrand()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const handleDelete = () => {
    deleteBrandMutation(brandId, {
      onSuccess() {
        toast.success('Brand deleted successfully')
        queryClient.invalidateQueries({ queryKey: [BRANDS_BASE_URL] })
        onClose()
        navigate('/catalogue/brand')
      },
      onError(error: any) {
        toast.error(error.message)
      }
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Delete Brand"
      onClose={() => onClose()}
      titleClassName="font-semibold"
      titleBorder
    >
      <div className="py-8 px-5 md:px-6 pt-0 ">
        <p className="pb-6 text-dark mt-3">
          Are you sure you want to delete this brand?
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
export default DeleteBrandModal
