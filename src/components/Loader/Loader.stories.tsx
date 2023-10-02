import type { StoryObj } from '@storybook/react'

import Loader from './Loader'

const meta = {
  title: 'Loader',
  component: Loader,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Loader>

export const Default: Story = {
  args: {}
}
