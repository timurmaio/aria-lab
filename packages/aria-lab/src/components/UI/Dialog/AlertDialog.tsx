import { type ReactNode } from 'react'
import { Heading, type DialogProps as AriaDialogProps } from 'react-aria-components'
import { Button } from '../Button/index.js'
import { Dialog } from './Dialog.js'

type AlertDialogVariant = 'info' | 'destructive'

export interface AlertDialogProps extends Omit<AriaDialogProps, 'children'> {
  title: string
  children: ReactNode
  actionLabel: string
  cancelLabel?: string
  variant?: AlertDialogVariant
  onAction?: () => void
}

const iconStyles: Record<AlertDialogVariant, string> = {
  info: 'text-[var(--aria-info)]',
  destructive: 'text-[var(--aria-error)]',
}

export function AlertDialog({
  title,
  children,
  actionLabel,
  cancelLabel = 'Cancel',
  variant = 'info',
  onAction,
  ...props
}: AlertDialogProps) {
  return (
    <Dialog role="alertdialog" {...props}>
      {({ close }) => (
        <>
          <Heading slot="title" className="pr-10 text-lg font-semibold text-[var(--aria-text-primary)]">
            {title}
          </Heading>
          <span
            aria-hidden
            className={`absolute right-6 top-6 inline-flex h-5 w-5 items-center justify-center ${iconStyles[variant]}`}
          >
            {variant === 'destructive' ? '!' : 'i'}
          </span>
          <p className="mt-2 text-sm text-[var(--aria-text-secondary)]">{children}</p>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="secondary" onPress={close}>
              {cancelLabel}
            </Button>
            <Button
              variant={variant === 'destructive' ? 'destructive' : 'primary'}
              autoFocus
              onPress={() => {
                onAction?.()
                close()
              }}
            >
              {actionLabel}
            </Button>
          </div>
        </>
      )}
    </Dialog>
  )
}
