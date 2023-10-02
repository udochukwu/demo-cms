import Dropdown from 'components/Dropdown/Dropdown'
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch'
import productPlaceholderImage from './assets/thumbnail.png'
import { BsEye } from 'react-icons/bs'
import { SlOptions, SlPencil } from 'react-icons/sl'
import { Link } from 'react-router-dom'

export const getProductsTableColumns = () => [
  {
    label: '',
    render: (product: Product) => (
      <img
        src={product.image || productPlaceholderImage}
        className="h-10 min-h-[40px] w-10 min-w-[40px] object-cover text-xs"
        alt={`${product.name} image`}
      />
    )
  },
  {
    label: 'Name',
    render: (product: Product) => (
      <Link to={`/products/${product.id}`}>
        <span className="text-main-2 text-sm font-semibold ml-1.5">
          {product.name}
        </span>
      </Link>
    )
  },
  {
    label: 'Brand',
    render: (product: Product) => (
      <span className="ml-2">{product.brand?.name}</span>
    )
  },
  {
    label: 'Price',
    render: (product: Product) => <span className="ml-2">${product.price}</span>
  },
  {
    label: 'Stock',
    render: (product: Product) => <span className="ml-2">{product.stocks}</span>
  },
  {
    label: 'Variants',
    render: (product: Product) => {
      const variants = product?.variants
        ? Object.entries(product.variants)
        : null
      if (!variants) {
        return null
      }

      const firstTwoVariants = variants.slice(0, 2)
      const remainingVariantsCount = variants.length - 2

      return (
        <span className="flex ml-2">
          {firstTwoVariants.map(([key, value]) => (
            <span
              className="bg-gray-50 w-fit flex px-2 py-1 mr-2 rounded-lg text-graymatter font-bold text-xs"
              key={key}
            >
              {value}
            </span>
          ))}
          {remainingVariantsCount > 0 && (
            <span className="bg-gray-50 w-fit flex px-2 py-1 mr-2 rounded-lg text-graymatter font-bold text-xs">
              +{remainingVariantsCount}
            </span>
          )}
        </span>
      )
    }
  },
  {
    label: 'Status',
    render: (product: Product) => (
      <span className="ml-2.5">
        <ToggleSwitch />
      </span>
    )
  },
  {
    label: 'Actions',
    render: (product: Product) => (
      <Dropdown
        menuButton={
          <button className="ml-3">
            <SlOptions className="text-main-3" />
          </button>
        }
        items={[
          {
            id: 1,
            label: 'View products details',
            icon: BsEye,
            path: `/products/${product.id}`
          },
          {
            id: 2,
            label: 'Edit product',
            icon: SlPencil,
            path: `/products/${product.id}/edit`
          }
        ]}
        classNameMenuItems="-mt-1 -left-10"
        position="bottom-start"
      />
    )
  }
]
