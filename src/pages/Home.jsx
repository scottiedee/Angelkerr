import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Dog, Award, Shield, Heart, Phone, ArrowRight, 
  MapPin, Star, Users, Calendar, Home as HomeIcon, Mail
} from 'lucide-react'
import GroupClassSchedule from '../components/GroupClassSchedule'
import './Home.css'

// Load Elfsight script for Google Reviews
const loadElfsight = () => {
  if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://static.elfsight.com/platform/platform.js'
    script.async = true
    document.body.appendChild(script)
  }
}

const allImages = [
  '/images/IMG_0437.jpg', '/images/IMG_0441.jpg', '/images/IMG_1461.jpg',
  '/images/IMG_1660.jpg', '/images/IMG_1673.jpg', '/images/IMG_2257.jpg',
  '/images/IMG_2259.jpg', '/images/IMG_2261.jpg', '/images/IMG_2279.jpg',
  '/images/IMG_3881.jpg', '/images/IMG_4687.jpg', '/images/IMG_6214.jpg',
  '/images/IMG_9801.jpg', '/images/IMG_9826.jpg',
]

const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5)

function Home() {
  const [heroIndex, setHeroIndex] = useState(0)
  const images = useMemo(() => shuffleArray(allImages), [])

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % images.length), 5000)
    return () => clearInterval(timer)
  }, [images.length])

  // Load Elfsight for Google Reviews
  useEffect(() => {
    loadElfsight()
  }, [])

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIndex}
              src={images[heroIndex]}
              alt="Dogs"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <motion.span 
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Award size={16} /> CCPDT-KA Certified Since 2021
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            AngelKerr<br />
            <span>Dog Training & Pet Services</span>
          </motion.h1>

          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            "WE KERR FOR YOUR ANGELS"
          </motion.p>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Training your pet is not about tough love or who is top dog. 
            Our methods are fun for all—thoroughly modern, innovative, and science based.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/book" className="btn btn-primary">
              Book a Consultation <ArrowRight size={18} />
            </Link>
            <a href="tel:647-528-9442" className="btn btn-ghost">
              <Phone size={18} /> 647-528-9442
            </a>
          </motion.div>

          <motion.div 
            className="hero-certs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <a href="https://www.animalbehaviorcollege.com/" target="_blank" rel="noopener noreferrer" className="hero-cert">
              <span className="hero-cert-abbr">ABC</span>
              <span className="hero-cert-text">Certified</span>
            </a>
            <a href="https://www.ccpdt.org/" target="_blank" rel="noopener noreferrer" className="hero-cert">
              <span className="hero-cert-abbr">CCPDT-KA</span>
              <span className="hero-cert-text">Certified</span>
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="hero-areas"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <MapPin size={16} />
          <span><strong>NEW SERVICE AREAS:</strong> East Gwillimbury • Georgina • Aurora • Keswick • Sutton</span>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="container">
          {[
            { icon: Shield, text: 'Bonded & Insured' },
            { icon: Heart, text: 'Pet First Aid Certified' },
            { icon: Star, text: 'Training Since 2014' },
          ].map((item, i) => (
            <motion.div 
              key={item.text} 
              className="trust-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <item.icon /> {item.text}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <motion.div 
            className="section-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>What We Offer</h2>
            <p>Training and care tailored to your dog's unique needs</p>
          </motion.div>

          <div className="services-grid">
            {[
              { icon: Users, title: 'Group Training & Walks', desc: 'Your pup will love our walks—find out why!' },
              { icon: Star, title: '1-on-1 Training', desc: 'Personalized sessions for behavioral issues & more' },
              { icon: Calendar, title: 'Board & Train', desc: 'Intensive training while your dog stays with us' },
              { icon: HomeIcon, title: 'Boarding', desc: 'Leave your dog safely with us while you travel' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <service.icon className="service-icon" />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="services-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/services" className="btn btn-outline">
              View All Services <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <GroupClassSchedule upcomingLimit={4} id="schedule" />

      {/* Trainer Bio Section */}
      <section className="trainer-bio">
        <div className="container">
          <motion.div 
            className="bio-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Meet Your Trainers</h2>
            <p>Certified professionals dedicated to positive reinforcement training</p>
          </motion.div>

          <div className="bio-grid">
            {/* Angel */}
            <motion.div 
              className="bio-card bio-card--featured"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bio-image">
                <img src="/images/angel.avif" alt="Angel Gonzalez - Lead Trainer" />
                <span className="bio-role">Lead Trainer</span>
              </div>
              <div className="bio-info">
                <h3>Angel Gonzalez <span>CPDT-KA</span></h3>
                
                <div className="bio-certs">
                  <span className="bio-cert"><Award size={14} /> CCPDT-KA Certified</span>
                  <span className="bio-cert"><Award size={14} /> ABC Certified</span>
                </div>

                <div className="bio-stats">
                  <div className="bio-stat">
                    <span className="bio-stat-num">10+</span>
                    <span className="bio-stat-label">Years Training</span>
                  </div>
                  <div className="bio-stat">
                    <span className="bio-stat-num">500+</span>
                    <span className="bio-stat-label">Dogs Trained</span>
                  </div>
                  <div className="bio-stat">
                    <span className="bio-stat-num">7</span>
                    <span className="bio-stat-label">Years at Global Pet Foods</span>
                  </div>
                </div>

                <p className="bio-text">
                  Specializing in <strong>separation anxiety</strong>, <strong>aggression</strong>, 
                  and <strong>leash reactivity</strong>. Angel's journey began with his own Great Pyrenees, 
                  Isis, whose behavioral challenges sparked his passion for helping families keep their dogs.
                </p>

                <div className="bio-specialties">
                  <span>Separation Anxiety</span>
                  <span>Aggression</span>
                  <span>Leash Reactivity</span>
                  <span>Resource Guarding</span>
                  <span>Puppy Training</span>
                </div>
              </div>
            </motion.div>

            {/* Kerry */}
            <motion.div 
              className="bio-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="bio-image">
                <img src="/images/kerry.avif" alt="Kerry Gonzalez - Co-Owner" />
                <span className="bio-role">Co-Owner</span>
              </div>
              <div className="bio-info">
                <h3>Kerry Gonzalez</h3>
                
                <div className="bio-certs">
                  <span className="bio-cert"><Award size={14} /> Vet Assistant Certified</span>
                  <span className="bio-cert"><Heart size={14} /> Pet First Aid</span>
                </div>

                <div className="bio-stats">
                  <div className="bio-stat">
                    <span className="bio-stat-num">20+</span>
                    <span className="bio-stat-label">Years Pet Care</span>
                  </div>
                </div>

                <p className="bio-text">
                  Kerry has been actively professionally training for 5 years, specializing in our 
                  Board and Train program. She aspires to become a service dog trainer.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Philosophy */}
          <motion.div 
            className="bio-philosophy"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="philosophy-content">
              <h4>Our Training Philosophy</h4>
              <p>
                <strong>Training is not about tough love or who is top dog.</strong> Our methods are 
                100% positive reinforcement based—your dog earns rewards, never avoids punishment. 
                We follow CCPDT-KA standards because science-based training creates lasting results 
                and strengthens the bond between you and your dog.
              </p>
              <blockquote>
                "So put that dog whistle down, and give me a call today!"
              </blockquote>
            </div>
            <Link to="/about" className="btn btn-primary">
              Learn More About Us <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="video-gallery">
        <div className="container">
          <h2>See Us In Action</h2>
          <div className="video-grid">
            <div className="video-item">
              <video autoPlay muted loop playsInline>
                <source src="/49dda0ed-9ad5-49ed-938d-45595684a601.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="video-item">
              <video autoPlay muted loop playsInline>
                <source src="/d5d54272-79e9-44df-a19a-02efb8f56343.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Location Quick Info */}
      <section className="location-info">
        <div className="container">
          <div className="location-grid">
            <motion.div 
              className="location-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MapPin />
              <div>
                <h3>Training Facility</h3>
                <p>122 Ellesmere Rd., Scarborough, ON M1R-4C4 (Lower Level)</p>
              </div>
            </motion.div>
            <motion.div 
              className="location-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Star />
              <div>
                <h3>Coverage Area</h3>
                <p>Scarborough to Georgina and beyond! In-home & facility training available.</p>
              </div>
            </motion.div>
            <motion.div 
              className="location-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Award />
              <div>
                <h3>Certified Professional Trainers</h3>
                <p>CCPDT-KA certified & ABC accredited. Science-based positive reinforcement methods.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="reviews-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>What Our Clients Say</h2>
            <p className="reviews-subtitle">Real reviews from real dog owners</p>
          </motion.div>
          <div className="elfsight-app-6c66bc94-2d91-458d-84ae-a3aa28b492eb" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start Your Dog Training Journey?</h2>
            <p>Call or email us today, or book a consultation online!</p>
            <div className="cta-actions">
              <Link to="/book" className="btn btn-primary btn-lg">
                Book Now <ArrowRight size={20} />
              </Link>
              <a href="tel:647-528-9442" className="btn btn-ghost-light btn-lg">
                <Phone size={20} /> 647-528-9442
              </a>
            </div>
            <a href="mailto:angelkerrdogtraining@gmail.com" className="cta-email">
              <Mail size={16} /> angelkerrdogtraining@gmail.com
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
