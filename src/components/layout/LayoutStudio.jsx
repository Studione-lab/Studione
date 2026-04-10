import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import NavbarV1 from './NavbarV1'
import FooterV1 from './FooterV1'

// Layout that wraps Studio page — uses 1st-variant Navbar + Footer
export default function LayoutStudio() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavbarV1 />
      <main style={{ flex: 1, position: 'relative' }}>
        <Outlet />
      </main>
      <FooterV1 />
    </div>
  )
}
