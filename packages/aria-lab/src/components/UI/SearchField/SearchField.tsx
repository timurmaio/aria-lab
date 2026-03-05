import {
  Button as AriaButton,
  Input,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  type ValidationResult,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'
import { FieldDescription, FieldErrorText, FieldLabel } from '../Field/index.js'

type SearchFieldSize = 'sm' | 'md' | 'lg'

const sizeStyles: Record<SearchFieldSize, string> = {
  sm: 'h-[var(--aria-control-height-sm)] text-xs',
  md: 'h-[var(--aria-control-height-md)] text-sm',
  lg: 'h-[var(--aria-control-height-lg)] text-lg',
}

const fieldBase =
  'flex w-full items-center gap-2 overflow-hidden rounded-[var(--aria-radius-md)] border border-[var(--aria-border)] bg-[var(--aria-bg-primary)] pl-3 pr-1 transition duration-200 focus-within:shadow-[var(--aria-focus-ring)] hover:border-[var(--aria-border-hover)] data-[invalid]:border-[var(--aria-error)]'

const inputBase =
  'min-w-0 flex-1 border-0 bg-transparent py-2 text-[var(--aria-text-primary)] outline-none placeholder:text-[var(--aria-text-secondary)] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none'

const clearButtonBase =
  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--aria-text-secondary)] transition hover:bg-[var(--aria-bg-hover)] hover:text-[var(--aria-text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aria-accent)]'

export interface SearchFieldProps extends Omit<AriaSearchFieldProps, 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  placeholder?: string
  size?: SearchFieldSize
}

export function SearchField({
  label,
  description,
  errorMessage,
  placeholder,
  size = 'md',
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      className={composeClassName(props.className, () => 'flex flex-col gap-1.5')}
    >
      {label != null && <FieldLabel>{label}</FieldLabel>}
      <div className={cn(fieldBase, sizeStyles[size])}>
        <svg
          aria-hidden
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 text-[var(--aria-text-secondary)]"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <Input className={inputBase} placeholder={placeholder} />
        <AriaButton className={clearButtonBase} aria-label="Clear search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </AriaButton>
      </div>
      {description != null && <FieldDescription>{description}</FieldDescription>}
      <FieldErrorText>{errorMessage}</FieldErrorText>
    </AriaSearchField>
  )
}
