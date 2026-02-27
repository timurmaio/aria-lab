import { useState } from 'react'
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
  { var: '--aria-bg-secondary', label: 'bg-secondary' },
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

export default function App() {
  const [inputVal, setInputVal] = useState('')

  const single = useListState({ items: ELEMENTS, selectionMode: 'single' })
  const multi  = useListState({ items: ELEMENTS, selectionMode: 'multiple' })
  const wdis   = useListState({ items: ELEMENTS_W_DISABLED, selectionMode: 'multiple' })

  return (
    <div className="demo-root">
      <div className="demo-bg" aria-hidden="true" />

      {/* ── Nav ── */}
      <nav className="demo-nav">
        <div className="demo-nav-inner">
          <div className="demo-nav-logo">
            aria<span>-</span>lab
          </div>
          <div className="demo-nav-tags">
            <span className="demo-tag">v0.1.0</span>
            <span className="demo-tag">React 19</span>
            <span className="demo-tag demo-tag-green">Beta</span>
          </div>
        </div>
      </nav>

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
                  {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
                </Select>
                <ComboBox
                  label="Language"
                  placeholder="Search language"
                  items={LANGUAGES}
                >
                  {(item) => <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>}
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
