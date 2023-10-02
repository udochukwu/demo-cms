import Button from 'components/Button'
import { SlPencil } from 'react-icons/sl'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from './usersApi'
import CreateUserModal from './CreateAndUpdateUserModal'

const User = () => {
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false)
  const { userId } = useParams()
  const { data: user } = useUser(userId)

  const userKeyValues = [
    {
      key: 'First name',
      value: user?.firstname
    },
    {
      key: 'Last name',
      value: user?.lastname
    },
    {
      key: 'Middle Name',
      value: user?.middlename || 'N/A'
    },
    {
      key: 'Mobile number',
      value: user?.mobileNumber || 'N/A'
    },
    {
      key: 'Email address',
      value: <span className="lowercase">{user?.email}</span>
    },
    {
      key: 'Role',
      value: user?.role?.name || 'N/A'
    },
    {
      key: 'Position',
      value: user?.position || 'N/A'
    },
    {
      key: 'Account group',
      value: user?.group || 'N/A'
    },
    {
      key: 'Branch',
      value: 'Ortigas'
    },
    {
      key: 'Status',
      value: user?.status
    }
  ]

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">User</h1>
        <div className="gap-4 hidden md:flex">
          <Button
            icon={SlPencil}
            label="Edit user"
            onClick={() => setShowUpdateUserModal(true)}
          />
        </div>
      </div>
      <div className="bg-white p-6 md:p-10">
        {/* Avatar Component */}
        <div className="flex gap-2 items-center">
          <div className="rounded-full h-12 w-12 min-h-[48px] min-w-[48px] bg-main-4 flex justify-center items-center text-lg font-medium text-main-1">
            NN
          </div>
          <div>
            <span className="font-bold text-xl text-dark leading-5 block mb-1">
              {user?.firstname} {user?.lastname}
            </span>
            <span className="font-normal text-base text-dark/60 leading-4 block">
              {user?.role?.name || 'Administrator'}
            </span>
          </div>
        </div>

        <hr className="my-5 border-gray-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {userKeyValues.map((data) => (
            <div key={data.key}>
              <p className="text-dark/60 mb-1">{data.key}</p>
              <p className="text-dark font-semibold capitalize">{data.value}</p>
            </div>
          ))}
        </div>
      </div>
      <CreateUserModal
        isOpen={showUpdateUserModal}
        onClose={() => setShowUpdateUserModal(false)}
        userId={userId}
      />
    </div>
  )
}

export default User
