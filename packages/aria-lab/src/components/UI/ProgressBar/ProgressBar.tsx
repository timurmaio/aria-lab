import { type ReactNode } from 'react'
import {
  ProgressBar as AriaProgressBar,
  type ProgressBarProps as AriaProgressBarProps,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

const trackBase =
  'relative h-2 w-full rounded-full bg-[var(--aria-bg-secondary)] overflow-clip'

const fillBase =
  'h-full rounded-full bg-[var(--aria-accent)] transition-[width] duration-200'

export interface ProgressBarProps extends AriaProgressBarProps {
  label?: ReactNode
  showValue?: boolean
}

export function ProgressBar({
  label,
  showValue = true,
  className,
  ...props
}: ProgressBarProps) {
  return (
    <AriaProgressBar
      className={composeClassName(className, () =>
        cn('flex flex-col gap-2 w-full max-w-[280px]', 'text-[var(--aria-text-primary)]'),
      )}
      {...props}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          {(label != null || showValue) && (
            <div className="flex items-center justify-between text-sm">
              {label != null && <span className="font-medium">{label}</span>}
              {showValue && (
                <span className="text-[var(--aria-text-secondary)]">
                  {isIndeterminate ? '…' : valueText}
                </span>
              )}
            </div>
          )}
          <div className={cn(trackBase, 'min-h-[8px]')} aria-hidden>
            <div
              className={cn(
                fillBase,
                isIndeterminate && 'animate-pulse opacity-80',
              )}
              style={{
                width: isIndeterminate ? '100%' : percentage + '%',
              } as React.CSSProperties}
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  )
}
