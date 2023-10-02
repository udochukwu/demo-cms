import Dropdown from 'components/Dropdown/Dropdown'
import { FiUser } from 'react-icons/fi'
import { MdOutlineDelete } from 'react-icons/md'
import { SlOptions, SlPencil } from 'react-icons/sl'
import dayjs from 'dayjs'

export const getUserTableColumns = ({
  setUserToEdit,
  setUserToDelete
}: {
  setUserToEdit: (newVal: string) => void
  setUserToDelete: (newVal: string) => void
}) => [
  {
    label: 'First Name',
    render: (user: User) => user.firstname
  },
  {
    label: 'Last Name',
    render: (user: User) => user.lastname
  },
  {
    label: 'Email',
    render: (user: User) => user.email
  },
  {
    label: 'Role',
    render: (user: User) => user.role?.name || "N/A"
  },
  {
    label: 'Date Added',
    render: (user: User) => (
      <div>
        <span className="block text-dark">{dayjs(user.createdAt).format('MMM DD, YYYY')}</span>
        <span className="block text-dark/60">{dayjs(user.createdAt).format('hh:mm:ss A')}</span>
      </div>
    )
  },
  {
    label: 'Actions',
    render: (user: User) => (
      <Dropdown
        menuButton={
          <button>
            <SlOptions className="text-main-3" />
          </button>
        }
        items={[
          {
            id: 1,
            label: 'View user details',
            icon: FiUser,
            path: `/users/${user.id}`
          },
          {
            id: 2,
            label: 'Edit user details',
            icon: SlPencil,
            onClick: () => setUserToEdit(user.id)
          },
          {
            id: 2,
            label: 'Delete User',
            icon: MdOutlineDelete,
            onClick: () => setUserToDelete(user.id)
          }
        ]}
        classNameMenuItems="-mt-2"
      />
    )
  }
]
