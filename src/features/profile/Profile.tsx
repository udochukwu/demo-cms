import Button from 'components/Button'
import { useMemo, useState } from 'react'
import ChangePasswordModal from './ChangePasswordModal'
import useCurrentUser from 'features/auth/hooks/useCurrentUser'
import { useUser } from 'features/users/usersApi'

const Profile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const { user } = useCurrentUser()
  const { data: userProfile } = useUser(user?.id)
  const profileKeyValues = useMemo(
    () => [
      {
        key: 'username',
        value: userProfile?.username
      },
      {
        key: 'First name',
        value: userProfile?.firstname || user?.firstname || "N/A"
      },
      {
        key: 'Last name',
        value: userProfile?.lastname || user?.lastname || "N/A"
      },
      {
        key: 'Middle name',
        value: userProfile?.middlename
      },
      {
        key: 'Mobile number',
        value: userProfile?.mobileNumber || 'n/a'
      },
      {
        key: 'Email address',
        value: <span className='lowercase'>{userProfile?.email}</span>
      },
      {
        key: 'Role',
        value: userProfile?.role?.name || 'N/A'
      },
      {
        key: 'Account Status',
        value: userProfile?.status
      },
      {
        key: 'Account group',
        value: 'ABC'
      }
    ],
    [userProfile, user]
  )

  return (
    <>
      <div className="flex mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <div className="bg-white p-6 md:p-10">
        <h2 className="text-xl text-dark font-semibold mb-5">Manage Profile</h2>
        <h3 className="text-base text-dark font-semibold">Avatar</h3>
        <p className="text-sm text-dark/60 mb-6">
          Max file size of 1MB. Supports .jpg, .jpeg, .png.
        </p>

        <div className="flex items-end">
          <div className="p-3 border-dotted border mr-6">
            <div className="rounded-full h-12 w-12 min-w-[48px] min-h-[48px] bg-main-4 flex justify-center items-center text-lg font-medium text-main-1">
              NN
            </div>
          </div>
          <Button label="Remove" appearance="outline" className="mr-3" />
          <Button label="Upload image" />
        </div>
        <hr className="my-5 border-gray-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {profileKeyValues.map((data) => (
            <div key={data.key}>
              <p className="text-dark/60 mb-1">{data.key}</p>
              <p className="text-dark font-semibold capitalize">{data.value}</p>
            </div>
          ))}
          <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row justify-between gap-3">
            <div>
              <p className="text-dark font-semibold">Change password</p>
              <p className="text-dark/60 mb-1">
                Update your current password with a new one
              </p>
            </div>
            <Button
              label="Change password"
              appearance="outline"
              className="w-max"
              onClick={() => setShowPasswordModal(true)}
            />
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  )
}

export default Profile
