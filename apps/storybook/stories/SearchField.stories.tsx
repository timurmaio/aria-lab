import type { Meta, StoryObj } from '@storybook/react'
import { SearchField } from 'aria-lab'

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <SearchField label="Search" placeholder="Search..." />,
}
