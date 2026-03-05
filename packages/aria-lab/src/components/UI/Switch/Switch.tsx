import { type ReactNode } from 'react'
import {
  Switch as AriaSwitch,
  composeRenderProps,
  type SwitchProps as AriaSwitchProps,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

const baseStyles =
  'group flex cursor-default items-center gap-3 outline-none transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[var(--aria-accent)] focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'

const trackBase =
  'relative h-6 w-11 shrink-0 rounded-full border-2 border-[var(--aria-border)] bg-[var(--aria-bg-secondary)] transition duration-200 group-hover:border-[var(--aria-border-hover)] group-data-[selected]:border-[var(--aria-accent)] group-data-[selected]:bg-[var(--aria-accent)]'

const handleBase =
  'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-[var(--aria-bg-primary)] border border-[var(--aria-border)] shadow-sm transition-all duration-200 group-data-[selected]:translate-x-6 group-data-[selected]:border-[var(--aria-accent-text)] group-data-[selected]:bg-[var(--aria-accent-text)]'

export interface SwitchProps extends Omit<AriaSwitchProps, 'children'> {
  children?: ReactNode
}

export function Switch({ children, className, ...props }: SwitchProps) {
  return (
    <AriaSwitch
      className={composeClassName(className, () => cn(baseStyles, 'text-[var(--aria-text-primary)]'))}
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <>
          <span className={trackBase} aria-hidden>
            <span className={handleBase} />
          </span>
          {children}
        </>
      ))}
    </AriaSwitch>
  )
}
