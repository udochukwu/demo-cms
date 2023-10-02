import React from 'react'
import Dropdown from 'components/Dropdown/Dropdown'
import { FiUser } from 'react-icons/fi'
import { MdOutlineDelete } from 'react-icons/md'
import { SlOptions, SlPencil } from 'react-icons/sl'
import { SalesAgent} from './types'
import dayjs from 'dayjs'

export const getSalesAgentsTableColumns = ({
  setAgentToEdit,
   setAgentToDelete

}: {
    setAgentToEdit: (newVal: string) => void
  setAgentToDelete: (newVal: string) => void

}) => [
  {
    label: 'First Name',
    render: (user: SalesAgent) => user.firstname
  },
  {
    label: 'Last Name',
    render: (user: SalesAgent) => user.lastname
  },
  {
    label: 'Email',
    render: (user: SalesAgent) => user.email
  },
  {
    label: 'Date Added',
    render: (user: SalesAgent) => (
      <div>
        <span className="block text-dark">{dayjs(user.createdAt).format('MMM DD, YYYY')}</span>
        <span className="block text-dark/60">{dayjs(user.createdAt).format('hh:mm:ss A')}</span>
      </div>
    )
  },
  {
    label: 'Actions',
    render: (user: SalesAgent) => (
      <Dropdown
        menuButton={
          <button>
            <SlOptions className="text-main-3" />
          </button>
        }
        items={[
          {
            id: 1,
            label: 'View Sales Agent details',
            icon: FiUser,
            path: `/sales-agents/${user.id}`
          },
          {
            id: 2,
            label: 'Edit Sales Agent details',
            icon: SlPencil,
            onClick: () => setAgentToEdit(user.id)
          },
          {
            id: 2,
            label: 'Delete Sales Agent',
            icon: MdOutlineDelete,
            onClick: () => setAgentToDelete(user.id)
          }
        ]}
        classNameMenuItems="-mt-2"
      />
    )
  }
]

export const mockSalesAgents=[{ id: '123',
  email: 'allita@ubx.com',
  username: 'alitaRuth',
  firstname: 'Alita',
  lastname: 'Ruth',
  middleName: 'Gracious',
  position: '',
  mobileNumber: '0758845032',
  name: '',
  group: '',
  date: 'Sep 21, 2023',
  time: '02:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
  status: ''
},
  { id: '1dslit#',
  email: 'kato@csb.com.ph',
  username: 'Katheleen',
  firstname: 'Katheleen',
  lastname: 'Ona',
  middleName: 'heleen',
  position: '',
  mobileNumber: '0758845032',
  name: '',
  group: '',
  date: 'Aug 21, 2023',
  time: '02:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
  status: ''
  },
  { id: 'thsl09t#',
  email: 'josiah@csb.com.ph',
  username: 'Josiah Diaz',
  firstname: 'Josiah',
  lastname: 'Diaz',
  middleName: 'Rodgriges',
  position: '',
  mobileNumber: '0758820032',
  name: '',
  group: '',
  date: 'Aug 21, 2023',
  time: '03:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
  status: ''
},
]
