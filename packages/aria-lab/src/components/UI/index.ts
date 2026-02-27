import { Button, type ButtonProps } from './Button';
import { Input, InputGroup, InputAddon, type InputProps, type InputGroupProps, type InputAddonProps } from './Input';
import { TextField, type TextFieldProps } from './TextField';
import { Select, SelectItem, type SelectProps, type SelectItemProps } from './Select';
import { ComboBox, ComboBoxItem, type ComboBoxProps, type ComboBoxItemProps } from './ComboBox';
import { Dialog, Modal, AlertDialog, type DialogProps, type ModalProps, type AlertDialogProps } from './Dialog';

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
};
