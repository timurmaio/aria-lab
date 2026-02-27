import { type ReactNode } from 'react'
import {
  ListBoxItem,
  composeRenderProps,
  type ListBoxItemProps,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

const itemBaseStyles =
  'group flex cursor-default items-center gap-[var(--aria-dropdown-item-gap)] rounded-[var(--aria-radius-sm)] px-[var(--aria-dropdown-item-padding-x)] py-[var(--aria-dropdown-item-padding-y)] text-sm outline-none transition duration-150'

export interface DropdownItemProps extends ListBoxItemProps {}

export function DropdownItem(props: DropdownItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={composeClassName(props.className, ({ isFocused, isSelected, isDisabled }) =>
        cn(
          itemBaseStyles,
          isFocused && 'bg-[var(--aria-bg-hover)]',
          isSelected && 'bg-[var(--aria-accent-subtle)] text-[var(--aria-text-primary)]',
          isDisabled && 'text-[var(--aria-text-disabled)]',
        ),
      )}
    >
      {composeRenderProps(props.children as ReactNode, (children, { isSelected }) => (
        <>
          <span className="flex-1 truncate">{children}</span>
          <span className="w-4 text-center text-xs">{isSelected ? '✓' : ''}</span>
        </>
      ))}
    </ListBoxItem>
  )
}
