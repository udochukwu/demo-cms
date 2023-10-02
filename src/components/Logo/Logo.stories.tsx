import type { StoryObj } from '@storybook/react'

import Logo from './Logo'

const meta = {
  title: 'Inputs/Logo',
  component: Logo,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="bg-main-3">
        <Story />
      </div>
    )
  ]
}

export const DarkBackground: Story = {
  decorators: [
    (Story) => (
      <div className="bg-black">
        <Story />
      </div>
    )
  ]
}
