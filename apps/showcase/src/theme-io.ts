import { colorKeys, fontOptions, initialVars, sizeKeys, themeVarKeys, type ThemeVarKey, type ThemeVars } from './tokens'

export const STORAGE_KEY = 'aria-lab-theme-generator-v1'
const SCHEMA_VERSION = 1

interface ThemePayload {
  schemaVersion: number
  vars: Record<string, string>
}

export function generateCss(vars: ThemeVars) {
  const lines = Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`)
  return `:root {\n${lines.join('\n')}\n}`
}

export function toThemePayload(vars: ThemeVars): ThemePayload {
  return {
    schemaVersion: SCHEMA_VERSION,
    vars,
  }
}

export function parseThemePayload(input: string): { vars: ThemeVars; warnings: string[] } {
  const warnings: string[] = []

  let raw: unknown
  try {
    raw = JSON.parse(input)
  } catch {
    return { vars: initialVars, warnings: ['Invalid JSON file.'] }
  }

  if (!raw || typeof raw !== 'object') {
    return { vars: initialVars, warnings: ['Theme file must be an object.'] }
  }

  const payload = raw as Partial<ThemePayload>
  if (payload.schemaVersion !== SCHEMA_VERSION) {
    warnings.push(`Unknown schema version: ${String(payload.schemaVersion)}. Tried best-effort import.`)
  }

  if (!payload.vars || typeof payload.vars !== 'object') {
    return { vars: initialVars, warnings: [...warnings, 'Missing vars object in file.'] }
  }

  const next: ThemeVars = { ...initialVars }

  for (const [key, value] of Object.entries(payload.vars)) {
    if (!themeVarKeys.includes(key as ThemeVarKey)) {
      warnings.push(`Unknown token ignored: ${key}`)
      continue
    }

    if (typeof value !== 'string') {
      warnings.push(`Invalid token value ignored: ${key}`)
      continue
    }

    if (!isValidTokenValue(key as ThemeVarKey, value)) {
      warnings.push(`Invalid format ignored for ${key}: ${value}`)
      continue
    }

    next[key as ThemeVarKey] = value
  }

  return { vars: next, warnings }
}

export function saveTheme(vars: ThemeVars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toThemePayload(vars)))
}

export function loadTheme(): ThemeVars | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }

  const parsed = parseThemePayload(raw)
  return parsed.vars
}

export function clearSavedTheme() {
  localStorage.removeItem(STORAGE_KEY)
}

function isValidTokenValue(key: ThemeVarKey, value: string) {
  if (colorKeys.has(key)) {
    return /^#[0-9a-fA-F]{6}$/.test(value)
  }

  if (sizeKeys.has(key)) {
    return /^\d*\.?\d+(px|rem|em|%)$/.test(value)
  }

  if (key === '--aria-font-sans') {
    return Object.values(fontOptions).includes(value as (typeof fontOptions)[keyof typeof fontOptions])
  }

  return true
}
