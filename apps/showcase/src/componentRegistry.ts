export const componentRegistry = [
  { id: 'button', label: 'Button' },
  { id: 'input', label: 'Input' },
  { id: 'inputgroup', label: 'InputGroup' },
  { id: 'field', label: 'Field' },
  { id: 'textfield', label: 'TextField' },
  { id: 'select', label: 'Select' },
  { id: 'combobox', label: 'ComboBox' },
  { id: 'popover', label: 'Popover' },
  { id: 'dialog', label: 'Dialog' },
  { id: 'dropdown', label: 'DropdownItem' },
  { id: 'uilistbox', label: 'UIListBox' },
  { id: 'uipicker', label: 'UIPicker' },
  { id: 'hooks', label: 'Hooks' },
  { id: 'tokens', label: 'Design Tokens' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'radio', label: 'Radio' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'switch', label: 'Switch' },
] as const

export type ComponentId = (typeof componentRegistry)[number]['id']
