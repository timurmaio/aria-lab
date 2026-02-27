import type { Meta, StoryObj } from '@storybook/react'
import { DialogTrigger } from 'react-aria-components'
import { AlertDialog, Button, Modal } from 'aria-lab'

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Destructive: Story = {
  render: (args: any) => (
    <DialogTrigger>
      <Button variant="destructive">Delete...</Button>
      <Modal>
        <AlertDialog {...args} />
      </Modal>
    </DialogTrigger>
  ),
  args: {
    title: 'Delete project',
    children: 'Are you sure you want to delete this project? This action cannot be undone.',
    variant: 'destructive',
    actionLabel: 'Delete',
  },
}

export const Info: Story = {
  render: (args: any) => (
    <DialogTrigger>
      <Button variant="secondary">Enable sync...</Button>
      <Modal>
        <AlertDialog {...args} />
      </Modal>
    </DialogTrigger>
  ),
  args: {
    title: 'Enable sync',
    children: 'Turn on cloud sync for all team members now?',
    variant: 'info',
    actionLabel: 'Enable',
  },
}
