import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout        from './components/layout/Layout'
import LayoutStudio  from './components/layout/LayoutStudio'
import Home          from './pages/Home'
import Studio        from './pages/Studio'
import Work          from './pages/Work'
import Services      from './pages/Services'
import Contact       from './pages/Contact'
import NotFound      from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Main layout (V2 Navbar + V2 Footer) ─────────────── */}
        <Route path="/" element={<Layout />}>
          <Route index        element={<Home />}     />
          <Route path="work"     element={<Work />}     />
          <Route path="services" element={<Services />} />
          <Route path="contact"  element={<Contact />}  />
          <Route path="*"        element={<NotFound />} />
        </Route>

        {/* ── Studio layout (V1 Navbar + V1 Footer) ───────────── */}
        <Route path="/studio" element={<LayoutStudio />}>
          <Route index element={<Studio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
