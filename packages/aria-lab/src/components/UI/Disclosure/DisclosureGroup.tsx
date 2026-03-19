import { type ReactNode } from 'react'
import {
  DisclosureGroup as AriaDisclosureGroup,
  type DisclosureGroupProps as AriaDisclosureGroupProps,
} from 'react-aria-components'
import { composeClassName } from '../../../lib/cn.js'

export interface DisclosureGroupProps extends AriaDisclosureGroupProps {
  children?: ReactNode
}

export function DisclosureGroup({ children, className, ...props }: DisclosureGroupProps) {
  return (
    <AriaDisclosureGroup
      className={composeClassName(className, () => 'flex flex-col border border-[var(--aria-border)] rounded-[var(--aria-radius-md)] overflow-hidden')}
      {...props}
    >
      {children}
    </AriaDisclosureGroup>
  )
}
