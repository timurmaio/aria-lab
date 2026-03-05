import type { Meta, StoryObj } from '@storybook/react'
import { Disclosure, DisclosureGroup, DisclosureHeader, DisclosurePanel } from 'aria-lab'

const meta: Meta<typeof Disclosure> = {
  title: 'Components/Disclosure',
  component: Disclosure,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const SingleDisclosure: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Disclosure>
        <DisclosureHeader>System Requirements</DisclosureHeader>
        <DisclosurePanel>Details about system requirements here. You may need a modern browser and JavaScript enabled.</DisclosurePanel>
      </Disclosure>
    </div>
  ),
}

export const Accordion: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <DisclosureGroup>
        <Disclosure id="info">
          <DisclosureHeader>Personal Information</DisclosureHeader>
          <DisclosurePanel>Name, email, phone number and other contact details.</DisclosurePanel>
        </Disclosure>
        <Disclosure id="billing">
          <DisclosureHeader>Billing Address</DisclosureHeader>
          <DisclosurePanel>Street, city, postal code and payment method.</DisclosurePanel>
        </Disclosure>
        <Disclosure id="prefs">
          <DisclosureHeader>Preferences</DisclosureHeader>
          <DisclosurePanel>Notification settings and language preferences.</DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
    </div>
  ),
}

export const MultipleExpanded: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <DisclosureGroup defaultExpandedKeys={['info', 'prefs']}>
        <Disclosure id="info">
          <DisclosureHeader>Personal Information</DisclosureHeader>
          <DisclosurePanel>Name, email, phone number.</DisclosurePanel>
        </Disclosure>
        <Disclosure id="billing">
          <DisclosureHeader>Billing Address</DisclosureHeader>
          <DisclosurePanel>Street, city, postal code.</DisclosurePanel>
        </Disclosure>
        <Disclosure id="prefs">
          <DisclosureHeader>Preferences</DisclosureHeader>
          <DisclosurePanel>Notifications and language.</DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
    </div>
  ),
}
