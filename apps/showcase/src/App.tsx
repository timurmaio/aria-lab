import { useEffect, useMemo, useRef, useState, type CSSProperties, type ChangeEvent } from 'react'
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
  UIListBox,
  useListState,
} from 'aria-lab'
import { DialogTrigger, Heading } from 'react-aria-components'
import { getContrastReport } from './contrast'
import { clearSavedTheme, generateCss, loadTheme, parseThemePayload, saveTheme, toThemePayload } from './theme-io'
import { initialVars, presets, themeEditorSections, type ThemeEditorField, type ThemeVars } from './tokens'

const ELEMENTS = [
  { id: '1', name: 'Hydrogen',   description: 'H · 1.008 · Group 1'  },
  { id: '2', name: 'Helium',     description: 'He · 4.003 · Group 18' },
  { id: '3', name: 'Lithium',    description: 'Li · 6.941 · Group 1'  },
  { id: '4', name: 'Carbon',     description: 'C · 12.011 · Group 14' },
  { id: '5', name: 'Oxygen',     description: 'O · 15.999 · Group 16' },
  { id: '6', name: 'Neon',       description: 'Ne · 20.180 · Group 18'},
]

const ELEMENTS_W_DISABLED = ELEMENTS.map((el, i) => ({
  ...el,
  disabled: i === 2 || i === 4,
}))

const TOKENS = [
  { var: '--aria-bg-primary',   label: 'bg-primary'   },
  { var: '--aria-bg-secondary',  label: 'bg-secondary' },
  { var: '--aria-bg-tertiary',  label: 'bg-tertiary'  },
  { var: '--aria-accent',       label: 'accent'       },
  { var: '--aria-error',        label: 'error'        },
  { var: '--aria-success',      label: 'success'      },
  { var: '--aria-warning',      label: 'warning'      },
  { var: '--aria-border',       label: 'border'       },
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

function detectPresetId(vars: ThemeVars): string {
  const preset = presets.find((item) => JSON.stringify(item.vars) === JSON.stringify(vars))
  return preset?.id ?? 'custom'
}

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="demo-section-head">
      <span className="demo-section-num">{num} /</span>
      <span className="demo-section-title">{title}</span>
    </div>
  )
}

function Card({
  label,
  full,
  children,
}: {
  label?: string
  full?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={`demo-card${full ? ' demo-card-full' : ''}`}>
      {label && <div className="demo-card-label">{label}</div>}
      {children}
    </div>
  )
}

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
  tone: 'success' | 'info' | 'warning'
}

function ThemePanel({ vars, onVarsChange, activePresetId, onPresetApply, onClose }: ThemePanelProps) {
  const [copied, setCopied] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [importWarnings, setImportWarnings] = useState<string[]>([])
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
    }, 2200)
  }

  const renderFieldControl = (field: ThemeEditorField) => {
    if (field.control === 'select') {
      return (
        <select value={vars[field.key]} onChange={(e) => updateVar(field.key, e.target.value)}>
          {(field.options ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    }

    return (
      <input
        type={field.control}
        value={vars[field.key]}
        onChange={(e) => updateVar(field.key, e.target.value)}
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

  return (
    <div className="demo-theme-panel">
      <div className="demo-theme-panel-header">
        <h2>Customize theme</h2>
        <Button variant="ghost" size="icon-sm" onPress={onClose} aria-label="Close panel">
          ✕
        </Button>
      </div>
      <div className="demo-theme-panel-body">
        <section>
          <h3>Presets</h3>
          <div className="demo-theme-preset-row">
            {presets.map((preset) => (
              <Button
                key={preset.id}
                variant={activePresetId === preset.id ? 'primary' : 'secondary'}
                onPress={() => applyPreset(preset.id)}
              >
                {preset.name}
              </Button>
            ))}
          </div>
          <p className="demo-theme-status">{isDirty ? 'Unsaved changes' : 'In sync with preset'}</p>
        </section>

        {themeEditorSections.map((section) => (
          <section key={section.id}>
            <h3>{section.title}</h3>
            <div className={section.layout === 'grid' ? 'demo-theme-controls-grid' : 'demo-theme-row'}>
              {section.fields.map((field) => (
                <label key={field.key}>
                  {field.label}
                  {renderFieldControl(field)}
                </label>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h3>Accessibility</h3>
          <ul className="demo-theme-contrast-list">
            {contrastReport.map((item) => (
              <li key={item.label} className={item.aaPass ? 'pass' : 'fail'}>
                <span>{item.label}</span>
                <span>{item.ratio ? item.ratio.toFixed(2) : 'n/a'} : 1</span>
                <span>{item.aaPass ? 'AA pass' : 'AA fail'}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Export and Import</h3>
          <textarea readOnly value={generatedCss} rows={9} className="demo-theme-textarea" />
          <div className="demo-theme-actions">
            <Button onPress={copyCss}>{copied ? 'Copied!' : 'Copy CSS'}</Button>
            <Button variant="secondary" onPress={downloadCss}>Download CSS</Button>
            <Button variant="secondary" onPress={copyJson}>Copy JSON</Button>
            <Button variant="secondary" onPress={exportJson}>Export JSON</Button>
            <Button variant="secondary" onPress={() => fileInputRef.current?.click()}>Import JSON</Button>
            <Button variant="secondary" onPress={resetTheme}>Reset</Button>
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
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [inputVal, setInputVal] = useState('')
  const [vars, setVars] = useState<ThemeVars>(() => loadTheme() ?? initialVars)
  const [activePresetId, setActivePresetId] = useState(() => detectPresetId(loadTheme() ?? initialVars))
  const [panelOpen, setPanelOpen] = useState(false)

  const single = useListState({ items: ELEMENTS, selectionMode: 'single' })
  const multi  = useListState({ items: ELEMENTS, selectionMode: 'multiple' })
  const wdis   = useListState({ items: ELEMENTS_W_DISABLED, selectionMode: 'multiple' })

  useEffect(() => {
    const timeout = window.setTimeout(() => saveTheme(vars), 250)
    return () => window.clearTimeout(timeout)
  }, [vars])

  return (
    <div className="demo-root" style={vars as CSSProperties}>
      <div className="demo-bg" aria-hidden="true" />

      {/* ── Nav ── */}
      <nav className="demo-nav">
        <div className="demo-nav-inner">
          <div className="demo-nav-logo">
            aria<span>-</span>lab
          </div>
          <div className="demo-nav-tags">
            <Button variant="ghost" size="sm" className="demo-nav-customize" onPress={() => setPanelOpen(true)}>
              Customize theme
            </Button>
            <span className="demo-tag">v0.1.0</span>
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
        <div className="demo-hero-eye">component laboratory</div>
        <h1 className="demo-hero-title">
          aria<span className="accent">-</span>lab
        </h1>
        <p className="demo-hero-desc">
          A composable React component library built on React&nbsp;Aria.
          Accessible by default, unstyled by design.
        </p>
        <div className="demo-hero-stats">
          <div className="demo-stat">
            <span className="demo-stat-val green">3</span>
            <span className="demo-stat-label">components</span>
          </div>
          <div className="demo-stat">
            <span className="demo-stat-val">100%</span>
            <span className="demo-stat-label">TypeScript</span>
          </div>
          <div className="demo-stat">
            <span className="demo-stat-val">WCAG 2.1</span>
            <span className="demo-stat-label">compliant</span>
          </div>
        </div>
      </section>

      {/* ── Main ── */}
      <main className="demo-main">

        {/* 01 BUTTON */}
        <section className="demo-section" style={{ animationDelay: '80ms' }}>
          <SectionHead num="01" title="BUTTON" />
          <div className="demo-grid">
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
            <Card label="Icon">
              <div className="demo-row demo-row-center">
                <Button size="icon-sm" variant="secondary">◈</Button>
                <Button size="icon"    variant="secondary">◈</Button>
                <Button size="icon-lg" variant="secondary">◈</Button>
              </div>
            </Card>
            <Card label="Disabled">
              <div className="demo-row">
                <Button variant="primary"   isDisabled>Primary</Button>
                <Button variant="secondary" isDisabled>Secondary</Button>
                <Button variant="ghost"     isDisabled>Ghost</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* 02 INPUT */}
        <section className="demo-section" style={{ animationDelay: '160ms' }}>
          <SectionHead num="02" title="INPUT" />
          <div className="demo-grid">
            <Card label="Default">
              <div className="demo-col">
                <Input
                  placeholder="Default"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                />
              </div>
            </Card>
            <Card label="Variant · Error">
              <div className="demo-col">
                <Input placeholder="Error state" variant="error" />
              </div>
            </Card>
            <Card label="Disabled">
              <div className="demo-col">
                <Input placeholder="Disabled" disabled />
              </div>
            </Card>
            <Card label="Sizes">
              <div className="demo-col">
                <Input size="sm" placeholder="Small" />
                <Input size="md" placeholder="Medium" />
                <Input size="lg" placeholder="Large" />
              </div>
            </Card>
            <Card label="TextField">
              <div className="demo-col">
                <TextField
                  label="Email"
                  placeholder="you@example.com"
                  description="Used only for account notifications"
                />
              </div>
            </Card>
            <Card label="Select">
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
                <ComboBox
                  label="Language"
                  placeholder="Search language"
                  items={LANGUAGES}
                >
                  {(item) => (
                    <ComboBoxItem id={item.id} textValue={item.name}>
                      {item.name}
                    </ComboBoxItem>
                  )}
                </ComboBox>
                <DialogTrigger>
                  <Button variant="secondary">Open dialog</Button>
                  <Modal>
                    <Dialog>
                      {({ close }) => (
                        <>
                          <Heading slot="title" className="text-lg font-semibold text-[var(--aria-text-primary)]">
                            Team invite
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
                <DialogTrigger>
                  <Button variant="destructive">Delete...</Button>
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
          </div>
        </section>

        {/* 03 UIListBox */}
        <section className="demo-section" style={{ animationDelay: '240ms' }}>
          <SectionHead num="03" title="UI LIST BOX" />
          <div className="demo-grid">
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
                  ▸ {Array.from(single.selectedKeys).join(', ')}
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
                <button className="demo-action-btn" onClick={multi.selectAll}>select all</button>
                <button className="demo-action-btn" onClick={multi.deselectAll}>clear</button>
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
              <p style={{ fontSize: 10, color: 'var(--d-text-dim)', letterSpacing: '0.04em' }}>
                Lithium & Oxygen are disabled
              </p>
            </Card>
          </div>
        </section>

        {/* 04 DESIGN TOKENS */}
        <section className="demo-section" style={{ animationDelay: '320ms' }}>
          <SectionHead num="04" title="DESIGN TOKENS" />
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
          <span>aria-lab · 2025 · MIT License</span>
          <span>built with react-aria-components</span>
        </div>
      </footer>
    </div>
  )
}
