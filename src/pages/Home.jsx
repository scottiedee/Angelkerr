import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Dog, Award, Shield, Heart, Phone, ArrowRight, 
  MapPin, Star, Users, Calendar, Home as HomeIcon, Mail, Instagram
} from 'lucide-react'
import './Home.css'

const allImages = [
  '/images/IMG_0437.jpg', '/images/IMG_0441.jpg', '/images/IMG_0546.jpg',
  '/images/IMG_0547.jpg', '/images/IMG_1461.jpg', '/images/IMG_1482.jpg',
  '/images/IMG_1657.jpg', '/images/IMG_1660.jpg', '/images/IMG_1673.jpg',
  '/images/angel.avif', '/images/IMG_2259.jpg', '/images/IMG_2261.jpg',
  '/images/IMG_2279.jpg', '/images/IMG_3881.jpg', '/images/IMG_4687.jpg',
  '/images/IMG_5178.jpg', '/images/IMG_6214.jpg', '/images/IMG_8129.jpg',
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
            { icon: Award, text: 'CCPDT-KA Certified' },
            { icon: Shield, text: 'Bonded & Insured' },
            { icon: Heart, text: 'Pet First Aid' },
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

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-images"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="/images/angel.avif" alt="Angel with dog" className="about-img-main" />
              <img src="/images/kerry.avif" alt="Kerry with dog" className="about-img-secondary" />
            </motion.div>

            <motion.div 
              className="about-content"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Meet Angel & Kerry</h2>
              <p>
                <strong>Angel Gonzalez (CPDT-KA)</strong> has been training dogs since 2014 using 
                positive reinforcement methods. After a decade as a camera assistant, he dedicated 
                himself to helping families with their dogs. Certified by the CCPDT and specializing 
                in separation anxiety and aggression.
              </p>
              <p>
                <strong>Kerry Gonzalez</strong> co-owns the business with 20+ years of pet care 
                experience and a Vet Assistant certification. Together with their coach dogs 
                Luna (CGN certified pug) and Leo (Australian Shepherd in training), they create 
                a welcoming environment for every pup.
              </p>
              <p className="about-quote">
                "So put that dog whistle down, and give me a call today!"
              </p>
              <Link to="/about" className="btn btn-outline">
                Learn More About Us <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
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

      {/* Gallery */}
      <section className="gallery">
        <div className="container">
          <h2>Happy Clients</h2>
          <div className="gallery-grid">
            {images.slice(0, 6).map((img, i) => (
              <motion.div
                key={img}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <img src={img} alt={`Happy dog ${i + 1}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="instagram-section">
        <div className="container">
          <motion.div
            className="instagram-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Instagram className="instagram-icon" />
            <h2>Follow Us on Instagram</h2>
            <p>See our latest training sessions, happy pups, and behind-the-scenes moments!</p>
            <a 
              href="https://www.instagram.com/angelkerrdogtraining/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="instagram-btn"
            >
              <Instagram size={20} />
              @angelkerrdogtraining
            </a>
          </motion.div>
          <div className="instagram-preview">
            {images.slice(6, 12).map((img, i) => (
              <motion.a
                key={img}
                href="https://www.instagram.com/angelkerrdogtraining/"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-preview-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <img src={img} alt={`Instagram post ${i + 1}`} />
                <div className="instagram-overlay">
                  <Instagram size={24} />
                </div>
              </motion.a>
            ))}
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
          </div>
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
