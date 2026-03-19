import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import { Landing } from './pages/Landing'

const Components = lazy(() => import('./pages/Components').then((m) => ({ default: m.Components })))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route
            path="components/:componentId?"
            element={
              <Suspense fallback={<div className="demo-main demo-main-with-toc" style={{ padding: 48, textAlign: 'center', color: 'var(--d-text-dim)' }}>Loading components…</div>}>
                <Components />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
