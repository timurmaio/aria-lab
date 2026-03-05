import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'aria-lab'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs>
      <TabList aria-label="Settings">
        <Tab id="general">General</Tab>
        <Tab id="account">Account</Tab>
        <Tab id="security">Security</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="general">
          <p style={{ margin: 0, fontSize: 14 }}>General settings content goes here.</p>
        </TabPanel>
        <TabPanel id="account">
          <p style={{ margin: 0, fontSize: 14 }}>Account settings content goes here.</p>
        </TabPanel>
        <TabPanel id="security">
          <p style={{ margin: 0, fontSize: 14 }}>Security settings content goes here.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
}

export const WithFormContent: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Tabs>
        <TabList aria-label="Settings">
          <Tab id="general">General</Tab>
          <Tab id="notifications">Notifications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="general">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Display name</span>
                <input
                  type="text"
                  placeholder="Enter name"
                  style={{
                    padding: '8px 12px',
                    borderRadius: 6,
                    border: '1px solid #e5e7eb',
                  }}
                />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" />
                <span style={{ fontSize: 13 }}>Show email in profile</span>
              </label>
            </div>
          </TabPanel>
          <TabPanel id="notifications">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" defaultChecked />
                <span style={{ fontSize: 13 }}>Email notifications</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" />
                <span style={{ fontSize: 13 }}>Push notifications</span>
              </label>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  ),
}
