import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LeadPopup from './components/LeadPopup'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Book from './pages/Book'
import Shop from './pages/Shop'
import Admin from './pages/Admin'
import './App.css'

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'

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
