import {
  Separator as AriaSeparator,
  type SeparatorProps as AriaSeparatorProps,
} from 'react-aria-components'
import { cn } from '../../../lib/cn.js'

const horizontalBase = 'h-px w-full'
const verticalBase = 'h-full min-h-8 w-px'

export interface SeparatorProps extends AriaSeparatorProps {}

export function Separator({ className, orientation = 'horizontal', ...props }: SeparatorProps) {
  return (
    <AriaSeparator
      {...props}
      orientation={orientation}
      className={cn('shrink-0 border-none bg-[var(--aria-border)]', orientation === 'horizontal' ? horizontalBase : verticalBase, className)}
    />
  )
}
