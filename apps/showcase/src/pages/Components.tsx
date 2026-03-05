import { useState, useId, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  AlertDialog,
  Button,
  Checkbox,
  CheckboxGroup,
  ComboBox,
  ComboBoxItem,
  Dialog,
  DialogTrigger,
  FieldDescription,
  FieldErrorText,
  FieldLabel,
  Heading,
  Input,
  InputAddon,
  InputGroup,
  Modal,
  Popover,
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
  UIListBox,
  UIPicker,
  useItemSelection,
  useListState,
} from 'aria-lab'
import {
  CURRENCIES,
  ELEMENTS,
  ELEMENTS_W_DISABLED,
  FRAMEWORKS,
  LANGUAGES,
  TOKENS,
} from '../data'
import { componentRegistry } from '../componentRegistry'
import { CodeBlock } from '../components/CodeBlock'

function SectionHead({ num, title, description }: { num: string; title: string; description?: string }) {
  return (
    <div className="demo-section-head">
      <div className="demo-section-header-row">
        <span className="demo-section-num">{num}</span>
        <span className="demo-section-title">{title}</span>
      </div>
      {description && <p className="demo-section-desc">{description}</p>}
    </div>
  )
}

function Card({
  label,
  full,
  children,
  className = '',
  code,
}: { label?: string; full?: boolean; children: React.ReactNode; className?: string; code?: string }) {
  return (
    <div className={`demo-card${full ? ' demo-card-full' : ''} ${className}`}>
      {label && <div className="demo-card-label">{label}</div>}
      {children}
      {code && (
        <div className="demo-card-code">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  )
}

function ComponentGrid({ children }: { children: React.ReactNode }) {
  return <div className="demo-grid">{children}</div>
}

function FieldBasicDemo() {
  const id = useId()
  return (
    <div className="demo-col">
      <FieldLabel id={id}>Email Address</FieldLabel>
      <Input placeholder="you@example.com" aria-labelledby={id} />
      <FieldDescription>We'll never share your email with anyone.</FieldDescription>
    </div>
  )
}
function FieldErrorDemo() {
  const id = useId()
  return (
    <div className="demo-col">
      <FieldLabel id={id}>Username</FieldLabel>
      <Input placeholder="johndoe" variant="error" aria-labelledby={id} />
      <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
    </div>
  )
}
function FieldRequiredDemo() {
  const id = useId()
  return (
    <div className="demo-col">
      <FieldLabel id={id}>
        Password <span className="demo-required">*</span>
      </FieldLabel>
      <Input type="password" placeholder="••••••••" aria-labelledby={id} />
      <FieldDescription>Must be at least 8 characters with a number.</FieldDescription>
    </div>
  )
}

function CustomListItemDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const items = [
    { id: 'a', name: 'Option A' },
    { id: 'b', name: 'Option B' },
    { id: 'c', name: 'Option C' },
  ]
  return (
    <div className="demo-lb-wrap">
      {items.map((item) => (
        <CustomItem
          key={item.id}
          item={item}
          selectedKeys={selected}
          onSelectionChange={(keys) => setSelected(new Set([...keys].map(String)))}
        />
      ))}
      {selected.size > 0 && (
        <div className="demo-selection-info">Selected: {Array.from(selected).join(', ')}</div>
      )}
    </div>
  )
}

function CustomItem({
  item,
  selectedKeys,
  onSelectionChange,
}: {
  item: { id: string; name: string }
  selectedKeys: Set<string>
  onSelectionChange: (keys: Iterable<string | number>) => void
}) {
  const { handleClick, isSelected } = useItemSelection({
    itemKey: item.id,
    selectionMode: 'single',
    selectedKeys,
    onSelectionChange,
  })
  return (
    <div
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{
        padding: '8px 12px',
        cursor: 'pointer',
        background: isSelected ? 'var(--aria-accent-subtle, rgba(59,130,246,0.1))' : 'transparent',
        borderRadius: '6px',
      }}
    >
      {item.name} {isSelected && '✓'}
    </div>
  )
}

export function Components() {
  const { componentId } = useParams<{ componentId?: string }>()
  const [inputVal, setInputVal] = useState('')
  const [inputWithAddon, setInputWithAddon] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const single = useListState({ items: ELEMENTS, selectionMode: 'single' })
  const multi = useListState({ items: ELEMENTS, selectionMode: 'multiple' })
  const wdis = useListState({ items: ELEMENTS_W_DISABLED, selectionMode: 'multiple' })

  useEffect(() => {
    if (componentId) {
      const el = document.getElementById(componentId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [componentId])

  return (
    <main id="demo-main" className="demo-main demo-main-with-toc">
      <aside className="demo-toc">
        <nav className="demo-toc-nav" aria-label="Component navigation">
          {componentRegistry.map(({ id, label }) => (
            <Link
              key={id}
              to={`/components/${id}`}
              className={`demo-toc-link ${componentId === id ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="demo-main-content">
      {/* 01 BUTTON */}
      <section id="button" className="demo-section" style={{ animationDelay: '80ms' }}>
        <SectionHead num="01" title="Button" description="Versatile button component with multiple variants, sizes, and states." />
        <ComponentGrid>
          <Card
            label="Variants"
            full
            code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
          >
            <div className="demo-row">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </Card>
          <Card label="Sizes">
            <div className="demo-row demo-row-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card>
          <Card label="Icon Buttons">
            <div className="demo-row demo-row-center">
              <Button size="icon-sm" variant="secondary" aria-label="Settings small">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 4a4 4 0 100 8 4 4 0 000-8z" /></svg>
              </Button>
              <Button size="icon" variant="secondary" aria-label="Settings medium">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 4a4 4 0 100 8 4 4 0 000-8z" /></svg>
              </Button>
              <Button size="icon-lg" variant="secondary" aria-label="Settings large">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 4a4 4 0 100 8 4 4 0 000-8z" /></svg>
              </Button>
            </div>
          </Card>
          <Card label="States">
            <div className="demo-row">
              <Button variant="primary" isDisabled>Disabled</Button>
              <Button variant="secondary" isDisabled>Disabled</Button>
              <Button variant="primary" isPending>Loading...</Button>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 02 INPUT */}
      <section id="input" className="demo-section" style={{ animationDelay: '160ms' }}>
        <SectionHead num="02" title="Input" description="Text input with variants, sizes, and addon support." />
        <ComponentGrid>
          <Card
            label="Default"
            code={`<Input
  placeholder="Type something..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  aria-label="Sample text input"
/>`}
          >
            <div className="demo-col">
              <Input placeholder="Type something..." value={inputVal} onChange={(e) => setInputVal(e.target.value)} aria-label="Sample text input" />
            </div>
          </Card>
          <Card label="Error State">
            <div className="demo-col">
              <Input placeholder="Invalid input" variant="error" defaultValue="error@example" aria-label="Invalid input example" />
            </div>
          </Card>
          <Card label="Disabled">
            <div className="demo-col">
              <Input placeholder="Disabled input" isDisabled defaultValue="Can't edit this" aria-label="Disabled input example" />
            </div>
          </Card>
          <Card label="Sizes">
            <div className="demo-col">
              <Input size="sm" placeholder="Small input" aria-label="Small size input" />
              <Input size="md" placeholder="Medium input" aria-label="Medium size input" />
              <Input size="lg" placeholder="Large input" aria-label="Large size input" />
            </div>
          </Card>
          <Card label="With Addons" full>
            <div className="demo-row">
              <InputGroup>
                <InputAddon position="left">$</InputAddon>
                <Input placeholder="0.00" value={inputWithAddon} onChange={(e) => setInputWithAddon(e.target.value)} style={{ paddingLeft: '32px' }} aria-label="Amount" />
              </InputGroup>
              <InputGroup>
                <Input placeholder="username" style={{ paddingRight: '80px' }} aria-label="Username" />
                <InputAddon position="right">@github.com</InputAddon>
              </InputGroup>
              <InputGroup>
                <InputAddon position="left">https://</InputAddon>
                <Input placeholder="example.com" style={{ paddingLeft: '60px' }} aria-label="Domain" />
              </InputGroup>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 03 INPUT GROUP & INPUT ADDON */}
      <section id="inputgroup" className="demo-section" style={{ animationDelay: '180ms' }}>
        <SectionHead num="03" title="InputGroup & InputAddon" description="Wrap Input with left or right addons (prefixes, suffixes)." />
        <ComponentGrid>
          <Card label="Left addon">
            <div className="demo-col">
              <InputGroup>
                <InputAddon position="left">€</InputAddon>
                <Input placeholder="0.00" style={{ paddingLeft: '36px' }} aria-label="Amount EUR" />
              </InputGroup>
            </div>
          </Card>
          <Card label="Right addon">
            <div className="demo-col">
              <InputGroup>
                <Input placeholder="yourname" style={{ paddingRight: '72px' }} aria-label="Username" />
                <InputAddon position="right">.dev</InputAddon>
              </InputGroup>
            </div>
          </Card>
          <Card label="Both sides" full>
            <div className="demo-row">
              <InputGroup>
                <InputAddon position="left">https://</InputAddon>
                <Input placeholder="domain.com" style={{ paddingLeft: '60px', paddingRight: '48px' }} aria-label="URL" />
                <InputAddon position="right">/path</InputAddon>
              </InputGroup>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 04 FIELD */}
      <section id="field" className="demo-section" style={{ animationDelay: '200ms' }}>
        <SectionHead num="04" title="Field" description="Form field primitives: FieldLabel, FieldDescription, FieldErrorText." />
        <ComponentGrid>
          <Card label="Basic Field"><FieldBasicDemo /></Card>
          <Card label="With Error"><FieldErrorDemo /></Card>
          <Card label="Required Field"><FieldRequiredDemo /></Card>
        </ComponentGrid>
      </section>

      {/* 05 TEXTFIELD */}
      <section id="textfield" className="demo-section" style={{ animationDelay: '240ms' }}>
        <SectionHead num="05" title="TextField" description="Complete form field with label, input, and helper text." />
        <ComponentGrid>
          <Card label="Basic">
            <div className="demo-col"><TextField label="Full Name" placeholder="John Doe" /></div>
          </Card>
          <Card label="With Description">
            <div className="demo-col"><TextField label="Email" placeholder="you@example.com" description="Used only for account notifications" /></div>
          </Card>
          <Card label="Required">
            <div className="demo-col"><TextField label="Company" placeholder="Acme Inc" isRequired /></div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 06 SELECT */}
      <section id="select" className="demo-section" style={{ animationDelay: '280ms' }}>
        <SectionHead num="06" title="Select" description="Dropdown selection with single and multiple choice support." />
        <ComponentGrid>
          <Card
            label="Single Select"
            code={`<Select label="Framework" placeholder="Choose framework" items={FRAMEWORKS}>
  {(item) => <SelectItem id={item.id} textValue={item.name}>{item.name}</SelectItem>}
</Select>`}
          >
            <div className="demo-col">
              <Select label="Framework" placeholder="Choose framework" items={FRAMEWORKS}>
                {(item) => <SelectItem id={item.id} textValue={item.name}>{item.name}</SelectItem>}
              </Select>
            </div>
          </Card>
          <Card label="With Description">
            <div className="demo-col">
              <Select label="Currency" placeholder="Select currency" description="Your preferred billing currency" items={CURRENCIES}>
                {(item) => <SelectItem id={item.id} textValue={item.name}>{item.name}</SelectItem>}
              </Select>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 07 COMBOBOX */}
      <section id="combobox" className="demo-section" style={{ animationDelay: '320ms' }}>
        <SectionHead num="07" title="ComboBox" description="Searchable dropdown with autocomplete functionality." />
        <ComponentGrid>
          <Card label="Basic">
            <div className="demo-col">
              <ComboBox label="Language" placeholder="Search language..." items={LANGUAGES}>
                {(item) => <ComboBoxItem id={item.id} textValue={item.name}>{item.name}</ComboBoxItem>}
              </ComboBox>
            </div>
          </Card>
          <Card label="With Description">
            <div className="demo-col">
              <ComboBox label="Framework" placeholder="Type to search..." description="Start typing to filter options" items={FRAMEWORKS}>
                {(item) => <ComboBoxItem id={item.id} textValue={item.name}>{item.name}</ComboBoxItem>}
              </ComboBox>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 08 POPOVER */}
      <section id="popover" className="demo-section" style={{ animationDelay: '360ms' }}>
        <SectionHead num="08" title="Popover" description="Floating content panel. Use with DialogTrigger." />
        <ComponentGrid>
          <Card label="Basic Popover">
            <div className="demo-row">
              <DialogTrigger>
                <Button variant="secondary">Open Popover</Button>
                <Popover>
                  <div className="demo-popover-content">
                    <h4>Popover Title</h4>
                    <p>This is a popover with some content inside.</p>
                  </div>
                </Popover>
              </DialogTrigger>
            </div>
          </Card>
          <Card label="With Actions">
            <div className="demo-row">
              <DialogTrigger>
                <Button variant="secondary">Confirm Action</Button>
                <Popover>
                  <div className="demo-popover-content">
                    <h4>Are you sure?</h4>
                    <p>This action cannot be undone.</p>
                    <div className="demo-popover-actions">
                      <Button size="sm" variant="ghost">Cancel</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </div>
                </Popover>
              </DialogTrigger>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 09 DIALOG, MODAL, ALERT DIALOG */}
      <section id="dialog" className="demo-section" style={{ animationDelay: '400ms' }}>
        <SectionHead num="09" title="Dialog, Modal, AlertDialog" description="Modal overlays. Use DialogTrigger + Modal + Dialog or AlertDialog." />
        <ComponentGrid>
          <Card label="Basic Dialog">
            <div className="demo-row">
              <DialogTrigger>
                <Button variant="secondary">Open Dialog</Button>
                <Modal>
                  <Dialog>
                    {({ close }) => (
                      <>
                        <Heading slot="title" className="text-lg font-semibold text-[var(--aria-text-primary)]">Team Invite</Heading>
                        <p className="mt-2 text-sm text-[var(--aria-text-secondary)]">Send an invite link so they can access this project.</p>
                        <div className="mt-6 flex justify-end gap-2">
                          <Button variant="secondary" onPress={close}>Cancel</Button>
                          <Button onPress={close}>Send invite</Button>
                        </div>
                      </>
                    )}
                  </Dialog>
                </Modal>
              </DialogTrigger>
            </div>
          </Card>
          <Card label="Alert Dialog">
            <div className="demo-row">
              <DialogTrigger>
                <Button variant="destructive">Delete Project</Button>
                <Modal>
                  <AlertDialog title="Delete project" actionLabel="Delete" variant="destructive">
                    Are you sure you want to delete this project? This action cannot be undone.
                  </AlertDialog>
                </Modal>
              </DialogTrigger>
            </div>
          </Card>
          <Card label="Form Dialog" full>
            <div className="demo-row">
              <DialogTrigger>
                <Button variant="secondary">Create User</Button>
                <Modal size="md">
                  <Dialog>
                    {({ close }) => (
                      <>
                        <Heading slot="title" className="text-lg font-semibold text-[var(--aria-text-primary)]">Create New User</Heading>
                        <div className="mt-4 space-y-4">
                          <TextField label="Full Name" placeholder="John Doe" autoFocus />
                          <TextField label="Email" placeholder="john@example.com" />
                          <Select label="Role" placeholder="Select role" items={[{ id: 'admin', name: 'Admin' }, { id: 'editor', name: 'Editor' }, { id: 'viewer', name: 'Viewer' }]}>
                            {(item) => <SelectItem id={item.id} textValue={item.name}>{item.name}</SelectItem>}
                          </Select>
                        </div>
                        <div className="mt-6 flex justify-end gap-2">
                          <Button variant="secondary" onPress={close}>Cancel</Button>
                          <Button onPress={close}>Create User</Button>
                        </div>
                      </>
                    )}
                  </Dialog>
                </Modal>
              </DialogTrigger>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 10 DROPDOWN (SelectItem / DropdownItem) */}
      <section id="dropdown" className="demo-section" style={{ animationDelay: '440ms' }}>
        <SectionHead num="10" title="DropdownItem" description="List item for Select/ComboBox. Rendered via SelectItem, ComboBoxItem." />
        <ComponentGrid>
          <Card label="Dropdown Menu (Select with DropdownItem)">
            <div className="demo-col">
              <Select label="Account" placeholder="Choose action" items={[{ id: '1', name: 'Account Settings' }, { id: '2', name: 'Billing' }, { id: '3', name: 'Notifications' }, { id: '4', name: 'Delete Account' }]} disabledKeys={new Set(['4'])}>
                {(item) => <SelectItem id={item.id} textValue={item.name}>{item.name}</SelectItem>}
              </Select>
            </div>
          </Card>
          <Card label="With Icons">
            <div className="demo-col">
              <Select label="Quick actions" placeholder="Select..." items={[{ id: '1', name: 'Profile' }, { id: '2', name: 'Settings' }, { id: '3', name: 'Help' }]}>
                {(item) => <SelectItem id={item.id} textValue={item.name}>{item.name}</SelectItem>}
              </Select>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 11 UI LIST BOX */}
      <section id="uilistbox" className="demo-section" style={{ animationDelay: '480ms' }}>
        <SectionHead num="11" title="UIListBox" description="Accessible listbox with single and multiple selection modes." />
        <ComponentGrid>
          <Card label="Single Selection">
            <div className="demo-lb-wrap">
              <UIListBox listId="lb-single" ariaLabel="Chemical elements" items={ELEMENTS} selectionMode="single" selectedKeys={single.selectedKeys} onSelectionChange={single.setSelectedKeys} />
            </div>
            {single.selectedKeys.size > 0 && <div className="demo-selection-info">Selected: {Array.from(single.selectedKeys).join(', ')}</div>}
          </Card>
          <Card label="Multiple Selection">
            <div className="demo-lb-wrap">
              <UIListBox listId="lb-multi" ariaLabel="Chemical elements (multiple)" items={ELEMENTS} selectionMode="multiple" selectedKeys={multi.selectedKeys} onSelectionChange={multi.setSelectedKeys} />
            </div>
            <div className="demo-lb-actions">
              <button className="demo-action-btn" onClick={multi.selectAll}>Select All</button>
              <button className="demo-action-btn" onClick={multi.deselectAll}>Clear</button>
            </div>
          </Card>
          <Card label="With Disabled Items">
            <div className="demo-lb-wrap">
              <UIListBox listId="lb-disabled" ariaLabel="Chemical elements (some disabled)" items={ELEMENTS_W_DISABLED} selectionMode="multiple" selectedKeys={wdis.selectedKeys} onSelectionChange={wdis.setSelectedKeys} />
            </div>
            <p style={{ fontSize: 11, color: 'var(--d-text-dim)', letterSpacing: '0.04em', marginTop: 8 }}>Lithium & Oxygen are disabled</p>
          </Card>
        </ComponentGrid>
      </section>

      {/* 12 UI PICKER */}
      <section id="uipicker" className="demo-section" style={{ animationDelay: '520ms' }}>
        <SectionHead num="12" title="UIPicker" description="Command palette style picker with search and filtering." />
        <ComponentGrid>
          <Card label="Picker" full>
            <div className="demo-row">
              <Button variant="secondary" onPress={() => setShowPicker(!showPicker)}>{showPicker ? 'Hide Picker' : 'Show Picker'}</Button>
            </div>
            {showPicker && <div className="demo-picker-wrapper"><UIPicker /></div>}
          </Card>
        </ComponentGrid>
      </section>

      {/* 13 HOOKS */}
      <section id="hooks" className="demo-section" style={{ animationDelay: '540ms' }}>
        <SectionHead num="13" title="Hooks" description="useListState, useItemSelection — state management for list components." />
        <ComponentGrid>
          <Card label="useListState" full>
            <div className="demo-col">
              <p style={{ fontSize: 13, color: 'var(--d-text-mid)', marginBottom: 12 }}>
                Manages items, selectedKeys, and provides setSelectedKeys, selectAll, deselectAll. Used by UIListBox demos above.
              </p>
              <div className="demo-lb-wrap">
                <UIListBox
                  listId="lb-hooks"
                  ariaLabel="useListState demo"
                  items={ELEMENTS.slice(0, 4)}
                  selectionMode="single"
                  selectedKeys={single.selectedKeys}
                  onSelectionChange={single.setSelectedKeys}
                />
              </div>
              {single.selectedKeys.size > 0 && (
                <div className="demo-selection-info">selectedKeys: [{Array.from(single.selectedKeys).join(', ')}]</div>
              )}
            </div>
          </Card>
          <Card label="useItemSelection" full>
            <div className="demo-col">
              <p style={{ fontSize: 13, color: 'var(--d-text-mid)', marginBottom: 12 }}>
                Low-level hook for custom list items. Returns handleClick, isSelected.
              </p>
              <CustomListItemDemo />
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 15 CHECKBOX */}
      <section id="checkbox" className="demo-section" style={{ animationDelay: '560ms' }}>
        <SectionHead num="15" title="Checkbox" description="Single and group checkboxes for multi-select options." />
        <ComponentGrid>
          <Card label="Single Checkbox" code={`<Checkbox>Accept terms</Checkbox>`}>
            <div className="demo-col">
              <Checkbox>Accept terms</Checkbox>
              <Checkbox defaultSelected>Subscribe to newsletter</Checkbox>
              <Checkbox isIndeterminate>Select all</Checkbox>
            </div>
          </Card>
          <Card label="CheckboxGroup" code={`<CheckboxGroup label="Preferences" defaultValue={['email']}>
  <Checkbox value="email">Email</Checkbox>
  <Checkbox value="sms">SMS</Checkbox>
  <Checkbox value="push">Push</Checkbox>
</CheckboxGroup>`}>
            <div className="demo-col">
              <CheckboxGroup label="Preferences" defaultValue={['email']}>
                <Checkbox value="email">Email</Checkbox>
                <Checkbox value="sms">SMS</Checkbox>
                <Checkbox value="push">Push</Checkbox>
              </CheckboxGroup>
            </div>
          </Card>
          <Card label="Horizontal" full>
            <div className="demo-col">
              <CheckboxGroup label="Notify via" orientation="horizontal" defaultValue={['email']}>
                <Checkbox value="email">Email</Checkbox>
                <Checkbox value="sms">SMS</Checkbox>
                <Checkbox value="push">Push</Checkbox>
              </CheckboxGroup>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 16 RADIO */}
      <section id="radio" className="demo-section" style={{ animationDelay: '580ms' }}>
        <SectionHead num="16" title="Radio" description="Radio group for single selection from mutually exclusive options." />
        <ComponentGrid>
          <Card label="RadioGroup" code={`<RadioGroup label="Size" defaultValue="m">
  <Radio value="s">Small</Radio>
  <Radio value="m">Medium</Radio>
  <Radio value="l">Large</Radio>
</RadioGroup>`}>
            <div className="demo-col">
              <RadioGroup label="Size" defaultValue="m">
                <Radio value="s">Small</Radio>
                <Radio value="m">Medium</Radio>
                <Radio value="l">Large</Radio>
              </RadioGroup>
            </div>
          </Card>
          <Card label="Horizontal">
            <div className="demo-col">
              <RadioGroup label="Theme" defaultValue="light" orientation="horizontal">
                <Radio value="light">Light</Radio>
                <Radio value="dark">Dark</Radio>
                <Radio value="system">System</Radio>
              </RadioGroup>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 17 TABS */}
      <section id="tabs" className="demo-section" style={{ animationDelay: '600ms' }}>
        <SectionHead num="17" title="Tabs" description="Tabbed interface for organizing content into sections." />
        <ComponentGrid>
          <Card label="Basic Tabs" full code={`<Tabs>
  <TabList aria-label="Settings">
    <Tab id="general">General</Tab>
    <Tab id="account">Account</Tab>
    <Tab id="security">Security</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="general">General settings...</TabPanel>
    <TabPanel id="account">Account settings...</TabPanel>
    <TabPanel id="security">Security settings...</TabPanel>
  </TabPanels>
</Tabs>`}>
            <div className="demo-col" style={{ minWidth: 280 }}>
              <Tabs>
                <TabList aria-label="Settings">
                  <Tab id="general">General</Tab>
                  <Tab id="account">Account</Tab>
                  <Tab id="security">Security</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel id="general">
                    <p style={{ fontSize: 13, color: 'var(--d-text-dim)' }}>General settings content goes here.</p>
                  </TabPanel>
                  <TabPanel id="account">
                    <p style={{ fontSize: 13, color: 'var(--d-text-dim)' }}>Account settings content goes here.</p>
                  </TabPanel>
                  <TabPanel id="security">
                    <p style={{ fontSize: 13, color: 'var(--d-text-dim)' }}>Security settings content goes here.</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 18 SWITCH */}
      <section id="switch" className="demo-section" style={{ animationDelay: '620ms' }}>
        <SectionHead num="18" title="Switch" description="Toggle switch for on/off settings." />
        <ComponentGrid>
          <Card label="Basic Switch" code={`<Switch>Enable notifications</Switch>`}>
            <div className="demo-col">
              <Switch>Enable notifications</Switch>
              <Switch defaultSelected>Dark mode</Switch>
              <Switch isDisabled>Disabled</Switch>
            </div>
          </Card>
        </ComponentGrid>
      </section>

      {/* 19 DESIGN TOKENS */}
      <section id="tokens" className="demo-section" style={{ animationDelay: '640ms' }}>
        <SectionHead num="14" title="Design Tokens" description="CSS custom properties powering the entire design system." />
        <div className="demo-tokens">
          {TOKENS.map((t) => (
            <div key={t.var} className="demo-token">
              <div className="demo-token-swatch" style={{ background: `var(${t.var})` }} />
              <div className="demo-token-info">
                <span className="demo-token-name">{t.var}</span>
                <span className="demo-token-label">{t.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </main>
  )
}
