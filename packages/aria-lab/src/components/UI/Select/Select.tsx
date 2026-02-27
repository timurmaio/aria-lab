import { type ReactNode } from 'react'
import {
  Button,
  ListBox,
  Select as AriaSelect,
  SelectValue,
  type SelectProps as AriaSelectProps,
  type ValidationResult,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'
import { DropdownItem, type DropdownItemProps } from '../Dropdown/index.js'
import { FieldDescription, FieldErrorText, FieldLabel } from '../Field/index.js'
import { Popover } from '../Popover/index.js'

type SelectVariant = 'default' | 'error'
type SelectSize = 'sm' | 'md' | 'lg'

const triggerBaseStyles =
  'flex w-full min-w-[180px] items-center gap-3 rounded-[var(--aria-radius-md)] border px-3 text-left outline-none transition duration-200 ease-out focus-visible:shadow-[var(--aria-focus-ring)] data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:bg-[var(--aria-bg-disabled)] data-[disabled]:text-[var(--aria-text-disabled)]'

const triggerSizeStyles: Record<SelectSize, string> = {
  sm: 'h-[var(--aria-control-height-sm)] text-xs',
  md: 'h-[var(--aria-control-height-md)] text-sm',
  lg: 'h-[var(--aria-control-height-lg)] text-lg',
}

const triggerVariantStyles: Record<SelectVariant, string> = {
  default:
    'border-[var(--aria-border)] bg-[var(--aria-bg-primary)] text-[var(--aria-text-primary)] hover:border-[var(--aria-border-hover)] hover:bg-[var(--aria-bg-hover)]',
  error: 'border-[var(--aria-error)] bg-[var(--aria-bg-primary)] text-[var(--aria-text-primary)]',
}

export interface SelectProps<T extends object> extends Omit<AriaSelectProps<T>, 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  placeholder?: string
  variant?: SelectVariant
  size?: SelectSize
  items?: Iterable<T>
  children: ReactNode | ((item: T) => ReactNode)
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  placeholder,
  variant = 'default',
  size = 'md',
  items,
  children,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect
      {...props}
      className={composeClassName(props.className, () => 'group flex flex-col gap-1.5')}
    >
      {label && <FieldLabel>{label}</FieldLabel>}
      <Button className={cn(triggerBaseStyles, triggerSizeStyles[size], triggerVariantStyles[variant])}>
        <SelectValue className="flex-1 truncate text-[var(--aria-text-primary)]">
          {({ selectedText }) => selectedText ?? placeholder}
        </SelectValue>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-[var(--aria-text-secondary)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldErrorText>{errorMessage}</FieldErrorText>
      <Popover className="min-w-[var(--trigger-width)]">
        <ListBox items={items} className="max-h-72 overflow-auto outline-none">
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}

export type SelectItemProps = DropdownItemProps

export function SelectItem(props: SelectItemProps) {
  return <DropdownItem {...props} />
}
