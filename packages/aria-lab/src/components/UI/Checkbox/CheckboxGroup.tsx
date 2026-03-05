import { type ReactNode } from 'react'
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  type ValidationResult,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'
import { FieldDescription, FieldErrorText, FieldLabel } from '../Field/index.js'

const baseStyles = 'flex flex-col gap-2'

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children'> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  children?: ReactNode
  orientation?: 'horizontal' | 'vertical'
}

export function CheckboxGroup({
  label,
  description,
  errorMessage,
  children,
  orientation = 'vertical',
  className,
  ...props
}: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      className={composeClassName(className, () =>
        cn(baseStyles, orientation === 'horizontal' && 'flex-row flex-wrap'),
      )}
      data-orientation={orientation}
      {...props}
    >
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className={cn('flex gap-3', orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col')}>
        {children}
      </div>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldErrorText>{errorMessage}</FieldErrorText>
    </AriaCheckboxGroup>
  )
}
