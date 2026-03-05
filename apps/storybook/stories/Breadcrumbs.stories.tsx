import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb, Breadcrumbs } from 'aria-lab'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <nav aria-label="Breadcrumb">
      <Breadcrumbs aria-label="Breadcrumb">
        <Breadcrumb href="#">Home</Breadcrumb>
        <Breadcrumb href="#">Products</Breadcrumb>
        <Breadcrumb>Current Page</Breadcrumb>
      </Breadcrumbs>
    </nav>
  ),
}

export const LongPath: Story = {
  render: () => (
    <nav aria-label="Document path">
      <Breadcrumbs aria-label="Document path">
        <Breadcrumb href="/">Home</Breadcrumb>
        <Breadcrumb href="/docs">Docs</Breadcrumb>
        <Breadcrumb href="/docs/components">Components</Breadcrumb>
        <Breadcrumb href="/docs/components/ui">UI</Breadcrumb>
        <Breadcrumb>Breadcrumbs</Breadcrumb>
      </Breadcrumbs>
    </nav>
  ),
}

export const TwoLevels: Story = {
  render: () => (
    <nav aria-label="Breadcrumb">
      <Breadcrumbs aria-label="Breadcrumb">
        <Breadcrumb href="#">Dashboard</Breadcrumb>
        <Breadcrumb>Settings</Breadcrumb>
      </Breadcrumbs>
    </nav>
  ),
}
