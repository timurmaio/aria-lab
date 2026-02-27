import {
  Modal as AriaModal,
  ModalOverlay,
  type ModalOverlayProps,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

const overlayBaseStyles =
  'fixed inset-0 z-50 bg-[var(--aria-overlay-backdrop)] p-4 backdrop-blur-[2px] data-[entering]:animate-in data-[entering]:fade-in data-[exiting]:animate-out data-[exiting]:fade-out'

const modalBaseStyles =
  'mx-auto mt-[10vh] w-full rounded-[var(--aria-radius-xl)] border border-[var(--aria-border)] bg-[var(--aria-bg-primary)] text-[var(--aria-text-primary)] shadow-[var(--aria-shadow-xl)] outline-none data-[entering]:animate-in data-[entering]:zoom-in-95 data-[exiting]:animate-out data-[exiting]:zoom-out-95'

const modalSizeStyles = {
  sm: 'max-w-[min(92vw,var(--aria-modal-max-width-sm))]',
  md: 'max-w-[min(92vw,var(--aria-modal-max-width-md))]',
  lg: 'max-w-[min(96vw,var(--aria-modal-max-width-lg))]',
} as const

type ModalSize = keyof typeof modalSizeStyles

export interface ModalProps extends ModalOverlayProps {
  size?: ModalSize
}

export function Modal({ className, size = 'md', ...props }: ModalProps) {
  return (
    <ModalOverlay
      {...props}
      className={overlayBaseStyles}
    >
      <AriaModal
        {...props}
        className={composeClassName(className, () => cn(modalBaseStyles, modalSizeStyles[size]))}
      />
    </ModalOverlay>
  )
}
