import {
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

const baseStyles =
  'rounded-[var(--aria-radius-lg)] border border-[var(--aria-border)] bg-[var(--aria-bg-primary)] p-1 text-[var(--aria-text-primary)] shadow-[var(--aria-shadow-lg)] outline-none data-[entering]:animate-in data-[entering]:fade-in data-[exiting]:animate-out data-[exiting]:fade-out'

export interface PopoverProps extends AriaPopoverProps {}

export function Popover({ className, ...props }: PopoverProps) {
  return (
    <AriaPopover
      offset={8}
      {...props}
      className={composeClassName(className, () => cn(baseStyles))}
    />
  )
}
