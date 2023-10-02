import { Column } from 'components/Table/Table'
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch'
import { BsEye } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const getBrandTableColumns : ()=> Column[] = () => [
  {
    label: 'Name',
    render: (brand: Brand) => brand.name
  },
  {
    label: 'Products',
    render: (brand: Brand) => brand?.productCount
  },
  {
    label: 'Status',
    render: (brand: Brand) => (
      <span className="ml-2.5">
        <ToggleSwitch />
      </span>
    )
  },
  {
    label: 'Actions',
    render: (brand: Brand) => (
      <Link to={`/catalogue/brand/${brand?.id}`} className='mx-auto sm:mx-0'>
        <BsEye />
      </Link>
    ),
    className: 'justify-start pl-6'
  }
]
