import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox, CheckboxGroup } from 'aria-lab'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDisabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Accept terms and conditions',
  },
}

export const Selected: Story = {
  args: {
    children: 'Subscribe to newsletter',
    defaultSelected: true,
  },
}

export const Indeterminate: Story = {
  args: {
    children: 'Select all',
    isIndeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled option',
    isDisabled: true,
  },
}

export const Group: Story = {
  render: () => (
    <CheckboxGroup label="Notification preferences" defaultValue={['email']}>
      <Checkbox value="email">Email</Checkbox>
      <Checkbox value="sms">SMS</Checkbox>
      <Checkbox value="push">Push notifications</Checkbox>
    </CheckboxGroup>
  ),
}

export const GroupHorizontal: Story = {
  render: () => (
    <CheckboxGroup label="Notify via" orientation="horizontal" defaultValue={['email']}>
      <Checkbox value="email">Email</Checkbox>
      <Checkbox value="sms">SMS</Checkbox>
      <Checkbox value="push">Push</Checkbox>
    </CheckboxGroup>
  ),
}
