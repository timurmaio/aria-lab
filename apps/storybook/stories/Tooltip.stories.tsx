import type { Meta, StoryObj } from '@storybook/react'
import { Button, Tooltip, TooltipTrigger } from 'aria-lab'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const OnButton: Story = {
  render: () => (
    <TooltipTrigger>
      <Button variant="secondary">Hover me</Button>
      <Tooltip>Helpful hint</Tooltip>
    </TooltipTrigger>
  ),
}

export const OnIconButton: Story = {
  render: () => (
    <TooltipTrigger>
      <Button variant="ghost" size="icon" aria-label="Edit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </Button>
      <Tooltip>Edit</Tooltip>
    </TooltipTrigger>
  ),
}

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <TooltipTrigger>
        <Button variant="secondary">Copy</Button>
        <Tooltip>Copy to clipboard</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="secondary">Paste</Button>
        <Tooltip>Paste from clipboard</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="secondary">Delete</Button>
        <Tooltip>Delete item</Tooltip>
      </TooltipTrigger>
    </div>
  ),
}
