import Button from 'components/Button'
import Modal from 'components/Modal'
import { toast } from 'react-toastify'
import { PRODUCTS_BASE_URL, useDeleteProduct } from './productsApi'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
interface DeleteProductModal {
  isOpen: boolean
  onClose: () => void
  productId: string
}

const DeleteProductModal: React.FC<DeleteProductModal> = ({
  isOpen,
  onClose,
  productId
}) => {
  const { mutate: deleteProductMutation } = useDeleteProduct()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const handleDelete = () => {
    deleteProductMutation(productId, {
      onSuccess() {
        toast.success('Product deleted successfully')
        queryClient.invalidateQueries({ queryKey: [PRODUCTS_BASE_URL] })
        onClose()
        navigate('/products')
      },
      onError(error: any) {
        toast.error(error.message)
      }
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Delete Product"
      onClose={() => onClose()}
      titleClassName="font-semibold"
      titleBorder
    >
      <div className="py-8 px-5 md:px-6 pt-0 ">
        <p className="pb-6 text-dark mt-3">
          Are you sure you want to delete this product?
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
export default DeleteProductModal
