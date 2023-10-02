import type { StoryObj } from '@storybook/react'

import Template from './Template'

const meta = {
  title: 'Template',
  component: Template,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Template>

export const Default: Story = {
  args: {}
}
