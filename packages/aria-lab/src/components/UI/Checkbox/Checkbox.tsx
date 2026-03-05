import { type ReactNode } from 'react'
import {
  Checkbox as AriaCheckbox,
  composeRenderProps,
  type CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

const baseStyles =
  'group flex cursor-default items-center gap-3 rounded-[var(--aria-radius-md)] outline-none transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[var(--aria-accent)] focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'

const indicatorBase =
  'flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--aria-radius-sm)] border-2 border-[var(--aria-border)] bg-[var(--aria-bg-primary)] transition duration-200 group-data-[selected]:border-[var(--aria-accent)] group-data-[selected]:bg-[var(--aria-accent)] group-data-[indeterminate]:border-[var(--aria-accent)] group-data-[indeterminate]:bg-[var(--aria-accent)] group-hover:border-[var(--aria-border-hover)]'

export interface CheckboxProps extends Omit<AriaCheckboxProps, 'children'> {
  children?: ReactNode
}

export function Checkbox({ children, className, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox
      className={composeClassName(className, () => cn(baseStyles, 'text-[var(--aria-text-primary)]'))}
      {...props}
    >
      {composeRenderProps(children, (children, { isIndeterminate, isSelected }) => (
        <>
          <span className={indicatorBase} aria-hidden>
            {(isSelected || isIndeterminate) && (
              <svg viewBox="0 0 18 18" aria-hidden className="h-3 w-3 text-[var(--aria-accent-text)]" fill="none" stroke="currentColor" strokeWidth={3}>
                {isIndeterminate ? (
                  <rect x={1} y={7.5} width={16} height={3} />
                ) : (
                  <polyline points="2 9 7 14 16 4" />
                )}
              </svg>
            )}
          </span>
          {children}
        </>
      ))}
    </AriaCheckbox>
  )
}
