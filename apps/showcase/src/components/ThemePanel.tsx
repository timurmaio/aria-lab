import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { Button } from 'aria-lab'
import { getContrastReport } from '../contrast'
import { clearSavedTheme, generateCss, toThemePayload, parseThemePayload } from '../theme-io'
import { detectPresetId, initialVars, presets, themeEditorSections, type ThemeEditorField, type ThemeVars } from '../tokens'

interface ToastMessage {
  id: number
  message: string
  tone: 'success' | 'info' | 'warning' | 'error'
}

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

export interface ThemePanelProps {
  vars: ThemeVars
  onVarsChange: (vars: ThemeVars) => void
  activePresetId: string
  onPresetApply: (id: string) => void
  onClose: () => void
}

export function ThemePanel({ vars, onVarsChange, activePresetId, onPresetApply, onClose }: ThemePanelProps) {
  const [copied, setCopied] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [importWarnings, setImportWarnings] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'sizing'>('colors')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const toastTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const mountedRef = useRef(true)

  const generatedCss = useMemo(() => generateCss(vars), [vars])
  const contrastReport = useMemo(() => getContrastReport(vars), [vars])
  const activePresetVars = activePresetId === 'custom' ? initialVars : presets.find((p) => p.id === activePresetId)?.vars ?? initialVars
  const isDirty = JSON.stringify(vars) !== JSON.stringify(activePresetVars)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      toastTimeoutsRef.current.forEach(clearTimeout)
      toastTimeoutsRef.current = []
    }
  }, [])

  const updateVar = (name: keyof ThemeVars, value: string) => {
    onVarsChange({ ...vars, [name]: value })
  }

  const showToast = (message: string, tone: ToastMessage['tone'] = 'info') => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setToasts((prev) => [...prev, { id, message, tone }])
    const timeoutId = setTimeout(() => {
      if (!mountedRef.current) return
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
      toastTimeoutsRef.current = toastTimeoutsRef.current.filter((t) => t !== timeoutId)
    }, 3000)
    toastTimeoutsRef.current.push(timeoutId)
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

  const filteredSections = themeEditorSections.filter((section) => {
    if (activeTab === 'colors') return section.id === 'colors'
    if (activeTab === 'typography') return section.id === 'typography'
    if (activeTab === 'sizing') return section.id === 'sizing' || section.id === 'radius'
    return true
  })

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
