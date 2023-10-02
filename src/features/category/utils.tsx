import Dropdown from 'components/Dropdown/Dropdown'
import { Column } from 'components/Table/Table'
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch'
import { BsEye } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { SlOptions, SlPencil } from 'react-icons/sl'
import { Link } from 'react-router-dom'

export const getCategoryTableColumns : ()=> Column[] = () => [
  {
    label: 'Name',
    render: (category: Category) => category.name
  },
  {
    label: 'Products',
    render: (category: Category) => category?.productCount
  },
  {
    label: 'Status',
    render: (category: Category) => (
      <span className="ml-2.5">
        <ToggleSwitch />
      </span>
    )
  },
  {
    label: 'Actions',
    render: (category: Category) => (
      <Link to={`/catalogue/category/${category?.id}`} className='mx-auto sm:mx-0'>
        <BsEye />
      </Link>
    ),
    className: 'justify-start pl-6'
  }
]
