import { type ReactNode } from 'react'
import {
  Label,
  Slider as AriaSlider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  type SliderProps as AriaSliderProps,
} from 'react-aria-components'
import { cn, composeClassName } from '../../../lib/cn.js'

const trackBase =
  'relative h-2 w-full rounded-full bg-[var(--aria-bg-secondary)] overflow-clip'

const fillBase =
  'absolute inset-y-0 left-0 rounded-full bg-[var(--aria-accent)] transition-[width] duration-150'

const thumbBase =
  'h-5 w-5 rounded-full border-2 border-[var(--aria-border)] bg-[var(--aria-bg-primary)] shadow-sm outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--aria-accent)] focus-visible:ring-offset-2 data-[dragging]:scale-110'

export interface SliderProps<T extends number | number[] = number> extends AriaSliderProps<T> {
  label?: ReactNode
  thumbLabels?: string[]
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  className,
  ...props
}: SliderProps<T>) {
  return (
    <AriaSlider
      className={composeClassName(className, () =>
        cn('flex flex-col gap-2 w-full max-w-[280px]', 'text-[var(--aria-text-primary)]'),
      )}
      {...props}
    >
      {label != null && <Label className="text-sm font-medium">{label}</Label>}
      <SliderOutput className="text-sm text-[var(--aria-text-secondary)]" />
      <SliderTrack className="mt-1">
        {({ state, isDisabled }) => (
          <>
            <div className={cn(trackBase, isDisabled && 'opacity-50')} aria-hidden>
              {state.values.length === 1 ? (
                <div
                  className={fillBase}
                  style={{ width: state.getThumbPercent(0) * 100 + '%' } as React.CSSProperties}
                />
              ) : state.values.length === 2 ? (
                <div
                  className={fillBase}
                  style={{
                    left: state.getThumbPercent(0) * 100 + '%',
                    width: (state.getThumbPercent(1) - state.getThumbPercent(0)) * 100 + '%',
                  } as React.CSSProperties}
                />
              ) : null}
            </div>
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                className={thumbBase}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  )
}
