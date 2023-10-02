import type { StoryObj } from '@storybook/react'

import TextField from './TextField'
import { useState } from 'react'

const meta = {
  title: 'Inputs/TextField',
  component: TextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof TextField>

const TextfieldWithHooks = () => {
  const [value, setValue] = useState('')
  return (
    <TextField
      className="w-[400px]"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      label="Email"
    />
  )
}

const TextfieldWithErrors = () => {
  const [value, setValue] = useState('')
  return (
    <TextField
      className="w-[400px]"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      label="Email"
      error="Incorrect email"
      hasErrors
    />
  )
}

export const Default: Story = {
  render: () => <TextfieldWithHooks />
}

export const WithError: Story = {
  render: () => <TextfieldWithErrors />
}
