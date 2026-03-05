import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from 'aria-lab'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
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
    children: 'Enable notifications',
  },
}

export const Selected: Story = {
  args: {
    children: 'Dark mode',
    defaultSelected: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled option',
    isDisabled: true,
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Switch>Enable notifications</Switch>
      <Switch defaultSelected>Dark mode</Switch>
      <Switch isDisabled>Disabled off</Switch>
      <Switch defaultSelected isDisabled>
        Disabled on
      </Switch>
    </div>
  ),
}
