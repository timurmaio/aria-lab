export const fontOptions = {
  manrope: "'Manrope', system-ui, sans-serif",
  plex: "'IBM Plex Sans', system-ui, sans-serif",
  space: "'Space Grotesk', system-ui, sans-serif",
} as const

export const themeVarKeys = [
  '--aria-accent',
  '--aria-accent-hover',
  '--aria-accent-text',
  '--aria-bg-primary',
  '--aria-bg-secondary',
  '--aria-text-primary',
  '--aria-text-secondary',
  '--aria-border',
  '--aria-border-hover',
  '--aria-error',
  '--aria-success',
  '--aria-warning',
  '--aria-radius-sm',
  '--aria-radius-md',
  '--aria-radius-lg',
  '--aria-control-height-sm',
  '--aria-control-height-md',
  '--aria-control-height-lg',
  '--aria-space-2',
  '--aria-space-4',
  '--aria-space-6',
  '--aria-space-8',
  '--aria-font-sans',
] as const

export type ThemeVarKey = (typeof themeVarKeys)[number]
export type ThemeVars = Record<ThemeVarKey, string>

export const colorKeys = new Set<ThemeVarKey>([
  '--aria-accent',
  '--aria-accent-hover',
  '--aria-accent-text',
  '--aria-bg-primary',
  '--aria-bg-secondary',
  '--aria-text-primary',
  '--aria-text-secondary',
  '--aria-border',
  '--aria-border-hover',
  '--aria-error',
  '--aria-success',
  '--aria-warning',
])

export const sizeKeys = new Set<ThemeVarKey>([
  '--aria-radius-sm',
  '--aria-radius-md',
  '--aria-radius-lg',
  '--aria-control-height-sm',
  '--aria-control-height-md',
  '--aria-control-height-lg',
  '--aria-space-2',
  '--aria-space-4',
  '--aria-space-6',
  '--aria-space-8',
])

export const initialVars: ThemeVars = {
  '--aria-accent': '#1273ea',
  '--aria-accent-hover': '#0c62ca',
  '--aria-accent-text': '#ffffff',
  '--aria-bg-primary': '#ffffff',
  '--aria-bg-secondary': '#f8fafc',
  '--aria-text-primary': '#0f172a',
  '--aria-text-secondary': '#475569',
  '--aria-border': '#d9e2ec',
  '--aria-border-hover': '#c3ceda',
  '--aria-error': '#e11d48',
  '--aria-success': '#059669',
  '--aria-warning': '#d97706',
  '--aria-radius-sm': '0.375rem',
  '--aria-radius-md': '0.625rem',
  '--aria-radius-lg': '0.875rem',
  '--aria-control-height-sm': '2rem',
  '--aria-control-height-md': '2.5rem',
  '--aria-control-height-lg': '3rem',
  '--aria-space-2': '0.5rem',
  '--aria-space-4': '1rem',
  '--aria-space-6': '1.5rem',
  '--aria-space-8': '2rem',
  '--aria-font-sans': fontOptions.manrope,
}

export interface ThemePreset {
  id: string
  name: string
  vars: ThemeVars
}

export interface ThemeEditorOption {
  label: string
  value: string
}

export interface ThemeEditorField {
  key: ThemeVarKey
  label: string
  control: 'color' | 'text' | 'select'
  options?: ThemeEditorOption[]
}

export interface ThemeEditorSection {
  id: string
  title: string
  layout: 'grid' | 'row'
  fields: ThemeEditorField[]
}

export const themeEditorSections: ThemeEditorSection[] = [
  {
    id: 'colors',
    title: 'Colors',
    layout: 'grid',
    fields: [
      { key: '--aria-accent', label: 'Accent', control: 'color' },
      { key: '--aria-accent-hover', label: 'Accent Hover', control: 'color' },
      { key: '--aria-accent-text', label: 'Accent Text', control: 'color' },
      { key: '--aria-bg-primary', label: 'Background', control: 'color' },
      { key: '--aria-bg-secondary', label: 'Surface', control: 'color' },
      { key: '--aria-text-primary', label: 'Text', control: 'color' },
      { key: '--aria-text-secondary', label: 'Text Secondary', control: 'color' },
      { key: '--aria-border', label: 'Border', control: 'color' },
    ],
  },
  {
    id: 'typography',
    title: 'Typography',
    layout: 'row',
    fields: [
      {
        key: '--aria-font-sans',
        label: 'Font family',
        control: 'select',
        options: [
          { label: 'Manrope', value: fontOptions.manrope },
          { label: 'IBM Plex Sans', value: fontOptions.plex },
          { label: 'Space Grotesk', value: fontOptions.space },
        ],
      },
    ],
  },
  {
    id: 'sizing',
    title: 'Sizing and Spacing',
    layout: 'grid',
    fields: [
      { key: '--aria-control-height-sm', label: 'Control sm', control: 'text' },
      { key: '--aria-control-height-md', label: 'Control md', control: 'text' },
      { key: '--aria-control-height-lg', label: 'Control lg', control: 'text' },
      { key: '--aria-space-2', label: 'Space 2', control: 'text' },
      { key: '--aria-space-4', label: 'Space 4', control: 'text' },
      { key: '--aria-space-6', label: 'Space 6', control: 'text' },
      { key: '--aria-space-8', label: 'Space 8', control: 'text' },
    ],
  },
  {
    id: 'radius',
    title: 'Radius',
    layout: 'grid',
    fields: [
      { key: '--aria-radius-sm', label: 'Radius sm', control: 'text' },
      { key: '--aria-radius-md', label: 'Radius md', control: 'text' },
      { key: '--aria-radius-lg', label: 'Radius lg', control: 'text' },
    ],
  },
]

export const presets: ThemePreset[] = [
  {
    id: 'default',
    name: 'Default',
    vars: initialVars,
  },
  {
    id: 'ocean',
    name: 'Ocean',
    vars: {
      ...initialVars,
      '--aria-accent': '#0f766e',
      '--aria-accent-hover': '#0d615a',
      '--aria-bg-primary': '#f7fcfb',
      '--aria-bg-secondary': '#ecf8f6',
      '--aria-text-primary': '#06231f',
      '--aria-text-secondary': '#2f5e59',
      '--aria-border': '#bfe4df',
      '--aria-border-hover': '#9dd3cb',
    },
  },
  {
    id: 'warm',
    name: 'Warm',
    vars: {
      ...initialVars,
      '--aria-accent': '#d9480f',
      '--aria-accent-hover': '#b93f0d',
      '--aria-bg-primary': '#fffaf5',
      '--aria-bg-secondary': '#fff1e6',
      '--aria-text-primary': '#3a1f0f',
      '--aria-text-secondary': '#72472e',
      '--aria-border': '#f3d2bb',
      '--aria-border-hover': '#eab992',
      '--aria-font-sans': fontOptions.plex,
    },
  },
  {
    id: 'mono',
    name: 'Mono',
    vars: {
      ...initialVars,
      '--aria-accent': '#1f2937',
      '--aria-accent-hover': '#111827',
      '--aria-bg-primary': '#f8fafc',
      '--aria-bg-secondary': '#f1f5f9',
      '--aria-text-primary': '#0f172a',
      '--aria-text-secondary': '#334155',
      '--aria-border': '#cbd5e1',
      '--aria-border-hover': '#94a3b8',
      '--aria-font-sans': fontOptions.space,
    },
  },
  {
    id: 'contrast',
    name: 'High Contrast',
    vars: {
      ...initialVars,
      '--aria-accent': '#0047ff',
      '--aria-accent-hover': '#0039cc',
      '--aria-accent-text': '#ffffff',
      '--aria-bg-primary': '#ffffff',
      '--aria-bg-secondary': '#f3f6ff',
      '--aria-text-primary': '#0b1020',
      '--aria-text-secondary': '#1d2a4d',
      '--aria-border': '#5c6ea3',
      '--aria-border-hover': '#46588d',
    },
  },
]
