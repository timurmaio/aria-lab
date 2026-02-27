import {
  Dialog as AriaDialog,
  type DialogProps as AriaDialogProps,
} from 'react-aria-components'
import { cn } from '../../../lib/cn.js'

const dialogBaseStyles =
  'relative max-h-[min(85vh,720px)] overflow-auto p-[var(--aria-dialog-padding)] outline-none'

export interface DialogProps extends AriaDialogProps {}

export function Dialog({ className, ...props }: DialogProps) {
  return (
    <AriaDialog
      {...props}
      className={cn(dialogBaseStyles, className)}
    />
  )
}
