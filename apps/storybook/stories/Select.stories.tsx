import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectItem } from 'aria-lab'

const frameworks = [
  { id: 'react', name: 'React' },
  { id: 'vue', name: 'Vue' },
  { id: 'svelte', name: 'Svelte' },
  { id: 'solid', name: 'Solid' },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
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
    label: 'Framework',
    placeholder: 'Choose framework',
    size: 'md',
    items: frameworks,
    children: (item: (typeof frameworks)[number]) => (
      <SelectItem id={item.id} textValue={item.name}>
        {item.name}
      </SelectItem>
    ),
  },
}

export const Invalid: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Choose framework',
    size: 'md',
    items: frameworks,
    isInvalid: true,
    variant: 'error',
    errorMessage: 'Please select one value',
    children: (item: (typeof frameworks)[number]) => (
      <SelectItem id={item.id} textValue={item.name}>
        {item.name}
      </SelectItem>
    ),
  },
}
