import Dropdown from 'components/Dropdown/Dropdown'
import { Column } from 'components/Table/Table'
import { FiUser } from 'react-icons/fi'
import { SlOptions, SlPencil } from 'react-icons/sl'

export const getRolesTableColumns = () => [
  {
    label: 'Name',
    render: (role: Role) => role.name
  },
  {
    label: 'Description',
    render: (role: Role) => role.description
  },
  {
    label: 'Users',
    render: (role: Role) => role.usersCount
  },
  {
    label: 'Actions',
    render: (role: Role) => (
      <Dropdown
        menuButton={
          <button>
            <SlOptions className="text-main-3" />
          </button>
        }
        items={[
          {
            id: 1,
            label: 'View role details',
            icon: FiUser,
            path: `/roles/${role?.id}`
          },
          {
            id: 2,
            label: 'Edit role details',
            icon: SlPencil,
            path: `/roles/${role?.id}`
          }
        ]}
        classNameMenuItems="-mt-2"
      />
    )
  }
]

export const roleKeyValues = [
  {
    key: 'First name',
    value: 'Nelson'
  },
  {
    key: 'Last name',
    value: 'Nnaji'
  },
  {
    key: 'Mobile number',
    value: '+63 917 123 1234'
  },
  {
    key: 'Email address',
    value: 'marian@csb.com.ph'
  },
  {
    key: 'Role',
    value: 'Dealer'
  },
  {
    key: 'Position',
    value: 'Active'
  },
  {
    key: 'Account group',
    value: 'ABC'
  },
  {
    key: 'Branch',
    value: 'Ortigas'
  },
  {
    key: 'Status',
    value: 'Active'
  }
]
