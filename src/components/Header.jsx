import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import './Header.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/shop', label: 'Shop' },
  { path: '/book', label: 'Book Now' },
]

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-container">
          <a href="tel:647-528-9442" className="top-bar-phone">
            <Phone size={14} />
            <span>647-528-9442</span>
          </a>
          <span className="top-bar-tagline">"WE KERR FOR YOUR ANGELS"</span>
          <span className="top-bar-hours">Mon-Wed: 11AM-7PM · Thu-Fri: 1PM-4PM & 7PM-8PM</span>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.header 
        className="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="header-container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="AngelKerr Logo" className="logo-img" />
            <div className="logo-text">
              <span className="logo-name">AngelKerr</span>
              <span className="logo-tagline">Dog Training & Pet Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navLinks.slice(0, -1).map(link => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/book" className="nav-cta">
              Book Now
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink 
                  to={link.path}
                  className={({ isActive }) => 
                    link.path === '/book' 
                      ? 'nav-link-mobile nav-link-mobile--cta' 
                      : isActive ? 'nav-link-mobile active' : 'nav-link-mobile'
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
