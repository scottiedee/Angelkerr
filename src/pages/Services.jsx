import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Users, Star, Calendar, Home, CheckCircle, 
  ArrowRight, Award, Phone, MapPin
} from 'lucide-react'
import './Services.css'

const allImages = [
  '/images/IMG_0437.jpg', '/images/IMG_0441.jpg', '/images/IMG_0546.jpg',
  '/images/IMG_0547.jpg', '/images/IMG_1461.jpg', '/images/IMG_1482.jpg',
  '/images/IMG_1657.jpg', '/images/IMG_1660.jpg', '/images/IMG_1673.jpg',
]

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

const services = [
  {
    id: 'group-walks',
    icon: Users,
    title: 'Group Walks',
    subtitle: 'Your pup will love our walks—find out why!',
    price: 'Contact for pricing',
    requiresConsultation: true,
    description: 'Socialization and exercise with other friendly dogs in a supervised group setting. Our walks provide mental stimulation, physical exercise, and the opportunity for your dog to make friends.',
    features: [
      'Small group sizes for safety',
      'Supervised socialization',
      'GPS tracking during walks',
      'Photo updates sent to you',
      'Trail and park adventures',
      'Flexible scheduling options'
    ]
  },
  {
    id: 'group-training',
    icon: Users,
    title: 'Group Training',
    price: 'Contact for pricing',
    requiresConsultation: true,
    description: 'Learn alongside other dog owners in a supportive environment. Group classes offer real-world distractions that help your dog generalize their training while building a community.',
    features: [
      'Basic obedience commands',
      'Socialization with other dogs',
      'Real-world distraction training',
      'Community of dog owners',
      'CCPDT-KA certified instruction',
      'More affordable than private'
    ]
  },
  {
    id: '1on1',
    icon: Star,
    title: '1-on-1 Private Training',
    subtitle: 'Behaviour Program',
    price: 'Contact for pricing',
    featured: true,
    requiresConsultation: true,
    description: 'Personalized training tailored to your dog\'s specific needs. Ideal for behavioral issues, anxious dogs, or owners wanting focused attention. Available at our facility or in your home throughout the GTA.',
    features: [
      'Customized training plan',
      'In-home or at our facility',
      'Separation anxiety specialist',
      'Aggression specialist',
      'Leash reactivity training',
      'Resource guarding help',
      'Puppy training programs',
      'Follow-up support included'
    ]
  },
  {
    id: 'board-train',
    icon: Calendar,
    title: 'Board & Train',
    subtitle: 'Intensive training while your dog stays with us',
    price: 'Contact for pricing',
    requiresConsultation: true,
    description: 'Your dog stays in our home environment (not a kennel) and receives multiple daily training sessions with consistent reinforcement. This program was developed based on Angel\'s experience and refined with Luna, his first training challenge.',
    features: [
      'Multiple daily training sessions',
      'Home environment boarding',
      'Consistent reinforcement',
      'Photo & video updates',
      'Owner training at pickup',
      'Follow-up support included',
      'Faster results than weekly sessions'
    ]
  },
  {
    id: 'boarding',
    icon: Home,
    title: 'Pet Boarding',
    subtitle: 'Enjoy your vacation and leave your dog safely with us',
    price: 'Contact for pricing',
    requiresConsultation: true,
    description: 'Safe, loving care when you need to travel. Your dog stays in our home with professional trainers on-site—not a kennel environment. Kerry\'s 20+ years of pet care experience ensures your pet is pampered like family.',
    features: [
      'Home environment (not kennel)',
      'Professional trainers on-site',
      'Regular exercise & walks',
      'Medication administration',
      '24/7 supervision',
      'Flexible drop-off/pick-up',
      'Photo & video updates'
    ]
  }
]

function Services() {
  const images = useMemo(() => shuffle(allImages), [])

  return (
    <div className="services-page">
      {/* Hero */}
      <section className="page-hero page-hero--image" style={{ backgroundImage: `url(${images[0]})` }}>
        <div className="page-hero-overlay" />
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Our Services</h1>
            <p>Professional, positive reinforcement training for every dog</p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <div className="container">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className={`service-block ${service.featured ? 'service-block--featured' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="service-header">
                <service.icon className="service-icon" />
                <div>
                  <h2>{service.title}</h2>
                  {service.subtitle && <p className="service-subtitle">{service.subtitle}</p>}
                  <span className="service-price">{service.price}</span>
                </div>
                {service.featured && <span className="featured-badge">Most Popular</span>}
              </div>
              
              <p className="service-desc">{service.description}</p>
              
              <ul className="service-features">
                {service.features.map(feature => (
                  <li key={feature}>
                    <CheckCircle size={18} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to="/book" className="btn btn-primary">
                {service.requiresConsultation ? 'Request a Consultation First' : 'Book Now'} <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coverage Area */}
      <section className="coverage-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MapPin className="coverage-icon" />
            <h2>GTA In-Home Training Coverage Area</h2>
            <p className="coverage-headline">Scarborough to Georgina and beyond!</p>
            <div className="coverage-areas">
              {['Scarborough', 'Newmarket', 'Stouffville', 'Markham', 'East Gwillimbury', 
                'Georgina', 'Aurora', 'Keswick', 'Sutton', 'Beaverton'].map(area => (
                <span key={area}>{area}</span>
              ))}
            </div>
            <p className="coverage-note">
              *Extra charge for travel outside of the service area<br />
              We offer training by appointment at our facility and in-home service within our coverage area.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="approach-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="approach-icon" />
            <h2>Our Training Approach</h2>
            <p>
              Training is not about tough love or who is top dog. Our methods are 
              <strong> positive reinforcement based</strong> — training is based on earning 
              a reward, not avoiding punishment. We follow <strong>CCPDT-KA standards</strong>, 
              ensuring the most effective and humane training methods.
            </p>
            <p>
              Angel's training techniques strictly follow the CCPDT-KA standards. The more your 
              dog is appropriately behaved by society standards, the more opportunities you and 
              your dog will have.
            </p>
            <div className="approach-creds">
              <span><CheckCircle size={16} /> CCPDT-KA Certified</span>
              <span><CheckCircle size={16} /> Bonded & Insured</span>
              <span><CheckCircle size={16} /> Pet First Aid Certified</span>
              <span><CheckCircle size={16} /> 10+ Years Experience</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div className="container">
          <h2>Not Sure Which Service Is Right?</h2>
          <p>Book a consultation and we'll help you find the best fit for your dog</p>
          <div className="cta-buttons">
            <Link to="/book" className="btn btn-primary btn-lg">
              Book Consultation <ArrowRight size={20} />
            </Link>
            <a href="tel:647-528-9442" className="btn btn-ghost-light btn-lg">
              <Phone size={20} /> 647-528-9442
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
