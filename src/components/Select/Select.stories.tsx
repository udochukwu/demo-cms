import type { StoryObj } from '@storybook/react'

import Select from './Select'
import { useState } from 'react'

const meta = {
  title: 'Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Select>

const options = [
  { label: 'Super Administrator', value: '1' },
  { label: 'Admin', value: '2' }
]
const SelectWithHooks = () => {
  const [value, setValue] = useState('')
  return (
    <Select
      className="w-[400px]"
      onChange={(value) => setValue(value)}
      options={options}
      value={value}
      label="Role"
    />
  )
}


export const Default: Story = {
  render: () => <SelectWithHooks />
}
