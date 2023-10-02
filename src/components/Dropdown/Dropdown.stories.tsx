import type { StoryObj } from '@storybook/react'

import Dropdown from './Dropdown'
import Button from 'components/Button/Button'
import { Menu } from '@headlessui/react'
import { AiOutlineEye } from 'react-icons/ai'
import { BsPencil } from 'react-icons/bs'
import { RiCloseCircleLine } from 'react-icons/ri'
import TextField from 'components/TextField/TextField'

const meta = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Dropdown>

const dropdownItems = [
  {
    id: 1,
    label: 'View user details',
    icon: AiOutlineEye
  },
  {
    id: 2,
    label: 'Edit user details',
    icon: BsPencil
  },
  {
    id: 3,
    label: 'Deactivate user',
    icon: RiCloseCircleLine,
    iconClassName: 'text-red-800'
  }
]
export const Default: Story = {
  args: {
    menuButton: <Button label="Dropdown with  Items" />,
    items: dropdownItems
  }
}

export const WithChildren: Story = {
  args: {
    menuButton: <Button label="Dropdown  with children" />,
    children: (
      <>
        <div className="p-5">
          <TextField label="Child" className="w-40" />
        </div>
      </>
    )
  }
}
