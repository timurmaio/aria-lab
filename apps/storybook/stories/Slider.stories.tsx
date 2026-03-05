import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from 'aria-lab'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Slider label="Volume" defaultValue={50} />,
}

export const Range: Story = {
  render: () => (
    <Slider
      label="Price range"
      defaultValue={[20, 80]}
      minValue={0}
      maxValue={100}
      thumbLabels={['Min', 'Max']}
    />
  ),
}
