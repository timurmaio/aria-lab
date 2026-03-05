import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TextField,
} from 'aria-lab'

const meta: Meta = {
  title: 'Examples/Form',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const roleOptions = [
  { id: 'admin', name: 'Administrator' },
  { id: 'editor', name: 'Editor' },
  { id: 'viewer', name: 'Viewer' },
]

export const MultiStepForm: Story = {
  render: function MultiStepFormStory() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      role: '',
      notifications: [] as string[],
      theme: 'light',
      terms: false,
      marketing: false,
    })

    return (
      <div style={{ width: 420 }}>
        <Tabs selectedKey={String(step)} onSelectionChange={(k) => setStep(Number(k))}>
          <TabList aria-label="Form steps">
            <Tab id="1">Step 1</Tab>
            <Tab id="2">Step 2</Tab>
            <Tab id="3">Step 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="1">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Account details</h3>
                <TextField
                  label="Full name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(v) => setFormData((d) => ({ ...d, name: v }))}
                />
                <TextField
                  label="Email"
                  placeholder="john@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(v) => setFormData((d) => ({ ...d, email: v }))}
                />
                <Button onPress={() => setStep(2)}>Next</Button>
              </div>
            </TabPanel>
            <TabPanel id="2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Preferences</h3>
                <Select
                  label="Role"
                  placeholder="Select role"
                  selectedKey={formData.role || undefined}
                  onSelectionChange={(k) => setFormData((d) => ({ ...d, role: k != null ? String(k) : '' }))}
                  items={roleOptions}
                >
                  {(item) => <SelectItem id={item.id} textValue={item.name}>{item.name}</SelectItem>}
                </Select>
                <RadioGroup
                  label="Theme"
                  value={formData.theme}
                  onChange={(v) => setFormData((d) => ({ ...d, theme: v }))}
                >
                  <Radio value="light">Light</Radio>
                  <Radio value="dark">Dark</Radio>
                  <Radio value="system">System</Radio>
                </RadioGroup>
                <CheckboxGroup
                  label="Notifications"
                  value={formData.notifications}
                  onChange={(v) => setFormData((d) => ({ ...d, notifications: v }))}
                >
                  <Checkbox value="email">Email</Checkbox>
                  <Checkbox value="push">Push</Checkbox>
                  <Checkbox value="sms">SMS</Checkbox>
                </CheckboxGroup>
                <div style={{ display: 'flex', gap: 16 }}>
                  <Button variant="secondary" onPress={() => setStep(1)}>Back</Button>
                  <Button onPress={() => setStep(3)}>Next</Button>
                </div>
              </div>
            </TabPanel>
            <TabPanel id="3">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>Review & submit</h3>
                <div style={{ fontSize: 13, color: '#666' }}>
                  <p style={{ margin: '0 0 8px' }}><strong>Name:</strong> {formData.name || '—'}</p>
                  <p style={{ margin: '0 0 8px' }}><strong>Email:</strong> {formData.email || '—'}</p>
                  <p style={{ margin: '0 0 8px' }}><strong>Role:</strong> {formData.role || '—'}</p>
                  <p style={{ margin: '0 0 8px' }}><strong>Theme:</strong> {formData.theme}</p>
                </div>
                <Checkbox
                  isSelected={formData.terms}
                  onChange={(v) => setFormData((d) => ({ ...d, terms: v }))}
                >
                  I agree to the terms and conditions
                </Checkbox>
                <Switch
                  isSelected={formData.marketing}
                  onChange={(v) => setFormData((d) => ({ ...d, marketing: v }))}
                >
                  Send me marketing emails
                </Switch>
                <div style={{ display: 'flex', gap: 16 }}>
                  <Button variant="secondary" onPress={() => setStep(2)}>Back</Button>
                  <Button isDisabled={!formData.terms} onPress={() => alert('Submitted!')}>
                    Submit
                  </Button>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    )
  },
}

export const ManyFields: Story = {
  render: () => (
    <div style={{ width: 400, maxWidth: '100%' }}>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <TextField label="First name" placeholder="John" isRequired />
        <TextField label="Last name" placeholder="Doe" isRequired />
        <TextField label="Email" placeholder="john@example.com" type="email" />
        <TextField label="Phone" placeholder="+1 (555) 000-0000" />
        <Select label="Country" placeholder="Select country" items={[{ id: 'us', name: 'United States' }, { id: 'uk', name: 'United Kingdom' }]}>
          {(item) => <SelectItem id={item.id} textValue={item.name}>{item.name}</SelectItem>}
        </Select>
        <RadioGroup label="Account type" defaultValue="personal">
          <Radio value="personal">Personal</Radio>
          <Radio value="business">Business</Radio>
        </RadioGroup>
        <CheckboxGroup label="Interests" defaultValue={['dev']}>
          <Checkbox value="dev">Development</Checkbox>
          <Checkbox value="design">Design</Checkbox>
          <Checkbox value="product">Product</Checkbox>
        </CheckboxGroup>
        <Switch defaultSelected>Subscribe to newsletter</Switch>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button type="submit">Submit</Button>
          <Button variant="secondary" type="button">Cancel</Button>
        </div>
      </form>
    </div>
  ),
}
