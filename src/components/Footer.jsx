import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react'
import './Footer.css'

// TikTok icon component (not in lucide)
const TikTok = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="AngelKerr Logo" className="footer-logo-img" />
              <span className="footer-logo-name">AngelKerr</span>
            </Link>
            <p className="footer-slogan">"WE KERR FOR YOUR ANGELS"</p>
            <p className="footer-desc">
              CCPDT-KA certified dog training in the GTA since 2014. 
              Positive reinforcement methods that work.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/angelkerrdogtraining/" target="_blank" rel="noopener noreferrer" title="Instagram">
                <Instagram />
              </a>
              <a href="https://www.facebook.com/AngelKerrDogTraining/" target="_blank" rel="noopener noreferrer" title="Facebook">
                <Facebook />
              </a>
              <a href="https://www.tiktok.com/@angelkerrdogtraining" target="_blank" rel="noopener noreferrer" title="TikTok">
                <TikTok />
              </a>
            </div>
            <p className="footer-follow">Follow, Like and Share!</p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <nav className="footer-nav">
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/schedule">Group Class Schedule</Link>
              <Link to="/about">About Us</Link>
              <Link to="/book">Book a Consultation</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4>Contact</h4>
            <div className="footer-contact">
              <a href="tel:647-528-9442">
                <Phone size={16} />
                647-528-9442
              </a>
              <a href="mailto:angelkerrdogtraining@gmail.com">
                <Mail size={16} />
                angelkerrdogtraining@gmail.com
              </a>
              <span>
                <MapPin size={16} />
                122 Ellesmere Rd.<br />
                Scarborough, ON M1R-4C4<br />
                (Lower Level)
              </span>
            </div>
          </div>

          {/* Hours */}
          <div className="footer-section">
            <h4>Phone Consultation Hours</h4>
            <div className="footer-hours">
              <span>Mon - Wed: 11:00AM - 7:00PM</span>
              <span>Thu - Fri: 1:00PM - 4:00PM & 7:00PM - 8:00PM</span>
              <span>Saturday: 11:00AM - 2:00PM</span>
              <span>Sunday: 11:00AM only</span>
              <span className="booking-hours">
                <Clock size={14} /> Phone Consultations: Mon-Wed 11AM-7PM · Thu-Fri 1PM-4PM & 7PM-8PM · Sat 11AM-2PM · Sun 11AM only
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="footer-map">
        <iframe
          src="https://maps.google.com/maps?q=122+Ellesmere+Rd,+Scarborough,+ON+M1R+4C4&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="180"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="AngelKerr Location"
        />
      </div>

      {/* Service Areas */}
      <div className="footer-areas">
        <strong>Service Areas:</strong> Scarborough • Newmarket • Stouffville • Markham • East Gwillimbury • Georgina • Aurora • Keswick • Sutton • Beaverton
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AngelKerr Dog Training and Pet Services. All rights reserved.</p>
        <p>CCPDT-KA Certified • Bonded & Insured • Pet First Aid Certified</p>
      </div>
    </footer>
  )
}

export default Footer
