import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Check, Star, Shield, Heart, Zap, Phone, Mail } from 'lucide-react'
import './Shop.css'

const collarColors = [
  { name: 'black', image: '/black.png' },
  { name: 'red', image: '/red.png' },
  { name: 'blue', image: '/blue.png' },
  { name: 'purple', image: '/purple-png.png' },
]

const cannyFeatures = [
  { icon: Shield, title: 'Safe & Secure', desc: 'Fastens behind the head so your dog cannot escape' },
  { icon: Heart, title: 'Comfortable Fit', desc: 'Soft, padded webbing that allows easy breathing and panting' },
  { icon: Zap, title: 'Total Control', desc: 'Gentle pressure system eliminates pulling and lunging' },
  { icon: Star, title: 'Award Winning', desc: "Voted 'Best New Product' by the UK pet industry" },
]

const benefits = [
  'Combines safety, comfort, superior quality materials',
  'Provides complete but gentle control',
  'Does not ride into eyes',
  'Does not yank your dog\'s head to one side',
  'Recommended by dog trainers and veterinarians worldwide',
  'Wipeable and washable material',
  'Trains your dog to eventually walk on a regular collar',
]

function Shop() {
  const [selectedColor, setSelectedColor] = useState(collarColors[0])

  return (
    <div className="shop-page">
      {/* Hero */}
      <section className="shop-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingBag className="hero-icon" />
            <h1>Shop</h1>
            <p>Professional training tools recommended by AngelKerr</p>
          </motion.div>
        </div>
      </section>

      {/* Canny Collar Intro */}
      <section className="canny-intro">
        <div className="container">
          <div className="intro-grid">
            <motion.div 
              className="intro-image"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="/black.png" alt="Canny Collar" />
            </motion.div>
            <motion.div 
              className="intro-content"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge">Official Canadian Distributor</span>
              <h2>The Canny Collar</h2>
              <p className="tagline">Train Your Dog to Stop Pulling on Lead</p>
              <p>
                We are Angel and Kerry, owners and certified dog trainers for AngelKerr Dog Training 
                and Pet Services. We are very grateful to be able to bring the Canny Collar to all 
                parts of Canada.
              </p>
              <p>
                As trainers and dog walkers we know what an inconvenience it can be when your dog 
                doesn't want to walk obediently with you. Thanks to the Canny Collar, we can bring 
                that loose leash experience to all our training clients.
              </p>
              <p className="highlight">
                <strong>We trust this effective collar so much that one of the requirements for our 
                'adventure walks' is that all the dogs must use one.</strong>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="product-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>The Best Collar to Stop Dogs Pulling</h2>
            <p>Transforming even the worst pullers into happy, well-behaved pets</p>
          </motion.div>

          <div className="product-grid">
            <motion.div 
              className="product-image"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img src={selectedColor.image} alt={`Canny Collar - ${selectedColor.name}`} />
              <div className="product-colors">
                {collarColors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-dot ${color.name} ${selectedColor.name === color.name ? 'active' : ''}`}
                    title={color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
              <p className="color-label">Color: <strong>{selectedColor.name.charAt(0).toUpperCase() + selectedColor.name.slice(1)}</strong></p>
              <img src="/canny.avif" alt="Canny Collar" className="canny-badge" />
            </motion.div>

            <motion.div 
              className="product-details"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="product-cards">
                {/* Size 1-4 */}
                <div className="product-card">
                  <div className="card-header">
                    <h3>Canny Collar</h3>
                    <span className="size-badge">Size 1-4</span>
                  </div>
                  <p className="card-desc">For small to medium dogs</p>
                  <div className="card-price">
                    <span className="price">$56.50</span>
                    <span className="price-note">CAD (tax included)</span>
                  </div>
                </div>

                {/* Size 5-7 */}
                <div className="product-card">
                  <div className="card-header">
                    <h3>Canny Collar</h3>
                    <span className="size-badge">Size 5-7</span>
                  </div>
                  <p className="card-desc">For medium to large dogs</p>
                  <div className="card-price">
                    <span className="price">$65.54</span>
                    <span className="price-note">CAD (tax included)</span>
                  </div>
                </div>

                {/* Colossus */}
                <div className="product-card product-card--large">
                  <div className="card-header">
                    <h3>Canny Colossus</h3>
                    <span className="size-badge size-badge--large">Large Breed</span>
                  </div>
                  <p className="card-desc">For dogs with neck over 58cm - heavy-duty fittings</p>
                  <div className="card-price">
                    <span className="price-note">Contact for pricing</span>
                  </div>
                </div>

                {/* PayPal Payment Box */}
                <div className="paypal-box">
                  <div className="paypal-header">
                    <svg className="paypal-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.629h6.724c2.226 0 3.936.54 5.078 1.606 1.166 1.09 1.573 2.67 1.208 4.696-.36 1.996-1.4 3.636-3.091 4.876-1.634 1.198-3.684 1.805-6.096 1.805H7.788a.77.77 0 0 0-.757.63l-1.19 4.633zm10.143-13.12c.208-1.15-.015-2.058-.663-2.698-.716-.707-1.895-1.066-3.503-1.066H8.133a.385.385 0 0 0-.378.314L5.564 16.19a.32.32 0 0 0 .316.37h3.224l.804-3.132a.77.77 0 0 1 .757-.63h1.59c1.972 0 3.54-.49 4.66-1.458 1.077-.932 1.772-2.236 2.064-3.878.039-.215.066-.426.086-.633l.154-.612z"/>
                    </svg>
                    <h4>Pay with PayPal</h4>
                  </div>
                  <p className="paypal-note">
                    We currently accept PayPal for online purchases. When you pay, please include in the notes:
                  </p>
                  <ul className="paypal-checklist">
                    <li><Check size={16} /> <strong>Size</strong> (1-4 or 5-7)</li>
                    <li><Check size={16} /> <strong>Color</strong> (Black, Red, Blue, or Purple)</li>
                    <li><Check size={16} /> <strong>Shipping Address</strong></li>
                  </ul>
                  <a 
                    href="https://paypal.me/angelkerrdogtraining" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-paypal"
                  >
                    <svg className="paypal-btn-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.629h6.724c2.226 0 3.936.54 5.078 1.606 1.166 1.09 1.573 2.67 1.208 4.696-.36 1.996-1.4 3.636-3.091 4.876-1.634 1.198-3.684 1.805-6.096 1.805H7.788a.77.77 0 0 0-.757.63l-1.19 4.633zm10.143-13.12c.208-1.15-.015-2.058-.663-2.698-.716-.707-1.895-1.066-3.503-1.066H8.133a.385.385 0 0 0-.378.314L5.564 16.19a.32.32 0 0 0 .316.37h3.224l.804-3.132a.77.77 0 0 1 .757-.63h1.59c1.972 0 3.54-.49 4.66-1.458 1.077-.932 1.772-2.236 2.064-3.878.039-.215.066-.426.086-.633l.154-.612z"/>
                    </svg>
                    Pay with PayPal
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {cannyFeatures.map((feature, i) => (
              <motion.div 
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <feature.icon className="feature-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Unique Design</h2>
            <p className="how-intro">
              Our unique, patented 'behind-the-head' design means the Canny Collar does not ride up 
              into your dog's eyes nor yank her head to one side, both of which will cause distress 
              and discomfort and could damage her neck.
            </p>
          </motion.div>

          <div className="how-grid">
            <motion.div 
              className="how-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="how-number">1</div>
              <h3>Training Mode</h3>
              <p>
                Use in 'training collar mode' with the slip line over your dog's nose for 
                gentle guidance and control during walks.
              </p>
            </motion.div>

            <motion.div 
              className="how-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="how-number">2</div>
              <h3>Gentle Pressure</h3>
              <p>
                The slip line applies gentle pressure when your dog pulls and immediately 
                releases as your dog stops—teaching positive behavior.
              </p>
            </motion.div>

            <motion.div 
              className="how-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="how-number">3</div>
              <h3>Regular Mode</h3>
              <p>
                Eventually drop the slip line off your dog's nose and use as a regular collar. 
                Train your dog to walk without pulling!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Why Choose the Canny Collar?</h2>
              <p>
                If you are embarrassed by your pulling dog, dread taking your dog for a walk, 
                and have tried everything else to stop your dog pulling, then the Canny Collar 
                is the answer.
              </p>
            </motion.div>

            <motion.ul 
              className="benefits-list"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {benefits.map((benefit, i) => (
                <li key={i}>
                  <Check size={20} />
                  <span>{benefit}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="shop-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Transform Your Walks?</h2>
            <p>Contact us to order your Canny Collar today!</p>
            <div className="cta-buttons">
              <a href="tel:647-528-9442" className="btn btn-white btn-lg">
                <Phone size={20} /> 647-528-9442
              </a>
              <a href="mailto:angelkerrdogtraining@gmail.com" className="btn btn-outline btn-lg">
                <Mail size={20} /> Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Shop

