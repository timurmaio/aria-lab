export const ELEMENTS = [
  { id: '1', name: 'Hydrogen', description: 'H · 1.008 · Group 1' },
  { id: '2', name: 'Helium', description: 'He · 4.003 · Group 18' },
  { id: '3', name: 'Lithium', description: 'Li · 6.941 · Group 1' },
  { id: '4', name: 'Carbon', description: 'C · 12.011 · Group 14' },
  { id: '5', name: 'Oxygen', description: 'O · 15.999 · Group 16' },
  { id: '6', name: 'Neon', description: 'Ne · 20.180 · Group 18' },
]

export const ELEMENTS_W_DISABLED = ELEMENTS.map((el, i) => ({
  ...el,
  disabled: i === 2 || i === 4,
}))

export const TOKENS = [
  { var: '--aria-bg-primary', label: 'bg-primary' },
  { var: '--aria-bg-secondary', label: 'bg-secondary' },
  { var: '--aria-bg-tertiary', label: 'bg-tertiary' },
  { var: '--aria-accent', label: 'accent' },
  { var: '--aria-error', label: 'error' },
  { var: '--aria-success', label: 'success' },
  { var: '--aria-warning', label: 'warning' },
  { var: '--aria-border', label: 'border' },
]

export const FRAMEWORKS = [
  { id: 'react', name: 'React' },
  { id: 'vue', name: 'Vue' },
  { id: 'svelte', name: 'Svelte' },
  { id: 'solid', name: 'Solid' },
]

export const LANGUAGES = [
  { id: 'ts', name: 'TypeScript' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'python', name: 'Python' },
]

export const CURRENCIES = [
  { id: 'usd', name: 'USD' },
  { id: 'eur', name: 'EUR' },
  { id: 'gbp', name: 'GBP' },
  { id: 'jpy', name: 'JPY' },
]
