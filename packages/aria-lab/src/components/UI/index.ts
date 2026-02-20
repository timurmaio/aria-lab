import { Button, type ButtonProps } from './Button';
import { Input, InputGroup, InputAddon, type InputProps, type InputGroupProps, type InputAddonProps } from './Input';

export const UI = {
  Button,
  Input,
  InputGroup,
  InputAddon,
} as const;

export type UI = {
  Button: typeof Button;
  Input: typeof Input;
  InputGroup: typeof InputGroup;
  InputAddon: typeof InputAddon;
};

export {
  Button,
  Input,
  InputGroup,
  InputAddon,
};

export type {
  ButtonProps,
  InputProps,
  InputGroupProps,
  InputAddonProps,
};
