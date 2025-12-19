import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Calendar, ArrowRight } from 'lucide-react'
import './LeadPopup.css'

function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user already saw the popup
    const hasSeenPopup = localStorage.getItem('angelkerr_promo_jan2025_v2')
    if (hasSeenPopup) return

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('angelkerr_promo_jan2025_v2', 'true')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            className="popup-container popup-promo"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <button className="popup-close" onClick={handleClose} aria-label="Close popup">
              <X size={24} />
            </button>

            <div className="popup-icon promo-icon">
              <Sparkles size={40} />
            </div>
            
            <span className="promo-badge">Limited Time Offer</span>
            
            <h2 className="promo-headline">
              <span className="promo-percent">30% OFF</span>
              All Services
            </h2>
            
            <p className="promo-expires">
              <Calendar size={18} />
              Offer valid until <strong>January 31st, 2025</strong>
            </p>

            <p className="promo-desc">
              Start the new year with a well-trained pup! Book now and save on training, 
              boarding, and all our services.
            </p>

            <Link to="/book" className="popup-submit promo-btn" onClick={handleClose}>
              Book Now <ArrowRight size={20} />
            </Link>

            <p className="popup-privacy">
              Don't miss out—limited spots available!
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default LeadPopup










