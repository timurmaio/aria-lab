import { Link } from 'react-router-dom'
import { Button, Input, Select, SelectItem } from 'aria-lab'
import { FRAMEWORKS } from '../data'

const totalComponents = 18

export function Landing() {
  return (
    <section className="demo-hero">
      <div className="demo-hero-badge">Component Laboratory</div>
      <h1 className="demo-hero-title">
        aria<span className="accent">-</span>lab
      </h1>
      <p className="demo-hero-desc">
        Composable React primitives built on React Aria. Accessible by default,
        unstyled by design—bring your own aesthetic.
      </p>
      <div className="demo-hero-cta">
        <Link to="/components" className="demo-hero-cta-btn">
          Explore components
        </Link>
      </div>
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
      <div className="demo-hero-preview">
        <div className="demo-hero-preview-inner">
          <div style={{ marginBottom: 16, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--d-text-dim)', textTransform: 'uppercase' }}>
            Live preview
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
            </div>
            <Input placeholder="Try me..." size="sm" aria-label="Try the input" />
            <Select label="Framework" placeholder="Choose" items={FRAMEWORKS} size="sm">
              {(item) => <SelectItem id={item.id} textValue={item.name}>{item.name}</SelectItem>}
            </Select>
          </div>
        </div>
      </div>
    </section>
  )
}
