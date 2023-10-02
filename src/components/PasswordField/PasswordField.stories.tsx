import type { StoryObj } from '@storybook/react'

import PasswordField from './PasswordField'
import { useState } from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Inputs/PasswordField',
  component: PasswordField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof PasswordField>

const PasswordFieldWithHooks = () => {
  const [value, setValue] = useState('Secondary')
  return (
    <PasswordField
      className="w-[400px]"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      label="Password"
    />
  )
}

const PasswordFieldWithErrors = () => {
  const [value, setValue] = useState('')
  return (
    <PasswordField
      className="w-[400px]"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      label="Password"
      error="Incorrect email or password"
      hasErrors
    />
  )
}
export const Default: Story = {
  render: () => <PasswordFieldWithHooks />
}
export const WithError: Story = {
  render: () => <PasswordFieldWithErrors />
}
