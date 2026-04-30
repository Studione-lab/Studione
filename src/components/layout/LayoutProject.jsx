import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import NavbarV1 from './NavbarV1'
import Footer from './Footer'

// Layout that wraps project template pages — NavbarV1 + Footer (V2)
export default function LayoutProject() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavbarV1 noBackground />
      <main style={{ flex: 1, position: 'relative' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
