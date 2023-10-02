import type { StoryObj } from '@storybook/react'

import Modal from './Modal'
import { useState } from 'react'
import Button from 'components/Button/Button'

const meta = {
  title: 'DataDisplay/Modal',
  component: Modal,
  parameters: {
    layout: 'centered'
  },
}

export default meta
type Story = StoryObj<typeof Modal>

const children = (
  <div className="p-8 pt-0">
    <p className="pb-6 text-dark">Are you sure you want to logout?</p>
    <div className="flex justify-between gap-4">
      <Button label="Cancel" appearance="outline" className="w-[150px]" />
      <Button label="Yes" className="w-[150px]" />
    </div>
  </div>
)
export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Log out',
    children: children,
    showClose: true,
    onClose: () => {},
    className: 'w-[380px]'
  }
}

const DefaultModalWithHooks = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button label="Logout" onClick={() => setIsOpen(true)} />
      <Modal
        isOpen={isOpen}
        title={'Logout'}
        onClose={() => setIsOpen(false)}
        showClose
      >
        <div className="p-8 pt-0">
          <p className="pb-6 text-dark">Are you sure you want to logout?</p>
          <div className="flex justify-between gap-4">
            <Button
              label="Cancel"
              appearance="outline"
              className="w-[150px]"
              onClick={() => setIsOpen(false)}
            />
            <Button
              label="Yes"
              className="w-[150px]"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
export const FunctionalModal: Story = {
  render: () => <DefaultModalWithHooks />
}
