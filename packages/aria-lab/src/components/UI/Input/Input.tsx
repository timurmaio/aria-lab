import { type ReactNode } from 'react'
import { Input as AriaInput, type InputProps as AriaInputProps } from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

type InputVariant = 'default' | 'error'
type InputSize = 'sm' | 'md' | 'lg'

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-[var(--aria-control-height-sm)] px-2 text-xs',
  md: 'h-[var(--aria-control-height-md)] px-3 text-sm',
  lg: 'h-[var(--aria-control-height-lg)] px-4 text-lg',
}

const variantStyles: Record<InputVariant, string> = {
  default:
    'border-[var(--aria-border)] bg-[var(--aria-bg-primary)] hover:border-[var(--aria-border-hover)]',
  error: 'border-[var(--aria-error)] bg-[var(--aria-bg-primary)]',
}

const baseStyles =
  'flex w-full rounded-[var(--aria-radius-md)] border text-[var(--aria-text-primary)] transition duration-200 ease-out outline-none placeholder:text-[var(--aria-text-secondary)] focus-visible:shadow-[var(--aria-focus-ring)] data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:bg-[var(--aria-bg-disabled)] data-[disabled]:text-[var(--aria-text-disabled)]'

export interface InputProps extends Omit<AriaInputProps, 'size'> {
  variant?: InputVariant
  size?: InputSize
  disabled?: boolean
}

export function Input({
  variant = 'default',
  size = 'md',
  className,
  disabled,
  ...props
}: InputProps) {
  return (
    <AriaInput
      className={composeClassName(className, () => cn(baseStyles, sizeStyles[size], variantStyles[variant]))}
      disabled={disabled}
      {...props}
    />
  )
}

export interface InputGroupProps {
  children: ReactNode
  className?: string
}

export function InputGroup({ children, className }: InputGroupProps) {
  return (
    <div style={{ position: 'relative' }} className={className}>
      {children}
    </div>
  )
}

export interface InputAddonProps {
  children: ReactNode
  position?: 'left' | 'right'
  className?: string
}

export function InputAddon({ children, position = 'left', className }: InputAddonProps) {
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 0.75rem',
    fontSize: '0.875rem',
    color: 'var(--aria-text-secondary)',
    ...(position === 'left' ? { left: 0 } : { right: 0 }),
  }

  return (
    <div style={positionStyle} className={className}>
      {children}
    </div>
  )
}
