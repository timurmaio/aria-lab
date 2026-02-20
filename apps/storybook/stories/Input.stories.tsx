import type { Meta, StoryObj } from '@storybook/react'
import { Input } from 'aria-lab'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: 'Some value',
  },
}

export const Error: Story = {
  args: {
    placeholder: 'Error input',
    variant: 'error',
  },
}

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    placeholder: 'Medium input',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}
