import { type ReactNode } from 'react'
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  composeRenderProps,
  Link,
  type BreadcrumbProps as AriaBreadcrumbProps,
  type BreadcrumbsProps as AriaBreadcrumbsProps,
} from 'react-aria-components'
import { cn } from '../../../lib/cn.js'

export interface BreadcrumbsProps<T extends object = object> extends AriaBreadcrumbsProps<T> {
  children?: ReactNode
}

const breadcrumbsBase = 'flex flex-wrap items-center gap-1 list-none m-0 p-0'

export function Breadcrumbs<T extends object>({ children, className, ...props }: BreadcrumbsProps<T>) {
  return (
    <AriaBreadcrumbs className={cn(breadcrumbsBase, className)} {...props}>
      {children}
    </AriaBreadcrumbs>
  )
}

const linkBase =
  'text-sm text-[var(--aria-text-secondary)] no-underline outline-none transition duration-150 hover:text-[var(--aria-text-primary)] hover:underline focus-visible:shadow-[var(--aria-focus-ring)] rounded-[var(--aria-radius-sm)] data-[current]:text-[var(--aria-text-primary)] data-[current]:font-semibold data-[current]:no-underline'

export interface BreadcrumbProps extends AriaBreadcrumbProps {
  href?: string
  children?: ReactNode
}

const breadcrumbBase = 'flex items-center gap-1'

export function Breadcrumb({ children, href, className, ...props }: BreadcrumbProps) {
  return (
    <AriaBreadcrumb
      className={composeRenderProps(className, (resolved) => cn(breadcrumbBase, resolved))}
      {...props}
    >
      {composeRenderProps(children, (resolvedChildren, { isCurrent }) => (
        <>
          {href !== undefined ? (
            <Link href={href} className={linkBase} aria-current={isCurrent ? 'page' : undefined}>
              {resolvedChildren}
            </Link>
          ) : (
            <span className={cn(linkBase, isCurrent && 'font-semibold text-[var(--aria-text-primary)]')}>
              {resolvedChildren}
            </span>
          )}
          {!isCurrent && (
            <span aria-hidden className="mx-1 text-[var(--aria-text-secondary)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          )}
        </>
      ))}
    </AriaBreadcrumb>
  )
}
