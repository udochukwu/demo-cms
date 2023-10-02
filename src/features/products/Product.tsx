import { SlPencil } from 'react-icons/sl'
import { Link, useParams } from 'react-router-dom'
import { BiArchive, BiCart } from 'react-icons/bi'
import Dropdown from 'components/Dropdown/Dropdown'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import productLogo from './assets/suzuki.png'
import { BsEye } from 'react-icons/bs'
import StatusBadge from 'components/StatusBadge/StatusBadge'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import { RiStockLine } from 'react-icons/ri'
import { useProduct } from './productsApi'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import { useState } from 'react'
import DeleteProductModal from './DeleteProductModal'

const ProductDetails = () => {
  const { productId } = useParams()
  const { data: product, isLoading } = useProduct(productId)
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false)

  const productVariants = product?.variants
    ? Object.entries(product.variants)
    : null

  return (
    <>
      <div className="w-full overflow-x-hidden">
        <div className="flex justify-between mb-4">
          <Link
            to="/products"
            className="sm:text-2xl text-lg font-bold flex items-center gap-x-2"
          >
            <TbArrowNarrowLeft className="text-main-3" />
            Product details
          </Link>
          <div className="gap-4 flex">
            <Dropdown
              menuButton={
                <Button
                  label="Action"
                  icon={HiOutlineChevronDown}
                  iconPosition="right"
                  className="ml-3 font-semibold text-sm"
                  disabled={isLoading}
                />
              }
              items={[
                {
                  id: 1,
                  label: 'View products details',
                  icon: BsEye,
                  path: `/products/`
                },
                {
                  id: 2,
                  label: 'Edit product',
                  icon: SlPencil,
                  path: `/products/${productId}/edit`
                },
                {
                  id: 3,
                  label: 'Archive product',
                  icon: BiArchive,
                  path: `/products/`
                },
                {
                  id: 4,
                  label: 'Delete product',
                  icon: MdDeleteOutline,
                  onClick: () => setShowDeleteProductModal(true)
                }
              ]}
              classNameMenuItems="-mt-1 rigtht-5"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            {' '}
            <Loader />
          </div>
        ) : (
          <div className="bg-white p-6 md:p-10 sm:flex">
            <div className="sm:w-2/5 w-full sm:p-10">
              <img src={product?.image} alt="product image" />
            </div>
            <div className="sm:w-3/5 w-full">
              <div className="flex justify-between items-center">
                <img
                  src={productLogo}
                  className="w-10 h-[31px]"
                  alt="product logo"
                />
                <span className="block px-3 py-2">
                  <StatusBadge status="active" />
                </span>
              </div>
              <h1 className="text-xl font-semibold pt-4 capitalize">
                {product?.name}
              </h1>
              <span className="block pt-3 text-sm text-gray-600">
                Product Code
              </span>
              <span className="text-xl font-semibold block pt-4">
                {product?.productCode}
              </span>
              <span className="block py-3 text-sm text-gray-600">
                Description
              </span>
              <p className="text-sm leading-6 text-dark">
                {product?.description}
              </p>
              <div className="flex justify-between pt-4">
                <span className="text-sm font-semibold text-graymatter">
                  Variants
                </span>
                <span className="flex gap-x-2">
                  {productVariants?.map(([key, value]) => (
                    <span
                      key={key}
                      className="bg-gray-50 px-2 py-1 rounded-lg text-graymatter text-sm font-semibold"
                    >
                      {value}
                    </span>
                  ))}
                </span>
              </div>
              <div className="pt-5">
                <span className="flex items-center gap-x-4 pb-4 text-gray-500">
                  <BsEye />
                  <span className="text-sm">Views: 10,000</span>
                </span>
                <span className="flex items-center gap-x-4 pb-4 text-gray-500">
                  <RiStockLine />
                  <span className="text-sm">Stock: {product?.stocks}</span>
                </span>
                <span className="flex items-center gap-x-4 pb-4 text-gray-500">
                  <BiCart />
                  <span className="text-sm">Sold: 1000</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>{' '}
      <DeleteProductModal
        isOpen={showDeleteProductModal}
        onClose={() => {
          setShowDeleteProductModal(false)
        }}
        productId={productId || ''}
      />
    </>
  )
}

export default ProductDetails
