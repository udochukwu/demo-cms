import Button from 'components/Button'
import TabButton from 'components/TabButton'
import Table from 'components/Table'
import React, { useEffect, useState } from 'react'
import { MdOutlineContentCopy } from 'react-icons/md'
import { PiExportBold } from 'react-icons/pi'
import { RiAddLine } from 'react-icons/ri'
import { getUserTableColumns } from './utils'
import CreateAndUpdateUserModal from './CreateAndUpdateUserModal'
import { useUsers } from './usersApi'
import Loader from 'components/Loader'
import DeleteUserModal from './DeleteUserModal'

const Users = () => {
  const [activeTab, setActiveTab] = React.useState<
    'active' | 'pending' | 'deactivated'
  >('active')
  const [showCreateUserModal, setShowCreateUserModal] = useState(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [userToEdit, setUserToEdit] = useState<string | null>(null)
  const [userToDelete, setUserToDelete] = useState<string | ''>('')

  const { data: users, isLoading } = useUsers()

  useEffect(() => {
    if (userToEdit) {
      setShowCreateUserModal(true)
    }
    if (userToDelete) {
      setShowDeleteUserModal(true)
    }
  }, [userToEdit, userToDelete])
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="gap-4 hidden md:flex">
          <Button
            appearance="outline"
            icon={PiExportBold}
            label="Batch upload"
          />
          <Button
            appearance="outline"
            icon={MdOutlineContentCopy}
            label="Export CSV"
          />
          <Button
            icon={RiAddLine}
            label="New user"
            onClick={() => setShowCreateUserModal(true)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-80 ">
          <Loader className="h-5 w-5" />
        </div>
      ) : (
        <>
          <div className="flex mb-6">
            <TabButton
              label="Active"
              active={activeTab == 'active'}
              onClick={() => setActiveTab('active')}
            />
            <TabButton
              label="Pending"
              active={activeTab == 'pending'}
              tag="2"
              onClick={() => setActiveTab('pending')}
            />
            <TabButton
              label="Deactivated"
              active={activeTab == 'deactivated'}
              onClick={() => setActiveTab('deactivated')}
            />
          </div>
          {users && (
            <Table
              columns={getUserTableColumns({
                setUserToEdit,
                setUserToDelete
              })}
              items={users}
            />
          )}
        </>
      )}
      <CreateAndUpdateUserModal
        isOpen={showCreateUserModal}
        onClose={() => {
          setUserToEdit(null)
          setShowCreateUserModal(false)
        }}
        userId={userToEdit}
      />
      <DeleteUserModal
        isOpen={showDeleteUserModal}
        onClose={() => {
          setUserToDelete('')
          setShowDeleteUserModal(false)
        }}
        userId={userToDelete}
      />
    </div>
  )
}

export default Users
