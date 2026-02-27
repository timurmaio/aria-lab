import { type ReactNode } from 'react'
import {
  Button,
  ComboBox as AriaComboBox,
  Input,
  ListBox,
  type ComboBoxProps as AriaComboBoxProps,
  type ValidationResult,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'
import { DropdownItem, type DropdownItemProps } from '../Dropdown/index.js'
import { FieldDescription, FieldErrorText, FieldLabel } from '../Field/index.js'
import { Popover } from '../Popover/index.js'

type ComboBoxVariant = 'default' | 'error'
type ComboBoxSize = 'sm' | 'md' | 'lg'

const fieldBaseStyles =
  'group flex w-full min-w-[180px] items-center gap-1 rounded-[var(--aria-radius-md)] border pe-1 ps-2 transition duration-200 ease-out focus-within:shadow-[var(--aria-focus-ring)]'

const fieldSizeStyles: Record<ComboBoxSize, string> = {
  sm: 'h-[var(--aria-control-height-sm)] text-xs',
  md: 'h-[var(--aria-control-height-md)] text-sm',
  lg: 'h-[var(--aria-control-height-lg)] text-lg',
}

const fieldVariantStyles: Record<ComboBoxVariant, string> = {
  default:
    'border-[var(--aria-border)] bg-[var(--aria-bg-primary)] hover:border-[var(--aria-border-hover)] hover:bg-[var(--aria-bg-hover)]',
  error: 'border-[var(--aria-error)] bg-[var(--aria-bg-primary)]',
}

const inputStyles =
  'h-full flex-1 bg-transparent px-1 text-[var(--aria-text-primary)] outline-none placeholder:text-[var(--aria-text-secondary)] disabled:pointer-events-none disabled:text-[var(--aria-text-disabled)]'

const buttonStyles =
  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--aria-radius-sm)] text-[var(--aria-text-secondary)] outline-none transition hover:bg-[var(--aria-bg-hover)] focus-visible:shadow-[var(--aria-focus-ring)] disabled:pointer-events-none disabled:text-[var(--aria-text-disabled)]'

const buttonSizeStyles: Record<ComboBoxSize, string> = {
  sm: 'h-6 w-6',
  md: 'h-7 w-7',
  lg: 'h-8 w-8',
}

export interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, 'children' | 'placeholder'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  placeholder?: string
  variant?: ComboBoxVariant
  size?: ComboBoxSize
  items?: Iterable<T>
  children: ReactNode | ((item: T) => ReactNode)
}

export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  placeholder,
  variant = 'default',
  size = 'md',
  items,
  children,
  ...props
}: ComboBoxProps<T>) {
  return (
    <AriaComboBox
      {...props}
      className={composeClassName(props.className, () => 'group flex flex-col gap-1.5')}
    >
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className={cn(fieldBaseStyles, fieldSizeStyles[size], fieldVariantStyles[variant])}>
        <Input placeholder={placeholder} className={inputStyles} />
        <Button className={cn(buttonStyles, buttonSizeStyles[size])}>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </div>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldErrorText>{errorMessage}</FieldErrorText>
      <Popover className="min-w-[var(--trigger-width)]">
        <ListBox items={items} className="max-h-72 overflow-auto outline-none">
          {children}
        </ListBox>
      </Popover>
    </AriaComboBox>
  )
}

export type ComboBoxItemProps = DropdownItemProps

export function ComboBoxItem(props: ComboBoxItemProps) {
  return <DropdownItem {...props} />
}
