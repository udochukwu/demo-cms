import Button from 'components/Button'
import TabButton from 'components/TabButton'
import Table from 'components/Table'
import React, { useEffect, useState } from 'react'
import { MdOutlineContentCopy } from 'react-icons/md'
import { PiExportBold } from 'react-icons/pi'
import { RiAddLine } from 'react-icons/ri'
import { getSalesAgentsTableColumns, mockSalesAgents } from './utils'
import { useSalesAgents } from './salesAgentsApi'
import Loader from 'components/Loader'
import CreateAndUpdateAgentModal from './createAndUpdateAgentModal'
import DeleteSalesAgentModal from './deleteSalesAgentModal'

const SalesAgents = () => {
  const [activeTab, setActiveTab] = React.useState<
    'active' | 'pending' | 'deactivated'
  >('active')
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false)
  const [showDeleteAgentModal, setShowDeleteAgentModal] = useState(false)
  const [agentToEdit, setAgentToEdit] = useState<string | null>(null)
  const [agentToDelete, setAgentToDelete] = useState<string | ''>('')

  // const { data: salesAgents, isLoading } = useSalesAgents()
  useEffect(() => {
    if (agentToEdit) {
      setShowCreateAgentModal(true)
    }
    if (agentToDelete) {
      setShowDeleteAgentModal(true)
    }
  }, [agentToEdit, agentToDelete])

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Sales Associates/Agents</h1>
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
            label="New Sales Agent"
            onClick={() => setShowCreateAgentModal(true)}
          />
        </div>
      </div>
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
      <Table
        columns={getSalesAgentsTableColumns({
          setAgentToEdit,
          setAgentToDelete
        })}
        items={mockSalesAgents}
      />
      <CreateAndUpdateAgentModal
        isOpen={showCreateAgentModal}
        onClose={() => {
          setAgentToEdit(null)
          setShowCreateAgentModal(false)
        }}
        userId={agentToEdit}
      />
      <DeleteSalesAgentModal
        isOpen={showDeleteAgentModal}
        onClose={() => {
          setAgentToDelete('')
          setShowDeleteAgentModal(false)
        }}
        userId={agentToDelete}
      />
    </div>
  )
}

export default SalesAgents
