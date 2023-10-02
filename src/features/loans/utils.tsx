import React from 'react'
import Dropdown from 'components/Dropdown/Dropdown'
import { FiUser } from 'react-icons/fi'
import { MdOutlineDelete } from 'react-icons/md'
import { SlOptions, SlPencil } from 'react-icons/sl'
import { LoanApplicationsData} from './types'
import dayjs from 'dayjs'


type statusProps = {
  status:string
}
const StatusTags = (status: statusProps) => {

  const statuses = [
    { name: 'Ongoing review', statusClassName: 'text-yellow-700 bg-yellow-50 ' },
    { name: 'Rejected', statusClassName: 'text-red-900 bg-red-50' },
    { name: 'Returned', statusClassName: 'text-gray-700 bg-gray-25' },
    { name: 'Approved', statusClassName: 'text-main-2 bg-main-5' },
    { name: 'Success', statusClassName: 'text-green-800 bg-green-50' },
    { name: 'Cancelled', statusClassName: 'text-red-900 bg-red-50' },
  ];

  const statusObject = statuses.find((s) => s.name === status.status);

  if (!statusObject) {
    return null;
  }
  const { statusClassName } = statusObject;
  return (
  <span className={`${statusClassName} px-2 py-1 rounded-lg w-fit flex font-bold `}>{status.status}</span>

  );
};

export const getLoanApplicationsTableColumns = () => [

  {
    label: 'Application ID',
    render: (user: LoanApplicationsData) => user.id
  },
  {
    label: 'Account name',
    render: (user: LoanApplicationsData) => user.accountName
  },
  {
    label: 'Loan availed',
    render: (user: LoanApplicationsData) => user.loanAvailed
  },
   {
    label: 'Decile score',
     render: (user: LoanApplicationsData) => (
       <div className='w-full flex items-center justify-center'><span>{user.decileScore}</span></div>
     )
  },
  {
    label: 'Date and time applied',
    render: (user: LoanApplicationsData) => (
      <div>
        <span className="block text-dark">{dayjs(user.createdAt).format('MMM DD, YYYY')}</span>
        <span className="block text-dark/60">{dayjs(user.createdAt).format('hh:mm:ss A')}</span>
      </div>
    )
  },
  {
    label: 'Status',
    render: (user: LoanApplicationsData) => (<StatusTags status={user.status}/>)
  },
  {
    label: 'Actions',
    render: (user: LoanApplicationsData) => (
      <Dropdown
        menuButton={
          <button>
            <SlOptions className="text-main-3" />
          </button>
        }
        items={[
          {
            id: 1,
            label: 'View Loan details',
            icon: FiUser,
            path: `/loans`
          },
          {
            id: 2,
            label: 'Edit Loan details',
            icon: SlPencil,
            onClick: () => {}
          },
          {
            id: 2,
            label: 'Delete Loan',
            icon: MdOutlineDelete,
            onClick: () => {}
          }
        ]}
        classNameMenuItems="-mt-2"
      />
    )
  }
]

export const mockLoanApplications=[{ id: '1234-5678-0000',
  accountName: 'Marian Magsaysay',
  loanAvailed: 'Motorcycle loan',
  decileScore: 3,
  status: 'Ongoing review',
  date: 'Sep 21, 2023',
  time: '02:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
},
  { id: '1234-5678-0000',
  accountName: 'Andrew Velasco',
  loanAvailed: 'Motorcycle loan',
  decileScore: 3,
  status: 'Success',
  date: 'Sep 21, 2023',
  time: '02:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
},
 { id: '1234-5678-0000',
  accountName: 'Veronica Velasco',
  loanAvailed: 'Motorcycle loan',
  decileScore: 3,
  status: 'Rejected',
  date: 'Sep 21, 2023',
  time: '02:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
},
  { id: '1234-5678-0000',
  accountName: 'Veronica Velasco',
  loanAvailed: 'Motorcycle loan',
  decileScore: 3,
  status: 'Returned',
  date: 'Sep 21, 2023',
  time: '02:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
  },
    { id: '1234-5678-0000',
  accountName: 'Veronica Velasco',
  loanAvailed: 'Motorcycle loan',
  decileScore: 3,
  status: 'Approved',
  date: 'Sep 21, 2023',
  time: '02:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
  },
    { id: '1234-5678-0000',
  accountName: 'Veronica Velasco',
  loanAvailed: 'Motorcycle loan',
  decileScore: 3,
  status: 'Cancelled',
  date: 'Sep 21, 2023',
  time: '02:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
},
      { id: '1234-5678-0000',
  accountName: 'Veronica Velasco',
  loanAvailed: 'Motorcycle loan',
  decileScore: 3,
  status: 'Success',
  date: 'Sep 21, 2023',
  time: '02:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
  },
        { id: '1234-5678-0000',
  accountName: 'Luke Velasco',
  loanAvailed: 'Motorcycle loan',
  decileScore: 3,
  status: 'Success',
  date: 'Sep 21, 2023',
  time: '02:09:32 PM',
  createdAt: '2023-09-20T23:03:22.000Z',
},
]
