import { type ReactNode } from 'react'
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
  type TabsProps as AriaTabsProps,
  type TabListProps as AriaTabListProps,
  type TabProps as AriaTabProps,
  type TabPanelProps as AriaTabPanelProps,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

const tabsBase = 'flex flex-col gap-0 text-[var(--aria-text-primary)]'
const tabListBase = 'flex border-b border-[var(--aria-border)] overflow-x-auto'
const tabBase =
  'relative px-4 py-3 text-sm font-medium cursor-default outline-none text-[var(--aria-text-secondary)] transition-colors hover:text-[var(--aria-text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--aria-accent)] focus-visible:ring-offset-2 data-[selected]:text-[var(--aria-accent)] data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[selected]:border-b-2 data-[selected]:border-[var(--aria-accent)] data-[selected]:-mb-[2px]'
const tabPanelBase = 'p-4 outline-none'

export interface TabsProps extends AriaTabsProps {
  children?: ReactNode
}

export function Tabs({ children, className, ...props }: TabsProps) {
  return (
    <AriaTabs
      className={composeClassName(className, () => cn(tabsBase))}
      {...props}
    >
      {children}
    </AriaTabs>
  )
}

export interface TabListProps<T extends object> extends AriaTabListProps<T> {
  children?: ReactNode
}

export function TabList<T extends object>({ children, className, ...props }: TabListProps<T>) {
  return (
    <AriaTabList
      className={composeClassName(className, () => cn(tabListBase))}
      {...props}
    >
      {children}
    </AriaTabList>
  )
}

export interface TabProps extends AriaTabProps {
  children?: ReactNode
}

export function Tab({ children, className, ...props }: TabProps) {
  return (
    <AriaTab
      className={composeClassName(className, () => cn(tabBase))}
      {...props}
    >
      {children}
    </AriaTab>
  )
}

/** Wrapper for TabPanel elements. Renders children as-is. */
export function TabPanels({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

export interface TabPanelProps extends AriaTabPanelProps {
  children?: ReactNode
}

export function TabPanel({ children, className, ...props }: TabPanelProps) {
  return (
    <AriaTabPanel
      className={composeClassName(className, () => cn(tabPanelBase))}
      {...props}
    >
      {children}
    </AriaTabPanel>
  )
}
