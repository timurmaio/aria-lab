import { type ReactNode } from 'react'
import { OverlayArrow, Tooltip as AriaTooltip, type TooltipProps as AriaTooltipProps } from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

export interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {
  children?: ReactNode
}

export function Tooltip({ children, className, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      className={composeClassName(className, () =>
        cn(
          'max-w-[200px] rounded-[var(--aria-radius-md)] bg-[var(--aria-bg-primary)] px-3 py-2 text-sm text-[var(--aria-text-primary)] shadow-lg',
          'border border-[var(--aria-border)] outline-none',
          'transition-opacity duration-200',
        ),
      )}
      {...props}
    >
      <OverlayArrow>
        <svg width="8" height="8" viewBox="0 0 8 8" className="fill-[var(--aria-bg-primary)] stroke-[var(--aria-border)]">
          <path d="M0 0 L4 4 L8 0" />
        </svg>
      </OverlayArrow>
      {children}
    </AriaTooltip>
  )
}
