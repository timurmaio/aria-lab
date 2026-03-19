import type { Meta, StoryObj } from '@storybook/react'
import { Radio, RadioGroup } from 'aria-lab'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    isDisabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup label="Size" defaultValue="m">
      <Radio value="s">Small</Radio>
      <Radio value="m">Medium</Radio>
      <Radio value="l">Large</Radio>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup label="Theme" defaultValue="light" orientation="horizontal">
      <Radio value="light">Light</Radio>
      <Radio value="dark">Dark</Radio>
      <Radio value="system">System</Radio>
    </RadioGroup>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <RadioGroup
      label="Shipping method"
      description="Select your preferred shipping option"
      defaultValue="standard"
    >
      <Radio value="standard">Standard (5-7 days)</Radio>
      <Radio value="express">Express (2-3 days)</Radio>
      <Radio value="overnight">Overnight</Radio>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup label="Payment" isDisabled>
      <Radio value="card">Card</Radio>
      <Radio value="paypal">PayPal</Radio>
    </RadioGroup>
  ),
}
