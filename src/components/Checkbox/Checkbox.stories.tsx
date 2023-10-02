import type { StoryObj } from '@storybook/react'

import Checkbox from './Checkbox'
import { useState } from 'react'

const meta = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Checkbox>

const CheckboxWithHooks = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox
      onChange={(e) => setChecked(e.target.checked)}
      checked={checked}
      label="Remember me?"
    />
  )
}

export const Default: Story = {
  render: () => <CheckboxWithHooks />
}
