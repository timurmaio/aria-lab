export { UI } from './components/UI';
export type { UI as UIComponents } from './components/UI';

// UI Components
export {
  Button,
  Input,
  InputGroup,
  InputAddon,
  TextField,
  Select,
  SelectItem,
  ComboBox,
  ComboBoxItem,
  Dialog,
  Modal,
  AlertDialog,
} from './components/UI';
export type {
  ButtonProps,
  InputProps,
  InputGroupProps,
  InputAddonProps,
  TextFieldProps,
  SelectProps,
  SelectItemProps,
  ComboBoxProps,
  ComboBoxItemProps,
  DialogProps,
  ModalProps,
  AlertDialogProps,
} from './components/UI';

// Field Components
export {
  FieldLabel,
  FieldDescription,
  FieldErrorText,
} from './components/UI/Field';

// Popover Component
export {
  Popover,
} from './components/UI/Popover';
export type {
  PopoverProps,
} from './components/UI/Popover';

// Dropdown Component
export {
  DropdownItem,
} from './components/UI/Dropdown';
export type {
  DropdownItemProps,
} from './components/UI/Dropdown';

// Re-export React Aria Components for convenience
export {
  DialogTrigger,
  Heading,
  Text,
} from 'react-aria-components';

// UIListBox
export { UIListBox } from './components/UIListBox';
export type {
  UIListBoxProps,
  UIListItem,
  Key,
  SelectionMode,
  Selection,
} from './components/UIListBox/types';

export { useListState, useItemSelection } from './components/UIListBox';
export type { ListStateReturn } from './components/UIListBox';

// UIPicker
export { UIPicker } from './components/UIPicker';
