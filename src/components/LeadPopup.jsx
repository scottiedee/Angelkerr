import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Mail, CheckCircle } from 'lucide-react'
import './LeadPopup.css'

function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user already saw the popup
    const hasSeenPopup = localStorage.getItem('angelkerr_popup_seen')
    if (hasSeenPopup) return

    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('angelkerr_popup_seen', 'true')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate submission - replace with actual email service integration
    // You can integrate with Mailchimp, ConvertKit, or send to your email
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
    localStorage.setItem('angelkerr_popup_seen', 'true')
    
    // Close popup after showing success
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
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
            className="popup-container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <button className="popup-close" onClick={handleClose} aria-label="Close popup">
              <X size={24} />
            </button>

            {!isSubmitted ? (
              <>
                <div className="popup-icon">
                  <Gift size={40} />
                </div>
                
                <h2>Free Puppy Training Guide!</h2>
                <p>
                  Get our exclusive <strong>New Puppy Checklist & Training Tips</strong> guide 
                  delivered straight to your inbox. Start your training journey right!
                </p>

                <ul className="popup-benefits">
                  <li><CheckCircle size={16} /> Essential first-week puppy tips</li>
                  <li><CheckCircle size={16} /> House training made easy</li>
                  <li><CheckCircle size={16} /> Basic commands to start with</li>
                </ul>

                <form onSubmit={handleSubmit} className="popup-form">
                  <div className="popup-input-wrapper">
                    <Mail size={20} />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="popup-submit" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Get My Free Guide'}
                  </button>
                </form>

                <p className="popup-privacy">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="popup-success">
                <CheckCircle size={48} className="success-icon" />
                <h2>You're All Set!</h2>
                <p>Check your inbox for your free training guide. Welcome to the AngelKerr family!</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default LeadPopup


