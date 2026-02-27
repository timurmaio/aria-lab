import { useMemo, useState, type CSSProperties } from 'react'
import {
  AlertDialog,
  Button,
  ComboBox,
  ComboBoxItem,
  Dialog,
  Input,
  Modal,
  Select,
  SelectItem,
  TextField,
} from 'aria-lab'
import { DialogTrigger, Heading } from 'react-aria-components'

type ThemeVars = Record<string, string>

const fontOptions = {
  manrope: "'Manrope', system-ui, sans-serif",
  plex: "'IBM Plex Sans', system-ui, sans-serif",
  space: "'Space Grotesk', system-ui, sans-serif",
} as const

const initialVars: ThemeVars = {
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

const frameworkItems = [
  { id: 'react', name: 'React' },
  { id: 'vue', name: 'Vue' },
  { id: 'svelte', name: 'Svelte' },
]

const languageItems = [
  { id: 'ts', name: 'TypeScript' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
]

function cssOutput(vars: ThemeVars) {
  const lines = Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`)
  return `:root {\n${lines.join('\n')}\n}`
}

export default function App() {
  const [vars, setVars] = useState<ThemeVars>(initialVars)
  const [copied, setCopied] = useState(false)

  const generatedCss = useMemo(() => cssOutput(vars), [vars])

  const updateVar = (name: string, value: string) => {
    setVars((prev: ThemeVars) => ({ ...prev, [name]: value }))
  }

  const copyCss = async () => {
    await navigator.clipboard.writeText(generatedCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  const resetTheme = () => setVars(initialVars)

  return (
    <div className="themegen-root" style={vars as CSSProperties}>
      <header className="themegen-header">
        <h1>aria-lab theme generator</h1>
        <p>Adjust tokens visually and export a ready-to-paste `theme.css`.</p>
      </header>

      <main className="themegen-main">
        <aside className="themegen-panel">
          <section>
            <h2>Colors</h2>
            <div className="controls-grid">
              <label>Accent<input type="color" value={vars['--aria-accent']} onChange={(e) => updateVar('--aria-accent', e.target.value)} /></label>
              <label>Accent Hover<input type="color" value={vars['--aria-accent-hover']} onChange={(e) => updateVar('--aria-accent-hover', e.target.value)} /></label>
              <label>Background<input type="color" value={vars['--aria-bg-primary']} onChange={(e) => updateVar('--aria-bg-primary', e.target.value)} /></label>
              <label>Surface<input type="color" value={vars['--aria-bg-secondary']} onChange={(e) => updateVar('--aria-bg-secondary', e.target.value)} /></label>
              <label>Text<input type="color" value={vars['--aria-text-primary']} onChange={(e) => updateVar('--aria-text-primary', e.target.value)} /></label>
              <label>Border<input type="color" value={vars['--aria-border']} onChange={(e) => updateVar('--aria-border', e.target.value)} /></label>
            </div>
          </section>

          <section>
            <h2>Typography</h2>
            <label className="row">
              Font family
              <select
                value={vars['--aria-font-sans']}
                onChange={(e) => updateVar('--aria-font-sans', e.target.value)}
              >
                <option value={fontOptions.manrope}>Manrope</option>
                <option value={fontOptions.plex}>IBM Plex Sans</option>
                <option value={fontOptions.space}>Space Grotesk</option>
              </select>
            </label>
          </section>

          <section>
            <h2>Sizing and Spacing</h2>
            <div className="controls-grid">
              <label>Control sm<input type="text" value={vars['--aria-control-height-sm']} onChange={(e) => updateVar('--aria-control-height-sm', e.target.value)} /></label>
              <label>Control md<input type="text" value={vars['--aria-control-height-md']} onChange={(e) => updateVar('--aria-control-height-md', e.target.value)} /></label>
              <label>Control lg<input type="text" value={vars['--aria-control-height-lg']} onChange={(e) => updateVar('--aria-control-height-lg', e.target.value)} /></label>
              <label>Space 2<input type="text" value={vars['--aria-space-2']} onChange={(e) => updateVar('--aria-space-2', e.target.value)} /></label>
              <label>Space 4<input type="text" value={vars['--aria-space-4']} onChange={(e) => updateVar('--aria-space-4', e.target.value)} /></label>
              <label>Space 8<input type="text" value={vars['--aria-space-8']} onChange={(e) => updateVar('--aria-space-8', e.target.value)} /></label>
            </div>
          </section>

          <section>
            <h2>Radius</h2>
            <div className="controls-grid">
              <label>Radius sm<input type="text" value={vars['--aria-radius-sm']} onChange={(e) => updateVar('--aria-radius-sm', e.target.value)} /></label>
              <label>Radius md<input type="text" value={vars['--aria-radius-md']} onChange={(e) => updateVar('--aria-radius-md', e.target.value)} /></label>
              <label>Radius lg<input type="text" value={vars['--aria-radius-lg']} onChange={(e) => updateVar('--aria-radius-lg', e.target.value)} /></label>
            </div>
          </section>

          <section>
            <h2>Export</h2>
            <textarea readOnly value={generatedCss} rows={10} />
            <div className="actions">
              <Button onPress={copyCss}>{copied ? 'Copied!' : 'Copy CSS'}</Button>
              <Button variant="secondary" onPress={resetTheme}>Reset</Button>
            </div>
          </section>
        </aside>

        <section className="themegen-preview">
          <h2>Preview</h2>
          <div className="preview-card">
            <div className="preview-row">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="preview-col">
              <Input placeholder="Email" />
              <TextField label="Project name" placeholder="New project" description="Used in workspace header" />
              <Select label="Framework" placeholder="Choose framework" items={frameworkItems}>
                {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
              </Select>
              <ComboBox label="Language" placeholder="Search language" items={languageItems}>
                {(item) => <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>}
              </ComboBox>
            </div>
            <DialogTrigger>
              <Button variant="secondary">Open AlertDialog</Button>
              <Modal>
                <AlertDialog title="Publish package" actionLabel="Publish" variant="info">
                  This will publish your package to npm with the selected version.
                </AlertDialog>
              </Modal>
            </DialogTrigger>
            <DialogTrigger>
              <Button variant="destructive">Open Dialog</Button>
              <Modal size="sm">
                <Dialog>
                  {({ close }) => (
                    <>
                      <Heading slot="title">Remove token set</Heading>
                      <p className="modal-text">This action removes the token set from the workspace.</p>
                      <div className="actions">
                        <Button variant="secondary" onPress={close}>Cancel</Button>
                        <Button variant="destructive" onPress={close}>Delete</Button>
                      </div>
                    </>
                  )}
                </Dialog>
              </Modal>
            </DialogTrigger>
          </div>
        </section>
      </main>
    </div>
  )
}
