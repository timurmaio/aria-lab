import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import { Landing } from './pages/Landing'
import { Components } from './pages/Components'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="components/:componentId?" element={<Components />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
