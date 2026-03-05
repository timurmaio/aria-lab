import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Button } from 'aria-lab'
import type { CSSProperties } from 'react'
import { ThemePanel } from './components/ThemePanel'
import { loadTheme, saveTheme } from './theme-io'
import { detectPresetId } from './tokens'
import { initialVars, type ThemeVars } from './tokens'

export function Layout() {
  const [vars, setVars] = useState<ThemeVars>(() => loadTheme() ?? initialVars)
  const [activePresetId, setActivePresetId] = useState(() => detectPresetId(loadTheme() ?? initialVars))
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => saveTheme(vars), 250)
    return () => window.clearTimeout(timeout)
  }, [vars])

  return (
    <div className="demo-root" style={vars as CSSProperties}>
      <div className="demo-bg" aria-hidden="true" />

      <nav className="demo-nav">
        <div className="demo-nav-inner">
          <Link to="/" className="demo-nav-logo">
            <span className="logo-bracket">[</span>
            aria<span className="logo-accent">-</span>lab
            <span className="logo-bracket">]</span>
          </Link>
          <div className="demo-nav-tags">
            <Link to="/components" className="demo-nav-link">
              Components
            </Link>
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

      <Outlet />

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
