import type { StoryObj } from '@storybook/react'

import Table from './Table'
import { COLUMNS, ITEMS } from './mocks'

const meta = {
  title: 'DataDisplay/Table',
  component: Table,
  parameters: {},
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  args: {
    columns: COLUMNS,
    items: ITEMS
  }
}
