import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'
import { RiAddLine } from 'react-icons/ri'
import { PiExportBold } from 'react-icons/pi'


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Inputs/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'New Role',
    size: 'md',
    iconPosition: 'left',
    icon: RiAddLine
  }
}

export const Outline: Story = {
  args: {
    label: 'Export CSV',
    size: 'md',
    iconPosition: 'left',
    icon: PiExportBold,
    appearance: 'outline'
  }
}

export const Loading: Story = {
  args: {
    label: 'Log in',
    size: 'md',
    iconPosition: 'left',
    isLoading: true
  }
}
