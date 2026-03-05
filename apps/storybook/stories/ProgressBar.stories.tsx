import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from 'aria-lab'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Determinate: Story = {
  render: () => <ProgressBar label="Upload" value={65} maxValue={100} />,
}

export const Indeterminate: Story = {
  render: () => <ProgressBar label="Loading..." isIndeterminate />,
}
