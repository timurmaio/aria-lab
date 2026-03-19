import { type ReactNode } from 'react'
import {
  Radio as AriaRadio,
  composeRenderProps,
  type RadioProps as AriaRadioProps,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

const baseStyles =
  'group flex cursor-default items-center gap-3 rounded-[var(--aria-radius-md)] outline-none transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[var(--aria-accent)] focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'

const indicatorBase =
  'h-5 w-5 shrink-0 rounded-full border-2 border-[var(--aria-border)] bg-[var(--aria-bg-primary)] transition duration-200 group-data-[selected]:border-[var(--aria-accent)] group-data-[selected]:bg-[var(--aria-accent)] group-hover:border-[var(--aria-border-hover)] flex items-center justify-center'
const indicatorDot = 'h-2 w-2 rounded-full bg-[var(--aria-accent-text)]'

export interface RadioProps extends AriaRadioProps {
  children?: ReactNode
}

export function Radio({ children, className, ...props }: RadioProps) {
  return (
    <AriaRadio
      className={composeClassName(className, () => cn(baseStyles, 'text-[var(--aria-text-primary)]'))}
      {...props}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          <span className={indicatorBase} aria-hidden>
            {isSelected && <span className={indicatorDot} />}
          </span>
          {children}
        </>
      ))}
    </AriaRadio>
  )
}
