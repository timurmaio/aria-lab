import type { Meta, StoryObj } from '@storybook/react'
import { ComboBox, ComboBoxItem } from 'aria-lab'

const languages = [
  { id: 'ts', name: 'TypeScript' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'python', name: 'Python' },
]

const meta: Meta<typeof ComboBox> = {
  title: 'Components/ComboBox',
  component: ComboBox,
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
    label: 'Language',
    placeholder: 'Search language',
    size: 'md',
    items: languages,
    children: (item: (typeof languages)[number]) => (
      <ComboBoxItem id={item.id} textValue={item.name}>
        {item.name}
      </ComboBoxItem>
    ),
  },
}

export const Invalid: Story = {
  args: {
    label: 'Language',
    placeholder: 'Search language',
    size: 'md',
    items: languages,
    isInvalid: true,
    variant: 'error',
    errorMessage: 'Please pick a value from the list',
    children: (item: (typeof languages)[number]) => (
      <ComboBoxItem id={item.id} textValue={item.name}>
        {item.name}
      </ComboBoxItem>
    ),
  },
}
