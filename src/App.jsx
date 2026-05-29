import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { SITE_TITLE } from './config/site'
import Header from './components/Header'
import Footer from './components/Footer'
import LeadPopup from './components/LeadPopup'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Book from './pages/Book'
import Schedule from './pages/Schedule'
import Shop from './pages/Shop'
import Admin from './pages/Admin'
import './App.css'

const PAGE_TITLES = {
  '/': SITE_TITLE,
  '/services': `Services | ${SITE_TITLE}`,
  '/schedule': `Group Class Schedule | ${SITE_TITLE}`,
  '/about': `About Us | ${SITE_TITLE}`,
  '/shop': `Shop | ${SITE_TITLE}`,
  '/book': `Book Online | ${SITE_TITLE}`,
  '/admin': `Admin | ${SITE_TITLE}`,
}

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] ?? SITE_TITLE
  }, [location.pathname])

  return (
    <div className="app">
      {!isAdminPage && <Header />}
      {!isAdminPage && <LeadPopup />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/book" element={<Book />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
