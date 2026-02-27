import type { Meta, StoryObj } from '@storybook/react'
import { DialogTrigger, Heading } from 'react-aria-components'
import { Button, Dialog, Modal } from 'aria-lab'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DialogTrigger>
      <Button variant="secondary">Open Dialog</Button>
      <Modal>
        <Dialog>
          {({ close }: { close: () => void }) => (
            <>
              <Heading slot="title" className="text-lg font-semibold text-[var(--aria-text-primary)]">
                Invite teammate
              </Heading>
              <p className="mt-2 text-sm text-[var(--aria-text-secondary)]">
                Send an invite link so they can access this project.
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Send invite</Button>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  ),
}
