import { type ReactNode } from 'react'
import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-8 text-lg',
  icon: 'h-10 w-10 p-0',
  'icon-sm': 'h-8 w-8 p-0',
  'icon-lg': 'h-12 w-12 p-0',
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-[var(--aria-accent)] text-[var(--aria-accent-text)] hover:bg-[var(--aria-accent-hover)]',
  secondary:
    'border-[var(--aria-border)] bg-[var(--aria-bg-secondary)] text-[var(--aria-text-primary)] hover:border-[var(--aria-border-hover)] hover:bg-[var(--aria-bg-hover)]',
  ghost:
    'border-transparent bg-transparent text-[var(--aria-text-primary)] hover:bg-[var(--aria-bg-hover)]',
  link:
    'h-auto border-transparent bg-transparent px-0 text-[var(--aria-accent)] underline-offset-4 hover:underline',
  destructive:
    'border-transparent bg-[var(--aria-error)] text-white hover:brightness-95',
}

const baseStyles =
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--aria-radius-md)] border text-sm font-medium transition duration-200 ease-out outline-none focus-visible:shadow-[var(--aria-focus-ring)] data-[disabled]:pointer-events-none data-[disabled]:bg-[var(--aria-bg-disabled)] data-[disabled]:text-[var(--aria-text-disabled)]'

export interface ButtonProps extends AriaButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      className={composeClassName(className, ({ isPending }: { isPending: boolean }) =>
        cn(baseStyles, sizeStyles[size], variantStyles[variant], isPending && 'text-transparent'),
      )}
      {...props}
    >
      {composeRenderProps(children, (children, { isPending }) => (
        <>
          {children}
          {isPending && (
            <span aria-hidden className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                stroke={variant === 'secondary' || variant === 'ghost' || variant === 'link' ? 'currentColor' : 'white'}
              >
                <circle cx="12" cy="12" r="10" strokeWidth="4" fill="none" className="opacity-25" />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  pathLength="100"
                  strokeDasharray="60 140"
                  strokeDashoffset="0"
                />
              </svg>
            </span>
          )}
        </>
      ))}
    </AriaButton>
  )
}
