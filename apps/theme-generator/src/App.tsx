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
type AppTheme = 'light' | 'dark'

const fontOptions = {
  manrope: "'Manrope', system-ui, sans-serif",
  plex: "'IBM Plex Sans', system-ui, sans-serif",
  space: "'Space Grotesk', system-ui, sans-serif",
  geist: "'Geist', system-ui, sans-serif",
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
  '--aria-font-sans': fontOptions.geist,
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

// Render `:root { ... }` as highlighted HTML spans
function renderCssHighlighted(vars: ThemeVars): string {
  const lines = Object.entries(vars)
    .map(
      ([key, value]) =>
        `  <span class="css-prop">${key}</span><span class="css-punct">:</span> <span class="css-value">${value}</span><span class="css-punct">;</span>`,
    )
    .join('\n')
  return (
    `<span class="css-selector">:root</span> <span class="css-bracket">{</span>\n` +
    lines +
    `\n<span class="css-bracket">}</span>`
  )
}

function cssOutput(vars: ThemeVars) {
  const lines = Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`)
  return `:root {\n${lines.join('\n')}\n}`
}

// ── SVG Icons ──────────────────────────────────────────────────────────────
function IconSun() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function IconCopy() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

function IconLogo() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}

// ── Color Control ──────────────────────────────────────────────────────────
interface ColorControlProps {
  value: string
  onChange: (v: string) => void
}

function ColorControl({ value, onChange }: ColorControlProps) {
  return (
    <div className="color-control">
      <div className="color-swatch-btn">
        <div className="color-swatch-preview" style={{ background: value }} />
        <input
          type="color"
          className="color-swatch-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <input
        type="text"
        className="color-hex-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  )
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [vars, setVars] = useState<ThemeVars>(initialVars)
  const [copied, setCopied] = useState(false)
  const [appTheme, setAppTheme] = useState<AppTheme>('light')

  const generatedCss = useMemo(() => cssOutput(vars), [vars])
  const highlightedCss = useMemo(() => renderCssHighlighted(vars), [vars])

  const updateVar = (name: string, value: string) => {
    setVars((prev: ThemeVars) => ({ ...prev, [name]: value }))
  }

  const copyCss = async () => {
    await navigator.clipboard.writeText(generatedCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const resetTheme = () => setVars(initialVars)

  const toggleAppTheme = () =>
    setAppTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <div
      className="themegen-root"
      data-theme={appTheme}
      style={vars as CSSProperties}
    >
      {/* ── Header ── */}
      <header className="themegen-header">
        <div className="themegen-header-left">
          <div className="themegen-logo">
            <div className="themegen-logo-icon">
              <IconLogo />
            </div>
            <span className="themegen-logo-name">aria-lab</span>
          </div>
          <span className="themegen-badge">Theme Generator</span>
        </div>

        <div className="themegen-header-right">
          <button className="theme-toggle" onClick={toggleAppTheme} aria-label="Toggle theme">
            {appTheme === 'light' ? <IconMoon /> : <IconSun />}
          </button>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="themegen-main">

        {/* ── Controls Panel ── */}
        <aside className="themegen-panel">

          {/* Colors */}
          <div className="panel-section">
            <span className="panel-section-title">Colors</span>
            <div className="controls-grid">
              <div className="control-label">
                Accent
                <ColorControl value={vars['--aria-accent']} onChange={(v) => updateVar('--aria-accent', v)} />
              </div>
              <div className="control-label">
                Accent Hover
                <ColorControl value={vars['--aria-accent-hover']} onChange={(v) => updateVar('--aria-accent-hover', v)} />
              </div>
              <div className="control-label">
                Background
                <ColorControl value={vars['--aria-bg-primary']} onChange={(v) => updateVar('--aria-bg-primary', v)} />
              </div>
              <div className="control-label">
                Surface
                <ColorControl value={vars['--aria-bg-secondary']} onChange={(v) => updateVar('--aria-bg-secondary', v)} />
              </div>
              <div className="control-label">
                Text
                <ColorControl value={vars['--aria-text-primary']} onChange={(v) => updateVar('--aria-text-primary', v)} />
              </div>
              <div className="control-label">
                Border
                <ColorControl value={vars['--aria-border']} onChange={(v) => updateVar('--aria-border', v)} />
              </div>
              <div className="control-label">
                Error
                <ColorControl value={vars['--aria-error']} onChange={(v) => updateVar('--aria-error', v)} />
              </div>
              <div className="control-label">
                Success
                <ColorControl value={vars['--aria-success']} onChange={(v) => updateVar('--aria-success', v)} />
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="panel-section">
            <span className="panel-section-title">Typography</span>
            <div className="controls-grid-1">
              <div className="control-label">
                Font family
                <select
                  className="control-select"
                  value={vars['--aria-font-sans']}
                  onChange={(e) => updateVar('--aria-font-sans', e.target.value)}
                >
                  <option value={fontOptions.geist}>Geist</option>
                  <option value={fontOptions.manrope}>Manrope</option>
                  <option value={fontOptions.plex}>IBM Plex Sans</option>
                  <option value={fontOptions.space}>Space Grotesk</option>
                </select>
              </div>
            </div>
          </div>

          {/* Radius */}
          <div className="panel-section">
            <span className="panel-section-title">Border Radius</span>
            <div className="controls-grid">
              <div className="control-label">
                sm
                <input className="control-input" type="text" value={vars['--aria-radius-sm']} onChange={(e) => updateVar('--aria-radius-sm', e.target.value)} />
              </div>
              <div className="control-label">
                md
                <input className="control-input" type="text" value={vars['--aria-radius-md']} onChange={(e) => updateVar('--aria-radius-md', e.target.value)} />
              </div>
              <div className="control-label">
                lg
                <input className="control-input" type="text" value={vars['--aria-radius-lg']} onChange={(e) => updateVar('--aria-radius-lg', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Sizing */}
          <div className="panel-section">
            <span className="panel-section-title">Control Height</span>
            <div className="controls-grid">
              <div className="control-label">
                sm
                <input className="control-input" type="text" value={vars['--aria-control-height-sm']} onChange={(e) => updateVar('--aria-control-height-sm', e.target.value)} />
              </div>
              <div className="control-label">
                md
                <input className="control-input" type="text" value={vars['--aria-control-height-md']} onChange={(e) => updateVar('--aria-control-height-md', e.target.value)} />
              </div>
              <div className="control-label">
                lg
                <input className="control-input" type="text" value={vars['--aria-control-height-lg']} onChange={(e) => updateVar('--aria-control-height-lg', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Spacing */}
          <div className="panel-section">
            <span className="panel-section-title">Spacing Scale</span>
            <div className="controls-grid">
              <div className="control-label">
                space-2
                <input className="control-input" type="text" value={vars['--aria-space-2']} onChange={(e) => updateVar('--aria-space-2', e.target.value)} />
              </div>
              <div className="control-label">
                space-4
                <input className="control-input" type="text" value={vars['--aria-space-4']} onChange={(e) => updateVar('--aria-space-4', e.target.value)} />
              </div>
              <div className="control-label">
                space-6
                <input className="control-input" type="text" value={vars['--aria-space-6']} onChange={(e) => updateVar('--aria-space-6', e.target.value)} />
              </div>
              <div className="control-label">
                space-8
                <input className="control-input" type="text" value={vars['--aria-space-8']} onChange={(e) => updateVar('--aria-space-8', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Export */}
          <div className="panel-section">
            <span className="panel-section-title">Export</span>
            <div className="export-code-wrapper">
              <div className="export-code-header">
                <span className="export-code-lang">theme.css</span>
                <button
                  className={`export-copy-btn${copied ? ' copied' : ''}`}
                  onClick={copyCss}
                >
                  {copied ? <IconCheck /> : <IconCopy />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre
                className="export-code-pre"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: syntax highlighting
                dangerouslySetInnerHTML={{ __html: highlightedCss }}
              />
            </div>
            <div className="export-actions">
              <button className="btn btn-outline" onClick={resetTheme}>
                Reset to defaults
              </button>
            </div>
          </div>

        </aside>

        {/* ── Preview Panel ── */}
        <section className="themegen-preview">
          <div className="preview-header">
            <h2>Preview</h2>
          </div>

          <div className="preview-stage">
            {/* Buttons */}
            <div className="preview-section">
              <div className="preview-section-label">Buttons</div>
              <div className="preview-stage-bg" style={{ minHeight: 'auto', padding: '1.25rem' }}>
                <div className="preview-row">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="preview-section">
              <div className="preview-section-label">Form Inputs</div>
              <div className="preview-stage-bg" style={{ minHeight: 'auto', padding: '1.25rem' }}>
                <div className="preview-col">
                  <Input placeholder="Email address" />
                  <TextField
                    label="Project name"
                    placeholder="my-awesome-project"
                    description="Used in workspace header and URLs"
                  />
                  <Select label="Framework" placeholder="Choose framework" items={frameworkItems}>
                    {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
                  </Select>
                  <ComboBox label="Language" placeholder="Search language" items={languageItems}>
                    {(item) => <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>}
                  </ComboBox>
                </div>
              </div>
            </div>

            {/* Dialogs */}
            <div className="preview-section">
              <div className="preview-section-label">Dialogs</div>
              <div className="preview-stage-bg" style={{ minHeight: 'auto', padding: '1.25rem' }}>
                <div className="preview-dialogs">
                  <DialogTrigger>
                    <Button variant="secondary">Open AlertDialog</Button>
                    <Modal>
                      <AlertDialog title="Publish package" actionLabel="Publish" variant="info">
                        This will publish your package to npm with the selected version. Make sure your
                        changelog is up to date before continuing.
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
                            <p className="modal-text">
                              This action removes the token set from the workspace. This cannot be
                              undone.
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                              <Button variant="secondary" onPress={close}>
                                Cancel
                              </Button>
                              <Button variant="destructive" onPress={close}>
                                Delete
                              </Button>
                            </div>
                          </>
                        )}
                      </Dialog>
                    </Modal>
                  </DialogTrigger>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
