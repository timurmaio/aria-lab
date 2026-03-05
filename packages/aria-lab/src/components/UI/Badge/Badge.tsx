import { type ReactNode } from 'react'
import { cn } from '../../../lib/cn.js'

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info'

const variantStyles: Record<BadgeVariant, string> = {
  neutral:
    'bg-[var(--aria-bg-secondary)] text-[var(--aria-text-secondary)] border-[var(--aria-border)]',
  success:
    'bg-[var(--aria-success-subtle, rgba(34,197,94,0.15))] text-[var(--aria-success, #22c55e)] border-[var(--aria-success, #22c55e)]',
  warning:
    'bg-[var(--aria-warning-subtle, rgba(234,179,8,0.15))] text-[var(--aria-warning, #eab308)] border-[var(--aria-warning, #eab308)]',
  error:
    'bg-[var(--aria-error-subtle, rgba(239,68,68,0.15))] text-[var(--aria-error)] border-[var(--aria-error)]',
  info:
    'bg-[var(--aria-accent-subtle, rgba(59,130,246,0.15))] text-[var(--aria-accent)] border-[var(--aria-accent)]',
}

export interface BadgeProps {
  variant?: BadgeVariant
  children?: ReactNode
  className?: string
}

const base =
  'inline-flex items-center rounded-[var(--aria-radius-sm)] border px-2 py-0.5 text-xs font-medium'

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span className={cn(base, variantStyles[variant], className)}>{children}</span>
  )
}
