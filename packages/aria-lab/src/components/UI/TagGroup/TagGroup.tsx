import { type ReactNode } from 'react'
import {
  Button as AriaButton,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  TagList as AriaTagList,
  type TagGroupProps as AriaTagGroupProps,
  type TagProps as AriaTagProps,
} from 'react-aria-components'
import { composeRenderProps } from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'
import { FieldDescription, FieldErrorText, FieldLabel } from '../Field/index.js'

const tagListBase = 'flex flex-wrap gap-2'

const tagBase =
  'inline-flex items-center gap-1.5 rounded-[var(--aria-radius-md)] border border-[var(--aria-border)] bg-[var(--aria-bg-secondary)] px-2.5 py-1 text-sm text-[var(--aria-text-primary)] outline-none transition hover:border-[var(--aria-border-hover)] hover:bg-[var(--aria-bg-hover)] focus-visible:ring-2 focus-visible:ring-[var(--aria-accent)] data-[disabled]:opacity-50'

const removeButtonBase =
  'ml-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[var(--aria-text-secondary)] hover:bg-[var(--aria-bg-hover)] hover:text-[var(--aria-text-primary)]'

export interface TagGroupProps extends AriaTagGroupProps {
  label?: string
  description?: string
  errorMessage?: string
  children?: ReactNode
}

export function TagGroup({
  label,
  description,
  errorMessage,
  children,
  className,
  ...props
}: TagGroupProps) {
  return (
    <AriaTagGroup
      {...props}
      className={cn('flex flex-col gap-1.5', className)}
    >
      {label != null && <FieldLabel>{label}</FieldLabel>}
      <AriaTagList className={tagListBase}>{children}</AriaTagList>
      {description != null && <FieldDescription>{description}</FieldDescription>}
      {errorMessage != null && <FieldErrorText>{errorMessage}</FieldErrorText>}
    </AriaTagGroup>
  )
}

export interface TagProps extends AriaTagProps {
  children?: ReactNode
}

export function Tag({ children, textValue, className, ...props }: TagProps) {
  return (
    <AriaTag
      textValue={textValue ?? (typeof children === 'string' ? children : undefined)}
      className={composeClassName(className, () => tagBase)}
      {...props}
    >
      {composeRenderProps(children, (resolvedChildren, { allowsRemoving }) => (
        <>
          <span className="flex-1 truncate">{resolvedChildren}</span>
          {allowsRemoving && (
            <AriaButton slot="remove" className={removeButtonBase} aria-label="Remove">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </AriaButton>
          )}
        </>
      ))}
    </AriaTag>
  )
}
