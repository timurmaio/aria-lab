import { useContext, type ReactNode } from 'react'
import {
  Button,
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  DisclosureStateContext,
  type DisclosurePanelProps as AriaDisclosurePanelProps,
  type DisclosureProps as AriaDisclosureProps,
  Heading,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

const triggerBase =
  'flex w-full items-center gap-2 rounded-[var(--aria-radius-md)] px-3 py-2 text-left text-sm font-medium text-[var(--aria-text-primary)] outline-none transition duration-200 hover:bg-[var(--aria-bg-hover)] focus-visible:shadow-[var(--aria-focus-ring)] data-[disabled]:opacity-50'

const chevronBase = 'h-4 w-4 shrink-0 text-[var(--aria-text-secondary)] transition-transform duration-200'

export interface DisclosureProps extends AriaDisclosureProps {
  children?: ReactNode
}

export function Disclosure({ children, className, ...props }: DisclosureProps) {
  return (
    <AriaDisclosure
      className={composeClassName(className, () => 'group border-b border-[var(--aria-border)] last:border-b-0')}
      {...props}
    >
      {children}
    </AriaDisclosure>
  )
}

export interface DisclosureHeaderProps {
  children: ReactNode
}

export function DisclosureHeader({ children }: DisclosureHeaderProps) {
  const state = useContext(DisclosureStateContext)
  const isExpanded = state?.isExpanded ?? false
  return (
    <Heading className="m-0 text-base font-semibold">
      <Button slot="trigger" className={triggerBase}>
        <>
          <svg
            aria-hidden
            className={cn(chevronBase, isExpanded && 'rotate-90')}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span>{children}</span>
        </>
      </Button>
    </Heading>
  )
}

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
  children: ReactNode
}

export function DisclosurePanel({ children, className, ...props }: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel
      className={composeClassName(className, () => 'overflow-clip transition-[height] duration-200')}
      {...props}
    >
      <div className="px-3 py-2 text-sm text-[var(--aria-text-secondary)]">{children}</div>
    </AriaDisclosurePanel>
  )
}
