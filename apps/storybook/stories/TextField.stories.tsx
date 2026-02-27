import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from 'aria-lab'

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    description: 'We only use it for account notifications.',
  },
}

export const Invalid: Story = {
  args: {
    label: 'Username',
    placeholder: 'Pick username',
    isInvalid: true,
    variant: 'error',
    errorMessage: 'Username is already taken',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Invite code',
    defaultValue: 'ACCESS-2026',
    isDisabled: true,
  },
}
