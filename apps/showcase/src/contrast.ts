import type { ThemeVarKey, ThemeVars } from './tokens'

interface ContrastCheck {
  label: string
  foreground: ThemeVarKey
  background: ThemeVarKey
}

export const contrastChecks: ContrastCheck[] = [
  {
    label: 'Primary text',
    foreground: '--aria-text-primary',
    background: '--aria-bg-primary',
  },
  {
    label: 'Secondary text',
    foreground: '--aria-text-secondary',
    background: '--aria-bg-primary',
  },
  {
    label: 'Accent text',
    foreground: '--aria-accent-text',
    background: '--aria-accent',
  },
]

export function getContrastRatio(foregroundHex: string, backgroundHex: string) {
  const fg = hexToRgb(foregroundHex)
  const bg = hexToRgb(backgroundHex)
  if (!fg || !bg) {
    return null
  }

  const fgLum = relativeLuminance(fg.r, fg.g, fg.b)
  const bgLum = relativeLuminance(bg.r, bg.g, bg.b)
  const lighter = Math.max(fgLum, bgLum)
  const darker = Math.min(fgLum, bgLum)

  return (lighter + 0.05) / (darker + 0.05)
}

export function getContrastReport(vars: ThemeVars) {
  return contrastChecks.map((check) => {
    const ratio = getContrastRatio(vars[check.foreground], vars[check.background])
    const aaPass = ratio !== null && ratio >= 4.5
    return {
      label: check.label,
      ratio,
      aaPass,
      pair: `${check.foreground} / ${check.background}`,
    }
  })
}

function hexToRgb(hex: string) {
  const match = /^#([0-9a-fA-F]{6})$/.exec(hex)
  if (!match) {
    return null
  }

  const value = match[1]
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  }
}

function relativeLuminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map((value) => {
    const channel = value / 255
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}
