import { useEffect, useMemo, useRef, useState, type CSSProperties, type ChangeEvent } from 'react'
import {
  AlertDialog,
  Button,
  ComboBox,
  ComboBoxItem,
  Dialog,
  DialogTrigger,
  DropdownItem,
  FieldDescription,
  FieldErrorText,
  FieldLabel,
  Heading,
  Input,
  InputAddon,
  InputGroup,
  Modal,
  Popover,
  Select,
  SelectItem,
  TextField,
  UIListBox,
  UIPicker,
  useListState,
} from 'aria-lab'
import { getContrastReport } from './contrast'
import { clearSavedTheme, generateCss, loadTheme, parseThemePayload, saveTheme, toThemePayload } from './theme-io'
import { initialVars, presets, themeEditorSections, type ThemeEditorField, type ThemeVars } from './tokens'

// Data constants
const ELEMENTS = [
  { id: '1', name: 'Hydrogen', description: 'H · 1.008 · Group 1' },
  { id: '2', name: 'Helium', description: 'He · 4.003 · Group 18' },
  { id: '3', name: 'Lithium', description: 'Li · 6.941 · Group 1' },
  { id: '4', name: 'Carbon', description: 'C · 12.011 · Group 14' },
  { id: '5', name: 'Oxygen', description: 'O · 15.999 · Group 16' },
  { id: '6', name: 'Neon', description: 'Ne · 20.180 · Group 18' },
]

const ELEMENTS_W_DISABLED = ELEMENTS.map((el, i) => ({
  ...el,
  disabled: i === 2 || i === 4,
}))

const TOKENS = [
  { var: '--aria-bg-primary', label: 'bg-primary' },
  { var: '--aria-bg-secondary', label: 'bg-secondary' },
  { var: '--aria-bg-tertiary', label: 'bg-tertiary' },
  { var: '--aria-accent', label: 'accent' },
  { var: '--aria-error', label: 'error' },
  { var: '--aria-success', label: 'success' },
  { var: '--aria-warning', label: 'warning' },
  { var: '--aria-border', label: 'border' },
]

const FRAMEWORKS = [
  { id: 'react', name: 'React' },
  { id: 'vue', name: 'Vue' },
  { id: 'svelte', name: 'Svelte' },
  { id: 'solid', name: 'Solid' },
]

const LANGUAGES = [
  { id: 'ts', name: 'TypeScript' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'python', name: 'Python' },
]

const CURRENCIES = [
  { id: 'usd', name: 'USD' },
  { id: 'eur', name: 'EUR' },
  { id: 'gbp', name: 'GBP' },
  { id: 'jpy', name: 'JPY' },
]

// Helper functions
function detectPresetId(vars: ThemeVars): string {
  const preset = presets.find((item) => JSON.stringify(item.vars) === JSON.stringify(vars))
  return preset?.id ?? 'custom'
}

// UI Components
function SectionHead({ num, title, description }: { num: string; title: string; description?: string }) {
  return (
    <div className="demo-section-head">
      <div className="demo-section-header-row">
        <span className="demo-section-num">{num}</span>
        <span className="demo-section-title">{title}</span>
      </div>
      {description && <p className="demo-section-desc">{description}</p>}
    </div>
  )
}

function Card({
  label,
  full,
  children,
  className = '',
}: {
  label?: string
  full?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`demo-card${full ? ' demo-card-full' : ''} ${className}`}>
      {label && <div className="demo-card-label">{label}</div>}
      {children}
    </div>
  )
}

function ComponentGrid({ children }: { children: React.ReactNode }) {
  return <div className="demo-grid">{children}</div>
}

// Theme Panel Types
interface ThemePanelProps {
  vars: ThemeVars
  onVarsChange: (vars: ThemeVars) => void
  activePresetId: string
  onPresetApply: (id: string) => void
  onClose: () => void
}

interface ToastMessage {
  id: number
  message: string
  tone: 'success' | 'info' | 'warning' | 'error'
}

// Enhanced Color Input Component
function ColorInput({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) {
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    if (/^#[0-9a-fA-F]{6}$/.test(newValue)) {
      onChange(newValue)
    }
  }

  return (
    <div className="demo-color-input-wrapper">
      <div
        className="demo-color-swatch"
        style={{ backgroundColor: localValue }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="color"
          value={localValue}
          onChange={handleChange}
          className="demo-color-native"
        />
      </div>
      <div className="demo-color-text-wrapper">
        <span className="demo-color-label">{label}</span>
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          className="demo-color-text"
          maxLength={7}
        />
      </div>
    </div>
  )
}

// Enhanced Theme Panel
function ThemePanel({ vars, onVarsChange, activePresetId, onPresetApply, onClose }: ThemePanelProps) {
  const [copied, setCopied] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [importWarnings, setImportWarnings] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'sizing'>('colors')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const generatedCss = useMemo(() => generateCss(vars), [vars])
  const contrastReport = useMemo(() => getContrastReport(vars), [vars])
  const activePresetVars = activePresetId === 'custom' ? initialVars : presets.find((p) => p.id === activePresetId)?.vars ?? initialVars
  const isDirty = JSON.stringify(vars) !== JSON.stringify(activePresetVars)

  const updateVar = (name: keyof ThemeVars, value: string) => {
    onVarsChange({ ...vars, [name]: value })
  }

  const showToast = (message: string, tone: ToastMessage['tone'] = 'info') => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setToasts((prev) => [...prev, { id, message, tone }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)
  }

  const renderFieldControl = (field: ThemeEditorField) => {
    if (field.control === 'color') {
      return (
        <ColorInput
          value={vars[field.key]}
          onChange={(value) => updateVar(field.key, value)}
          label={field.label}
        />
      )
    }

    if (field.control === 'select') {
      return (
        <div className="demo-select-wrapper">
          <select
            value={vars[field.key]}
            onChange={(e) => updateVar(field.key, e.target.value)}
            className="demo-theme-select"
          >
            {(field.options ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )
    }

    return (
      <input
        type="text"
        value={vars[field.key]}
        onChange={(e) => updateVar(field.key, e.target.value)}
        className="demo-theme-text-input"
      />
    )
  }

  const copyCss = async () => {
    await navigator.clipboard.writeText(generatedCss)
    setCopied(true)
    showToast('CSS copied to clipboard', 'success')
    setTimeout(() => setCopied(false), 1200)
  }

  const copyJson = async () => {
    const payload = JSON.stringify(toThemePayload(vars), null, 2)
    await navigator.clipboard.writeText(payload)
    showToast('JSON copied to clipboard', 'success')
  }

  const resetTheme = () => {
    onVarsChange(initialVars)
    onPresetApply('default')
    setImportWarnings([])
    clearSavedTheme()
    showToast('Theme reset to default', 'info')
  }

  const applyPreset = (presetId: string) => {
    const preset = presets.find((item) => item.id === presetId)
    if (!preset) return
    onVarsChange(preset.vars)
    onPresetApply(preset.id)
    setImportWarnings([])
    showToast(`Preset applied: ${preset.name}`, 'info')
  }

  const exportJson = () => {
    const payload = JSON.stringify(toThemePayload(vars), null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'aria-lab-theme.json'
    link.click()
    URL.revokeObjectURL(url)
    showToast('JSON theme exported', 'success')
  }

  const downloadCss = () => {
    const blob = new Blob([generatedCss], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'theme.css'
    link.click()
    URL.revokeObjectURL(url)
    showToast('CSS downloaded', 'success')
  }

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const imported = parseThemePayload(text)
    onVarsChange(imported.vars)
    onPresetApply(detectPresetId(imported.vars))
    setImportWarnings(imported.warnings)
    showToast(imported.warnings.length > 0 ? 'Theme imported with warnings' : 'Theme imported', imported.warnings.length > 0 ? 'warning' : 'success')
    event.target.value = ''
  }

  // Filter sections by active tab
  const filteredSections = themeEditorSections.filter((section) => {
    if (activeTab === 'colors') return section.id === 'colors'
    if (activeTab === 'typography') return section.id === 'typography'
    if (activeTab === 'sizing') return section.id === 'sizing' || section.id === 'radius'
    return true
  })

  // Calculate accessibility score
  const accessibilityScore = useMemo(() => {
    const passCount = contrastReport.filter((item) => item.aaPass).length
    return Math.round((passCount / contrastReport.length) * 100)
  }, [contrastReport])

  return (
    <div className="demo-theme-panel">
      <div className="demo-theme-panel-header">
        <div className="demo-theme-panel-header-left">
          <h2>Theme Studio</h2>
          <span className={`demo-theme-status-badge ${isDirty ? 'unsaved' : 'synced'}`}>
            {isDirty ? 'Unsaved' : 'Synced'}
          </span>
        </div>
        <Button variant="ghost" size="icon-sm" onPress={onClose} aria-label="Close panel">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>

      <div className="demo-theme-panel-tabs">
        <button
          className={`demo-theme-tab ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          Colors
        </button>
        <button
          className={`demo-theme-tab ${activeTab === 'typography' ? 'active' : ''}`}
          onClick={() => setActiveTab('typography')}
        >
          Typography
        </button>
        <button
          className={`demo-theme-tab ${activeTab === 'sizing' ? 'active' : ''}`}
          onClick={() => setActiveTab('sizing')}
        >
          Sizing
        </button>
      </div>

      <div className="demo-theme-panel-body">
        {/* Presets Section - Always visible */}
        <section className="demo-theme-section-presets">
          <h3>Presets</h3>
          <div className="demo-theme-preset-grid">
            {presets.map((preset) => (
              <button
                key={preset.id}
                className={`demo-preset-card ${activePresetId === preset.id ? 'active' : ''}`}
                onClick={() => applyPreset(preset.id)}
              >
                <div className="demo-preset-preview" style={{ background: preset.vars['--aria-accent'] }} />
                <span className="demo-preset-name">{preset.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Dynamic sections based on tab */}
        {filteredSections.map((section) => (
          <section key={section.id} className="demo-theme-section">
            <h3>{section.title}</h3>
            <div className={section.layout === 'grid' ? 'demo-theme-controls-grid' : 'demo-theme-row'}>
              {section.fields.map((field) => (
                <div key={field.key} className="demo-theme-field">
                  {renderFieldControl(field)}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Accessibility Section */}
        <section className="demo-theme-section-accessibility">
          <div className="demo-accessibility-header">
            <h3>Accessibility</h3>
            <div className={`demo-a11y-score ${accessibilityScore === 100 ? 'perfect' : accessibilityScore >= 80 ? 'good' : 'needs-work'}`}>
              <span className="demo-a11y-score-value">{accessibilityScore}%</span>
              <span className="demo-a11y-score-label">WCAG AA</span>
            </div>
          </div>
          <div className="demo-theme-contrast-list">
            {contrastReport.map((item) => (
              <div key={item.label} className={`demo-contrast-item ${item.aaPass ? 'pass' : 'fail'}`}>
                <div className="demo-contrast-info">
                  <span className="demo-contrast-label">{item.label}</span>
                  <span className="demo-contrast-ratio">{item.ratio ? item.ratio.toFixed(2) : 'n/a'} : 1</span>
                </div>
                <span className={`demo-contrast-badge ${item.aaPass ? 'pass' : 'fail'}`}>
                  {item.aaPass ? 'AA Pass' : 'AA Fail'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Export Section */}
        <section className="demo-theme-section-export">
          <h3>Export & Import</h3>
          <div className="demo-theme-code-block">
            <div className="demo-theme-code-header">
              <span>Generated CSS</span>
              <button className="demo-code-copy" onClick={copyCss}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea readOnly value={generatedCss} rows={8} className="demo-theme-textarea" />
          </div>
          <div className="demo-theme-actions">
            <Button variant="primary" size="sm" onPress={copyCss}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginRight: '6px' }}>
                <path d="M13.333 6H7.333C6.597 6 6 6.597 6 7.333v6C6 14.07 6.597 14.667 7.333 14.667h6c.737 0 1.334-.597 1.334-1.334v-6C14.667 6.597 14.07 6 13.333 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.333 10h-.666a1.333 1.333 0 01-1.334-1.333v-6a1.333 1.333 0 011.334-1.334h6A1.333 1.333 0 0110 2.667v.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copy CSS
            </Button>
            <Button variant="secondary" size="sm" onPress={downloadCss}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginRight: '6px' }}>
                <path d="M8 2v8m0 0l-3-3m3 3l3-3M2 10v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download
            </Button>
            <Button variant="secondary" size="sm" onPress={copyJson}>
              Copy JSON
            </Button>
            <Button variant="secondary" size="sm" onPress={exportJson}>
              Export JSON
            </Button>
            <Button variant="secondary" size="sm" onPress={() => fileInputRef.current?.click()}>
              Import
            </Button>
            <Button variant="ghost" size="sm" onPress={resetTheme}>
              Reset
            </Button>
          </div>
          <input ref={fileInputRef} type="file" accept="application/json" className="demo-theme-hidden-input" onChange={handleImport} />
          {importWarnings.length > 0 && (
            <ul className="demo-theme-warnings">
              {importWarnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="demo-theme-toast-stack" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`demo-theme-toast ${toast.tone}`}>
            <span className={`demo-toast-icon ${toast.tone}`} />
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  )
}

// Main App
export default function App() {
  const [inputVal, setInputVal] = useState('')
  const [inputWithAddon, setInputWithAddon] = useState('')
  const [vars, setVars] = useState<ThemeVars>(() => loadTheme() ?? initialVars)
  const [activePresetId, setActivePresetId] = useState(() => detectPresetId(loadTheme() ?? initialVars))
  const [panelOpen, setPanelOpen] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  const single = useListState({ items: ELEMENTS, selectionMode: 'single' })
  const multi = useListState({ items: ELEMENTS, selectionMode: 'multiple' })
  const wdis = useListState({ items: ELEMENTS_W_DISABLED, selectionMode: 'multiple' })

  useEffect(() => {
    const timeout = window.setTimeout(() => saveTheme(vars), 250)
    return () => window.clearTimeout(timeout)
  }, [vars])

  const totalComponents = 12

  return (
    <div className="demo-root" style={vars as CSSProperties}>
      <div className="demo-bg" aria-hidden="true" />

      {/* ── Nav ── */}
      <nav className="demo-nav">
        <div className="demo-nav-inner">
          <div className="demo-nav-logo">
            <span className="logo-bracket">[</span>
            aria<span className="logo-accent">-</span>lab
            <span className="logo-bracket">]</span>
          </div>
          <div className="demo-nav-tags">
            <Button variant="ghost" size="sm" className="demo-nav-customize" onPress={() => setPanelOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginRight: '6px' }}>
                <path d="M8 1v2m0 12v2M1 8h2m12 0h2M3.343 3.343l1.414 1.414m8.486 8.486l1.414 1.414M3.343 12.657l1.414-1.414m8.486-8.486l1.414-1.414" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Customize
            </Button>
            <span className="demo-tag">v0.2.0</span>
            <span className="demo-tag">React 19</span>
            <span className="demo-tag demo-tag-green">Beta</span>
          </div>
        </div>
      </nav>

      {/* ── Theme Panel overlay ── */}
      {panelOpen && (
        <>
          <div className="demo-theme-backdrop" aria-hidden onClick={() => setPanelOpen(false)} />
          <aside className={`demo-theme-panel-wrap ${panelOpen ? 'is-open' : ''}`}>
            <ThemePanel
              vars={vars}
              onVarsChange={setVars}
              activePresetId={activePresetId}
              onPresetApply={setActivePresetId}
              onClose={() => setPanelOpen(false)}
            />
          </aside>
        </>
      )}

      {/* ── Hero ── */}
      <section className="demo-hero">
        <div className="demo-hero-badge">Component Laboratory</div>
        <h1 className="demo-hero-title">
          aria<span className="accent">-</span>lab
        </h1>
        <p className="demo-hero-desc">
          A composable React component library built on React Aria Components.
          Accessible by default, unstyled by design, infinitely customizable.
        </p>
        <div className="demo-hero-stats">
          <div className="demo-stat">
            <span className="demo-stat-val accent">{totalComponents}</span>
            <span className="demo-stat-label">Components</span>
          </div>
          <div className="demo-stat">
            <span className="demo-stat-val">100%</span>
            <span className="demo-stat-label">TypeScript</span>
          </div>
          <div className="demo-stat">
            <span className="demo-stat-val">WCAG 2.1</span>
            <span className="demo-stat-label">AA Compliant</span>
          </div>
        </div>
      </section>

      {/* ── Main ── */}
      <main className="demo-main">

        {/* 01 BUTTON */}
        <section className="demo-section" style={{ animationDelay: '80ms' }}>
          <SectionHead
            num="01"
            title="Button"
            description="Versatile button component with multiple variants, sizes, and states."
          />
          <ComponentGrid>
            <Card label="Variants" full>
              <div className="demo-row">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </Card>
            <Card label="Sizes">
              <div className="demo-row demo-row-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </Card>
            <Card label="Icon Buttons">
              <div className="demo-row demo-row-center">
                <Button size="icon-sm" variant="secondary" aria-label="Settings">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 4a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </Button>
                <Button size="icon" variant="secondary" aria-label="Settings">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 4a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </Button>
                <Button size="icon-lg" variant="secondary" aria-label="Settings">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 4a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </Button>
              </div>
            </Card>
            <Card label="States">
              <div className="demo-row">
                <Button variant="primary" isDisabled>Disabled</Button>
                <Button variant="secondary" isDisabled>Disabled</Button>
                <Button variant="primary" isPending>Loading...</Button>
              </div>
            </Card>
          </ComponentGrid>
        </section>

        {/* 02 INPUT */}
        <section className="demo-section" style={{ animationDelay: '160ms' }}>
          <SectionHead
            num="02"
            title="Input"
            description="Text input with variants, sizes, and addon support."
          />
          <ComponentGrid>
            <Card label="Default">
              <div className="demo-col">
                <Input
                  placeholder="Type something..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                />
              </div>
            </Card>
            <Card label="Error State">
              <div className="demo-col">
                <Input placeholder="Invalid input" variant="error" defaultValue="error@example" />
              </div>
            </Card>
            <Card label="Disabled">
              <div className="demo-col">
                <Input placeholder="Disabled input" isDisabled defaultValue="Can't edit this" />
              </div>
            </Card>
            <Card label="Sizes">
              <div className="demo-col">
                <Input size="sm" placeholder="Small input" />
                <Input size="md" placeholder="Medium input" />
                <Input size="lg" placeholder="Large input" />
              </div>
            </Card>
            <Card label="With Addons" full>
              <div className="demo-row">
                <InputGroup>
                  <InputAddon position="left">$</InputAddon>
                  <Input
                    placeholder="0.00"
                    value={inputWithAddon}
                    onChange={(e) => setInputWithAddon(e.target.value)}
                    style={{ paddingLeft: '32px' }}
                  />
                </InputGroup>
                <InputGroup>
                  <Input placeholder="username" style={{ paddingRight: '80px' }} />
                  <InputAddon position="right">@github.com</InputAddon>
                </InputGroup>
                <InputGroup>
                  <InputAddon position="left">https://</InputAddon>
                  <Input placeholder="example.com" style={{ paddingLeft: '60px' }} />
                </InputGroup>
              </div>
            </Card>
          </ComponentGrid>
        </section>

        {/* 03 FIELD */}
        <section className="demo-section" style={{ animationDelay: '200ms' }}>
          <SectionHead
            num="03"
            title="Field"
            description="Form field primitives for labels, descriptions, and error messages."
          />
          <ComponentGrid>
            <Card label="Basic Field">
              <div className="demo-col">
                <FieldLabel>Email Address</FieldLabel>
                <Input placeholder="you@example.com" />
                <FieldDescription>We'll never share your email with anyone.</FieldDescription>
              </div>
            </Card>
            <Card label="With Error">
              <div className="demo-col">
                <FieldLabel>Username</FieldLabel>
                <Input placeholder="johndoe" variant="error" />
                <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
              </div>
            </Card>
            <Card label="Required Field">
              <div className="demo-col">
                <FieldLabel>
                  Password <span className="demo-required">*</span>
                </FieldLabel>
                <Input type="password" placeholder="••••••••" />
                <FieldDescription>Must be at least 8 characters with a number.</FieldDescription>
              </div>
            </Card>
          </ComponentGrid>
        </section>

        {/* 04 TEXTFIELD */}
        <section className="demo-section" style={{ animationDelay: '240ms' }}>
          <SectionHead
            num="04"
            title="TextField"
            description="Complete form field with label, input, and helper text."
          />
          <ComponentGrid>
            <Card label="Basic">
              <div className="demo-col">
                <TextField
                  label="Full Name"
                  placeholder="John Doe"
                />
              </div>
            </Card>
            <Card label="With Description">
              <div className="demo-col">
                <TextField
                  label="Email"
                  placeholder="you@example.com"
                  description="Used only for account notifications"
                />
              </div>
            </Card>
            <Card label="Required">
              <div className="demo-col">
                <TextField
                  label="Company"
                  placeholder="Acme Inc"
                  isRequired
                />
              </div>
            </Card>
          </ComponentGrid>
        </section>

        {/* 05 SELECT */}
        <section className="demo-section" style={{ animationDelay: '280ms' }}>
          <SectionHead
            num="05"
            title="Select"
            description="Dropdown selection with single and multiple choice support."
          />
          <ComponentGrid>
            <Card label="Single Select">
              <div className="demo-col">
                <Select
                  label="Framework"
                  placeholder="Choose framework"
                  items={FRAMEWORKS}
                >
                  {(item) => (
                    <SelectItem id={item.id} textValue={item.name}>
                      {item.name}
                    </SelectItem>
                  )}
                </Select>
              </div>
            </Card>
            <Card label="With Description">
              <div className="demo-col">
                <Select
                  label="Currency"
                  placeholder="Select currency"
                  description="Your preferred billing currency"
                  items={CURRENCIES}
                >
                  {(item) => (
                    <SelectItem id={item.id} textValue={item.name}>
                      {item.name}
                    </SelectItem>
                  )}
                </Select>
              </div>
            </Card>
          </ComponentGrid>
        </section>

        {/* 06 COMBOBOX */}
        <section className="demo-section" style={{ animationDelay: '320ms' }}>
          <SectionHead
            num="06"
            title="ComboBox"
            description="Searchable dropdown with autocomplete functionality."
          />
          <ComponentGrid>
            <Card label="Basic">
              <div className="demo-col">
                <ComboBox
                  label="Language"
                  placeholder="Search language..."
                  items={LANGUAGES}
                >
                  {(item) => (
                    <ComboBoxItem id={item.id} textValue={item.name}>
                      {item.name}
                    </ComboBoxItem>
                  )}
                </ComboBox>
              </div>
            </Card>
            <Card label="With Description">
              <div className="demo-col">
                <ComboBox
                  label="Framework"
                  placeholder="Type to search..."
                  description="Start typing to filter options"
                  items={FRAMEWORKS}
                >
                  {(item) => (
                    <ComboBoxItem id={item.id} textValue={item.name}>
                      {item.name}
                    </ComboBoxItem>
                  )}
                </ComboBox>
              </div>
            </Card>
          </ComponentGrid>
        </section>

        {/* 07 POPOVER */}
        <section className="demo-section" style={{ animationDelay: '360ms' }}>
          <SectionHead
            num="07"
            title="Popover"
            description="Floating content panel for menus, tooltips, and dropdowns."
          />
          <ComponentGrid>
            <Card label="Basic Popover">
              <div className="demo-row">
                <DialogTrigger>
                  <Button variant="secondary">Open Popover</Button>
                  <Popover>
                    <div className="demo-popover-content">
                      <h4>Popover Title</h4>
                      <p>This is a popover with some content inside.</p>
                    </div>
                  </Popover>
                </DialogTrigger>
              </div>
            </Card>
            <Card label="With Actions">
              <div className="demo-row">
                <DialogTrigger>
                  <Button variant="secondary">Confirm Action</Button>
                  <Popover>
                    <div className="demo-popover-content">
                      <h4>Are you sure?</h4>
                      <p>This action cannot be undone.</p>
                      <div className="demo-popover-actions">
                        <Button size="sm" variant="ghost">Cancel</Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </div>
                    </div>
                  </Popover>
                </DialogTrigger>
              </div>
            </Card>
          </ComponentGrid>
        </section>

        {/* 08 DIALOG */}
        <section className="demo-section" style={{ animationDelay: '400ms' }}>
          <SectionHead
            num="08"
            title="Dialog & Modal"
            description="Modal dialogs for confirmations, forms, and complex interactions."
          />
          <ComponentGrid>
            <Card label="Basic Dialog">
              <div className="demo-row">
                <DialogTrigger>
                  <Button variant="secondary">Open Dialog</Button>
                  <Modal>
                    <Dialog>
                      {({ close }) => (
                        <>
                          <Heading slot="title" className="text-lg font-semibold text-[var(--aria-text-primary)]">
                            Team Invite
                          </Heading>
                          <p className="mt-2 text-sm text-[var(--aria-text-secondary)]">
                            Send an invite link so they can access this project.
                          </p>
                          <div className="mt-6 flex justify-end gap-2">
                            <Button variant="secondary" onPress={close}>Cancel</Button>
                            <Button onPress={close}>Send invite</Button>
                          </div>
                        </>
                      )}
                    </Dialog>
                  </Modal>
                </DialogTrigger>
              </div>
            </Card>
            <Card label="Alert Dialog">
              <div className="demo-row">
                <DialogTrigger>
                  <Button variant="destructive">Delete Project</Button>
                  <Modal>
                    <AlertDialog
                      title="Delete project"
                      actionLabel="Delete"
                      variant="destructive"
                    >
                      Are you sure you want to delete this project? This action cannot be undone.
                    </AlertDialog>
                  </Modal>
                </DialogTrigger>
              </div>
            </Card>
            <Card label="Form Dialog" full>
              <div className="demo-row">
                <DialogTrigger>
                  <Button variant="secondary">Create User</Button>
                  <Modal size="md">
                    <Dialog>
                      {({ close }) => (
                        <>
                          <Heading slot="title" className="text-lg font-semibold text-[var(--aria-text-primary)]">
                            Create New User
                          </Heading>
                          <div className="mt-4 space-y-4">
                            <TextField
                              label="Full Name"
                              placeholder="John Doe"
                              autoFocus
                            />
                            <TextField
                              label="Email"
                              placeholder="john@example.com"
                            />
                            <Select
                              label="Role"
                              placeholder="Select role"
                              items={[
                                { id: 'admin', name: 'Admin' },
                                { id: 'editor', name: 'Editor' },
                                { id: 'viewer', name: 'Viewer' },
                              ]}
                            >
                              {(item) => (
                                <SelectItem id={item.id} textValue={item.name}>
                                  {item.name}
                                </SelectItem>
                              )}
                            </Select>
                          </div>
                          <div className="mt-6 flex justify-end gap-2">
                            <Button variant="secondary" onPress={close}>Cancel</Button>
                            <Button onPress={close}>Create User</Button>
                          </div>
                        </>
                      )}
                    </Dialog>
                  </Modal>
                </DialogTrigger>
              </div>
            </Card>
          </ComponentGrid>
        </section>

        {/* 09 DROPDOWN */}
        <section className="demo-section" style={{ animationDelay: '440ms' }}>
          <SectionHead
            num="09"
            title="Dropdown"
            description="List items for menus and selection lists with keyboard navigation."
          />
          <ComponentGrid>
            <Card label="Dropdown Items">
              <div className="demo-dropdown-preview">
                <DropdownItem id="1">Account Settings</DropdownItem>
                <DropdownItem id="2">Billing</DropdownItem>
                <DropdownItem id="3">Notifications</DropdownItem>
                <DropdownItem id="4" isDisabled>Delete Account</DropdownItem>
              </div>
            </Card>
            <Card label="With Icons">
              <div className="demo-dropdown-preview">
                <DropdownItem id="1">
                  <span>✓</span> Profile
                </DropdownItem>
                <DropdownItem id="2">
                  <span>⚙</span> Settings
                </DropdownItem>
                <DropdownItem id="3">
                  <span>?</span> Help
                </DropdownItem>
              </div>
            </Card>
          </ComponentGrid>
        </section>

        {/* 10 UI LIST BOX */}
        <section className="demo-section" style={{ animationDelay: '480ms' }}>
          <SectionHead
            num="10"
            title="UIListBox"
            description="Accessible listbox with single and multiple selection modes."
          />
          <ComponentGrid>
            <Card label="Single Selection">
              <div className="demo-lb-wrap">
                <UIListBox
                  listId="lb-single"
                  items={ELEMENTS}
                  selectionMode="single"
                  selectedKeys={single.selectedKeys}
                  onSelectionChange={single.setSelectedKeys}
                />
              </div>
              {single.selectedKeys.size > 0 && (
                <div className="demo-selection-info">
                  Selected: {Array.from(single.selectedKeys).join(', ')}
                </div>
              )}
            </Card>

            <Card label="Multiple Selection">
              <div className="demo-lb-wrap">
                <UIListBox
                  listId="lb-multi"
                  items={ELEMENTS}
                  selectionMode="multiple"
                  selectedKeys={multi.selectedKeys}
                  onSelectionChange={multi.setSelectedKeys}
                />
              </div>
              <div className="demo-lb-actions">
                <button className="demo-action-btn" onClick={multi.selectAll}>Select All</button>
                <button className="demo-action-btn" onClick={multi.deselectAll}>Clear</button>
              </div>
            </Card>

            <Card label="With Disabled Items">
              <div className="demo-lb-wrap">
                <UIListBox
                  listId="lb-disabled"
                  items={ELEMENTS_W_DISABLED}
                  selectionMode="multiple"
                  selectedKeys={wdis.selectedKeys}
                  onSelectionChange={wdis.setSelectedKeys}
                />
              </div>
              <p style={{ fontSize: 11, color: 'var(--d-text-dim)', letterSpacing: '0.04em', marginTop: 8 }}>
                Lithium & Oxygen are disabled
              </p>
            </Card>
          </ComponentGrid>
        </section>

        {/* 11 UI PICKER */}
        <section className="demo-section" style={{ animationDelay: '520ms' }}>
          <SectionHead
            num="11"
            title="UIPicker"
            description="Command palette style picker with search and filtering."
          />
          <ComponentGrid>
            <Card label="Picker" full>
              <div className="demo-row">
                <Button variant="secondary" onPress={() => setShowPicker(!showPicker)}>
                  {showPicker ? 'Hide Picker' : 'Show Picker'}
                </Button>
              </div>
              {showPicker && (
                <div className="demo-picker-wrapper">
                  <UIPicker />
                </div>
              )}
            </Card>
          </ComponentGrid>
        </section>

        {/* 12 DESIGN TOKENS */}
        <section className="demo-section" style={{ animationDelay: '560ms' }}>
          <SectionHead
            num="12"
            title="Design Tokens"
            description="CSS custom properties powering the entire design system."
          />
          <div className="demo-tokens">
            {TOKENS.map((t) => (
              <div key={t.var} className="demo-token">
                <div
                  className="demo-token-swatch"
                  style={{ background: `var(${t.var})` }}
                />
                <div className="demo-token-info">
                  <span className="demo-token-name">{t.var}</span>
                  <span className="demo-token-label">{t.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="demo-footer">
        <div className="demo-footer-inner">
          <div className="demo-footer-left">
            <span className="demo-footer-logo">aria-lab</span>
            <span className="demo-footer-divider">·</span>
            <span>2025</span>
            <span className="demo-footer-divider">·</span>
            <span>MIT License</span>
          </div>
          <div className="demo-footer-right">
            <span>Built with React Aria Components</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
