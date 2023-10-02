import React from 'react'
import type { StoryObj } from '@storybook/react'

import TabButton from './TabButton'
const meta = {
  title: 'Navigation/TabButton',
  component: TabButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof TabButton>

export const Default: Story = {
  args: {
    label: 'Active Tab',
    active: true
  }
}
export const WithTag: Story = {
  args: {
    label: 'Pending',
    tag: 2,
    active: true
  }
}

const TabListComponent = () => {
  const [activeTab, setActiveTab] = React.useState<
    'active' | 'pending' | 'deactivated'
  >('active')
  return (
    <div className="flex">
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
        label="Active"
        active={activeTab == 'deactivated'}
        onClick={() => setActiveTab('deactivated')}
      />
    </div>
  )
}

export const TabList: Story = {
  render: () => <TabListComponent />
}
