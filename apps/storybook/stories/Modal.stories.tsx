import type { Meta, StoryObj } from '@storybook/react'
import { DialogTrigger, Heading } from 'react-aria-components'
import { Button, Dialog, Modal } from 'aria-lab'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isDismissable: {
      control: 'boolean',
    },
  },
  args: {
    size: 'md',
    isDismissable: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <DialogTrigger>
      <Button variant="secondary">Open Modal</Button>
      <Modal {...args}>
        <Dialog>
          {({ close }: { close: () => void }) => (
            <>
              <Heading slot="title" className="text-lg font-semibold text-[var(--aria-text-primary)]">
                Modal size: {String(args.size)}
              </Heading>
              <p className="mt-2 text-sm text-[var(--aria-text-secondary)]">
                This story demonstrates modal sizing and dismiss behavior.
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="secondary" onPress={close}>
                  Close
                </Button>
                <Button onPress={close}>Confirm</Button>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  ),
}
