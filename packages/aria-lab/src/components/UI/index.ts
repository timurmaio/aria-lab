import { Button, type ButtonProps } from './Button';
import { Input, InputGroup, InputAddon, type InputProps, type InputGroupProps, type InputAddonProps } from './Input';
import { TextField, type TextFieldProps } from './TextField';
import { Select, SelectItem, type SelectProps, type SelectItemProps } from './Select';
import { ComboBox, ComboBoxItem, type ComboBoxProps, type ComboBoxItemProps } from './ComboBox';
import { Dialog, Modal, AlertDialog, type DialogProps, type ModalProps, type AlertDialogProps } from './Dialog';
import { Checkbox, CheckboxGroup, type CheckboxProps, type CheckboxGroupProps } from './Checkbox';
import { Radio, RadioGroup, type RadioProps, type RadioGroupProps } from './Radio';
import { Tabs, TabList, Tab, TabPanels, TabPanel, type TabsProps, type TabListProps, type TabProps, type TabPanelProps } from './Tabs';
import { Switch, type SwitchProps } from './Switch';

export const UI = {
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
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Switch,
} as const;

export type UI = {
  Button: typeof Button;
  Input: typeof Input;
  InputGroup: typeof InputGroup;
  InputAddon: typeof InputAddon;
  TextField: typeof TextField;
  Select: typeof Select;
  SelectItem: typeof SelectItem;
  ComboBox: typeof ComboBox;
  ComboBoxItem: typeof ComboBoxItem;
  Dialog: typeof Dialog;
  Modal: typeof Modal;
  AlertDialog: typeof AlertDialog;
  Checkbox: typeof Checkbox;
  CheckboxGroup: typeof CheckboxGroup;
  Radio: typeof Radio;
  RadioGroup: typeof RadioGroup;
  Tabs: typeof Tabs;
  TabList: typeof TabList;
  Tab: typeof Tab;
  TabPanels: typeof TabPanels;
  TabPanel: typeof TabPanel;
  Switch: typeof Switch;
};

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
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Switch,
};

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
  CheckboxProps,
  CheckboxGroupProps,
  RadioProps,
  RadioGroupProps,
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelProps,
  SwitchProps,
};
