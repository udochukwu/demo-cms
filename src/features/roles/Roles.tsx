import Button from 'components/Button'
import TabButton from 'components/TabButton/TabButton'
import Table from 'components/Table/Table'
import { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import { getRolesTableColumns } from './utils'
import { useRoles } from './rolesApi'
import Loader from 'components/Loader/Loader'

const Roles = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active')
  const { data: roles, isLoading } = useRoles()

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Roles</h1>
        <div className="flex gap-4">
          <Button icon={RiAddLine} label="New Role" />
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
              label="Inactive"
              active={activeTab == 'inactive'}
              onClick={() => setActiveTab('inactive')}
            />
          </div>
          {roles && <Table columns={getRolesTableColumns()} items={roles} />}
        </>
      )}
    </div>
  )
}

export default Roles
