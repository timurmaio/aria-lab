import {
  FieldError as AriaFieldError,
  Label as AriaLabel,
  Text,
  composeRenderProps,
  type FieldErrorProps,
  type LabelProps,
  type TextProps,
} from 'react-aria-components'
import { cn } from '../../../lib/cn.js'

const labelBaseStyles = 'w-fit cursor-default text-sm font-medium text-[var(--aria-text-primary)]'
const descriptionBaseStyles = 'text-sm text-[var(--aria-text-secondary)]'
const errorBaseStyles = 'text-sm text-[var(--aria-error)]'

export function FieldLabel(props: LabelProps) {
  return <AriaLabel {...props} className={cn(labelBaseStyles, props.className)} />
}

export function FieldDescription(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={cn(descriptionBaseStyles, props.className)}
    />
  )
}

export function FieldErrorText(props: FieldErrorProps) {
  return (
    <AriaFieldError
      {...props}
      className={composeRenderProps(props.className, (className) => cn(errorBaseStyles, className))}
    />
  )
}
