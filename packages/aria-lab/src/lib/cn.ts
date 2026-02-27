import { composeRenderProps } from 'react-aria-components'

type ClassValue = string | false | null | undefined

export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(' ')
}

export function composeClassName(
  className: string | ((values: any) => string) | undefined,
  getClasses: (values: any) => string,
) {
  return composeRenderProps(className, (resolvedClassName, renderProps) =>
    cn(getClasses(renderProps), resolvedClassName),
  )
}
