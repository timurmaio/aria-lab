import { useState, useId } from 'react'
import {
  AlertDialog,
  Button,
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
  Select,
  SelectItem,
  TextField,
  UIListBox,
  UIPicker,
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
}: { label?: string; full?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={`demo-card${full ? ' demo-card-full' : ''} ${className}`}>
      {label && <div className="demo-card-label">{label}</div>}
      {children}
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

export function Components() {
  const [inputVal, setInputVal] = useState('')
  const [inputWithAddon, setInputWithAddon] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const single = useListState({ items: ELEMENTS, selectionMode: 'single' })
  const multi = useListState({ items: ELEMENTS, selectionMode: 'multiple' })
  const wdis = useListState({ items: ELEMENTS_W_DISABLED, selectionMode: 'multiple' })

  return (
    <main id="demo-main" className="demo-main">
      {/* 01 BUTTON */}
      <section className="demo-section" style={{ animationDelay: '80ms' }}>
        <SectionHead num="01" title="Button" description="Versatile button component with multiple variants, sizes, and states." />
        <ComponentGrid>
          <Card label="Variants" full>
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
      <section className="demo-section" style={{ animationDelay: '160ms' }}>
        <SectionHead num="02" title="Input" description="Text input with variants, sizes, and addon support." />
        <ComponentGrid>
          <Card label="Default">
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

      {/* 03 FIELD */}
      <section className="demo-section" style={{ animationDelay: '200ms' }}>
        <SectionHead num="03" title="Field" description="Form field primitives for labels, descriptions, and error messages." />
        <ComponentGrid>
          <Card label="Basic Field"><FieldBasicDemo /></Card>
          <Card label="With Error"><FieldErrorDemo /></Card>
          <Card label="Required Field"><FieldRequiredDemo /></Card>
        </ComponentGrid>
      </section>

      {/* 04 TEXTFIELD */}
      <section className="demo-section" style={{ animationDelay: '240ms' }}>
        <SectionHead num="04" title="TextField" description="Complete form field with label, input, and helper text." />
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

      {/* 05 SELECT */}
      <section className="demo-section" style={{ animationDelay: '280ms' }}>
        <SectionHead num="05" title="Select" description="Dropdown selection with single and multiple choice support." />
        <ComponentGrid>
          <Card label="Single Select">
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

      {/* 06 COMBOBOX */}
      <section className="demo-section" style={{ animationDelay: '320ms' }}>
        <SectionHead num="06" title="ComboBox" description="Searchable dropdown with autocomplete functionality." />
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

      {/* 07 POPOVER */}
      <section className="demo-section" style={{ animationDelay: '360ms' }}>
        <SectionHead num="07" title="Popover" description="Floating content panel for menus, tooltips, and dropdowns." />
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

      {/* 08 DIALOG */}
      <section className="demo-section" style={{ animationDelay: '400ms' }}>
        <SectionHead num="08" title="Dialog & Modal" description="Modal dialogs for confirmations, forms, and complex interactions." />
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

      {/* 09 DROPDOWN */}
      <section className="demo-section" style={{ animationDelay: '440ms' }}>
        <SectionHead num="09" title="Dropdown" description="List items for menus and selection lists with keyboard navigation." />
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

      {/* 10 UI LIST BOX */}
      <section className="demo-section" style={{ animationDelay: '480ms' }}>
        <SectionHead num="10" title="UIListBox" description="Accessible listbox with single and multiple selection modes." />
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

      {/* 11 UI PICKER */}
      <section className="demo-section" style={{ animationDelay: '520ms' }}>
        <SectionHead num="11" title="UIPicker" description="Command palette style picker with search and filtering." />
        <ComponentGrid>
          <Card label="Picker" full>
            <div className="demo-row">
              <Button variant="secondary" onPress={() => setShowPicker(!showPicker)}>{showPicker ? 'Hide Picker' : 'Show Picker'}</Button>
            </div>
            {showPicker && <div className="demo-picker-wrapper"><UIPicker /></div>}
          </Card>
        </ComponentGrid>
      </section>

      {/* 12 DESIGN TOKENS */}
      <section className="demo-section" style={{ animationDelay: '560ms' }}>
        <SectionHead num="12" title="Design Tokens" description="CSS custom properties powering the entire design system." />
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
    </main>
  )
}
