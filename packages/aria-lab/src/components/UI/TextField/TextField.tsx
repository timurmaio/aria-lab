import {
  Input,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'
import { FieldDescription, FieldErrorText, FieldLabel } from '../Field/index.js'

type TextFieldSize = 'sm' | 'md' | 'lg'
type TextFieldVariant = 'default' | 'error'

const sizeStyles: Record<TextFieldSize, string> = {
  sm: 'h-[var(--aria-control-height-sm)] px-2 text-xs',
  md: 'h-[var(--aria-control-height-md)] px-3 text-sm',
  lg: 'h-[var(--aria-control-height-lg)] px-4 text-lg',
}

const inputBaseStyles =
  'flex w-full rounded-[var(--aria-radius-md)] border text-[var(--aria-text-primary)] transition duration-200 ease-out outline-none placeholder:text-[var(--aria-text-secondary)] focus-visible:shadow-[var(--aria-focus-ring)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--aria-bg-disabled)] disabled:text-[var(--aria-text-disabled)]'

const variantStyles: Record<TextFieldVariant, string> = {
  default:
    'border-[var(--aria-border)] bg-[var(--aria-bg-primary)] hover:border-[var(--aria-border-hover)]',
  error: 'border-[var(--aria-error)] bg-[var(--aria-bg-primary)]',
}

export interface TextFieldProps extends Omit<AriaTextFieldProps, 'size'> {
  label?: string
  description?: string
  placeholder?: string
  size?: TextFieldSize
  variant?: TextFieldVariant
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function TextField({
  label,
  description,
  placeholder,
  errorMessage,
  size = 'md',
  variant = 'default',
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={composeClassName(props.className, () => 'flex flex-col gap-1.5')}
    >
      {label && <FieldLabel>{label}</FieldLabel>}
      <Input
        placeholder={placeholder}
        className={composeClassName(undefined, ({ isInvalid }: { isInvalid: boolean }) =>
          cn(
            inputBaseStyles,
            sizeStyles[size],
            variant === 'error' || isInvalid ? variantStyles.error : variantStyles.default,
          ),
        )}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldErrorText>{errorMessage}</FieldErrorText>
    </AriaTextField>
  )
}
