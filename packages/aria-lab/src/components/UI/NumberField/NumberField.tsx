import {
  Button as AriaButton,
  Group,
  Input,
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  type ValidationResult,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'
import { FieldDescription, FieldErrorText, FieldLabel } from '../Field/index.js'

type NumberFieldSize = 'sm' | 'md' | 'lg'

const sizeStyles: Record<NumberFieldSize, string> = {
  sm: 'h-[var(--aria-control-height-sm)] text-xs',
  md: 'h-[var(--aria-control-height-md)] text-sm',
  lg: 'h-[var(--aria-control-height-lg)] text-lg',
}

const inputBase =
  'flex-1 min-w-0 border-0 bg-transparent px-3 text-[var(--aria-text-primary)] outline-none focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'

const groupBase =
  'flex w-fit items-stretch overflow-hidden rounded-[var(--aria-radius-md)] border border-[var(--aria-border)] bg-[var(--aria-bg-primary)] transition duration-200 focus-within:shadow-[var(--aria-focus-ring)] hover:border-[var(--aria-border-hover)] data-[invalid]:border-[var(--aria-error)]'

const buttonBase =
  'flex shrink-0 items-center justify-center border-l border-[var(--aria-border)] bg-[var(--aria-bg-secondary)] px-2 text-[var(--aria-text-secondary)] transition hover:bg-[var(--aria-bg-hover)] hover:text-[var(--aria-text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--aria-accent)] disabled:opacity-50'

export interface NumberFieldProps extends Omit<AriaNumberFieldProps, 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  placeholder?: string
  size?: NumberFieldSize
}

export function NumberField({
  label,
  description,
  errorMessage,
  placeholder,
  size = 'md',
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField
      {...props}
      className={composeClassName(props.className, () => 'flex flex-col gap-1.5')}
    >
      {label != null && <FieldLabel>{label}</FieldLabel>}
      <Group className={composeClassName(undefined, () => cn(groupBase, sizeStyles[size]))}>
        <Input className={inputBase} placeholder={placeholder} />
        <AriaButton slot="decrement" className={buttonBase} aria-label="Decrement">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15H6" />
          </svg>
        </AriaButton>
        <AriaButton slot="increment" className={buttonBase} aria-label="Increment">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 15l6-6 6 6" />
          </svg>
        </AriaButton>
      </Group>
      {description != null && <FieldDescription>{description}</FieldDescription>}
      <FieldErrorText>{errorMessage}</FieldErrorText>
    </AriaNumberField>
  )
}
