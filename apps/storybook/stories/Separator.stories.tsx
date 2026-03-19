import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from 'aria-lab'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <p style={{ fontSize: 13, margin: 0 }}>Above</p>
      <Separator orientation="horizontal" />
      <p style={{ fontSize: 13, margin: 0 }}>Below</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ fontSize: 13 }}>One</span>
      <Separator orientation="vertical" />
      <span style={{ fontSize: 13 }}>Two</span>
      <Separator orientation="vertical" />
      <span style={{ fontSize: 13 }}>Three</span>
    </div>
  ),
}
