import type { Meta, StoryObj } from '@storybook/react'
import { NumberField } from 'aria-lab'

const meta: Meta<typeof NumberField> = {
  title: 'Components/NumberField',
  component: NumberField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <NumberField label="Quantity" defaultValue={5} minValue={0} maxValue={100} />,
}

export const WithStep: Story = {
  render: () => <NumberField label="Amount" defaultValue={10} minValue={0} step={0.5} />,
}
