import type { Meta, StoryObj } from '@storybook/react'
import { Tag, TagGroup } from 'aria-lab'

const meta: Meta<typeof TagGroup> = {
  title: 'Components/TagGroup',
  component: TagGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TagGroup label="Tags">
      <Tag>News</Tag>
      <Tag>Travel</Tag>
      <Tag>Gaming</Tag>
      <Tag>Shopping</Tag>
    </TagGroup>
  ),
}
