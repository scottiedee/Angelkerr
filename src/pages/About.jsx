import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, CheckCircle, Heart, ArrowRight, MapPin, Phone, Mail } from 'lucide-react'
import './About.css'

// Static images for each section - change these to your preferred photos
const images = {
  angel: '/images/angel.avif',
  kerry: '/images/kerry.avif',
  luna: '/images/IMG_8129.jpg',
  leo: '/images/IMG_2257.jpg',
}

function About() {

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>About Us</h1>
            <p>Meet the passionate team dedicated to helping you and your dog thrive</p>
          </motion.div>
        </div>
      </section>

      {/* Intro Quote */}
      <section className="intro-quote">
        <div className="container">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            "Training your pet is not about tough love or who is top dog. As a fully certified 
            Dog Trainer based in the GTA, I've been training canines since 2014. Over the years 
            I have developed a method of training canines that is not about force or using the 
            leash, but is fun for all, and thoroughly modern, innovative and science based. 
            So put that dog whistle down, and give me a call today."
          </motion.blockquote>
        </div>
      </section>

      {/* Angel */}
      <section className="team-section">
        <div className="container">
          <div className="team-grid">
            <motion.div 
              className="team-image"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={images.angel} alt="Angel Gonzalez" />
              <span className="team-badge">Lead Trainer</span>
            </motion.div>

            <motion.div 
              className="team-content"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Angel Gonzalez <span>CPDT-KA</span></h2>
              <p className="team-role">Lead Behaviour Consultant • Owner • Dog Walker</p>
              
              <p>
                Angel's love of dogs developed from early childhood. He received his first 
                Shepherd mix breed when he was eight years old. Born in Mexico City and arriving 
                in Canada in 1985, the combination of his dog experience from childhood through 
                adulthood has flourished his passion for canines.
              </p>
              
              <p>
                Angel owned a stunning Great Pyrenees named Isis, who was a beautiful and wise 
                canine. She had quite a few behavioural issues including leash reactivity and 
                resource guarding. She ended up attacking someone and Angel had to give her up. 
                Being faced with these behavioural issues sparked an ambition in Angel and 
                motivated him to learn all he could about dog training so that he could help 
                families not have to make the very tough decision that he had to make.
              </p>

              <p>
                In September 2014, Angel ventured into his career path and in 2015 became 
                certified through Animal Behavioral College. <strong>In 2015, Angel left his 
                career as a camera assistant after a decade of dedication</strong> to establish 
                and open AngelKerr Dog Training and Pet Services with his wife Kerry.
              </p>

              <p>
                Angel also worked at <strong>Global Pet Foods for 7 years</strong> where he 
                specialized in customer service, knowledge of tools and pet nutrition. AngelKerr 
                puts clients first and is well respected and recommended by Global Pet Foods 
                amongst other companies and veterinarians all over the GTA.
              </p>

              <p>
                Angel is always trying to expand his knowledge by pursuing continuing education 
                courses and programs. His training techniques are positive reinforcement based 
                and strictly follow the CCPDT-KA standards. <em>Training a dog is based on 
                earning a reward, as opposed to avoiding a punishment.</em>
              </p>

              <div className="credentials">
                <h4>Certifications & Specializations</h4>
                <div className="cred-grid">
                  <span><CheckCircle size={16} /> CCPDT-KA Certified (2021)</span>
                  <span><CheckCircle size={16} /> Animal Behavioral College (2015)</span>
                  <span><CheckCircle size={16} /> Separation Anxiety Specialist</span>
                  <span><CheckCircle size={16} /> Aggression Specialist</span>
                  <span><CheckCircle size={16} /> Pet First Aid Certified</span>
                  <span><CheckCircle size={16} /> Bonded & Insured</span>
                  <span><CheckCircle size={16} /> 7 Years at Global Pet Foods</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kerry */}
      <section className="team-section team-section--alt">
        <div className="container">
          <div className="team-grid team-grid--reverse">
            <motion.div 
              className="team-image"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={images.kerry} alt="Kerry Gonzalez" className="kerry-photo" />
              <span className="team-badge">Trainer • Co-Owner</span>
            </motion.div>

            <motion.div 
              className="team-content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Kerry Gonzalez</h2>
              <p className="team-role">Trainer • Board & Train • Boarding • Pet Sitter • Dog Walker • Owner</p>
              
              <p>
                Pets are Kerry's life! She has had this deep rooted passion for all pets for 
                as long as she can remember. From adolescence to adulthood, her admiration 
                for all pets has evolved!
              </p>
              
              <p>
                Kerry is the administrator, pet sitter, dog walker, and business owner. She 
                is an ambitious soul always continuing her education and broadening her pet 
                knowledge. Kerry has obtained her <strong>Vet Assistant certificate from 
                Stratford Career Institute</strong> and has over <strong>20 years of pet 
                sitting and pet wellness experience</strong>.
              </p>

              <p>
                Kerry has an array of talents and creativity which is highly beneficial for 
                marketing and social media platforms. Her nurturing spirit and intuition 
                contributes to pampering all pets as if they were her own fur babies.
              </p>

              <p>
                Since childhood, Kerry has always been intrigued by the study of canine 
                behaviour. She has been <strong>actively professionally training for 5 years</strong> and 
                specializes in our <strong>Board and Train program</strong>. Kerry aspires to 
                become a <strong>service dog trainer</strong>.
              </p>

              <div className="credentials">
                <div className="cred-grid">
                  <span><CheckCircle size={16} /> 20+ Years Pet Care Experience</span>
                  <span><CheckCircle size={16} /> Bonded & Insured</span>
                </div>
              </div>

              <p className="team-quote">
                "Kerry and Angel eagerly anticipate caring for all your furry friends in 
                their inviting pet oasis!"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coach Dogs */}
      <section className="dogs-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="section-icon" />
            <h2>Meet Our Coach Dogs</h2>
            <p>We are ready to help you and your dog face any everyday challenge—big or small, we help with them all!</p>
          </motion.div>

          <div className="dogs-grid">
            {/* Luna */}
            <motion.div 
              className="dog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img src={images.luna} alt="Luna" />
              <div className="dog-info">
                <h3>Luna Gonzalez</h3>
                <span>Coach Dog • CGN Certified Canine</span>
                <p>
                  This is little Luna, a 9 year old pure bred pug with a heart of gold! She 
                  earns her keep by helping us do distraction work and her calm energy is 
                  great to help with dog on dog reactivity.
                </p>
                <p>
                  Luna has been a part of the family since she was 8 weeks old and was 
                  <strong> Angel's first real dog training challenge</strong>. As a puppy, 
                  she was tough to potty train and was also a big time chewer—these experiences 
                  helped Angel develop his current puppy training program and board and train program.
                </p>
                <p className="dog-cert">
                  <CheckCircle size={16} /> CGN Certified in Spring 2019
                </p>
              </div>
            </motion.div>

            {/* Leo */}
            <motion.div 
              className="dog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <img src={images.leo} alt="Leo" />
              <div className="dog-info">
                <h3>Leo Gonzalez</h3>
                <span>Coach Dog in Training • CKC Certified</span>
                <p>
                  Welcoming Leo Gonzalez into the AngelKerr family has been nothing short of 
                  a delight! Leo, a stunning <strong>blue merle standard Australian Shepherd</strong>, 
                  brings not only his distinctive appearance but also an impressive level of 
                  intelligence to our team.
                </p>
                <p>
                  Certified by the CKC, Leo has quickly become an integral part of the family 
                  since his birth on <strong>August 6, 2023</strong>. Currently, he's undergoing 
                  training with the goal of becoming our esteemed AngelKerr coach dog—a role 
                  we believe he is destined to excel in.
                </p>
                <p>
                  This little guy is a bundle of energy and charm! Follow us on Facebook, 
                  Instagram, or TikTok to witness Leo's journey and stay updated on all our antics.
                </p>
                <p className="dog-cert">
                  <CheckCircle size={16} /> CKC Certified
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="location-section">
        <div className="container">
          <div className="location-grid">
            <motion.div 
              className="location-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MapPin className="location-icon" />
              <h3>Training Facility Location</h3>
              <address>
                <strong>122 Ellesmere Rd.</strong><br />
                Scarborough, ON M1R-4C4<br />
                <em>(Lower Level)</em>
              </address>
              <p>
                We offer training by appointment at our facility and in-home service 
                within our coverage area.
              </p>
            </motion.div>

            <motion.div 
              className="location-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3>Business Hours</h3>
              <div className="hours-list">
                <div><span>Monday - Friday</span><span>10:30 AM - 7:00 PM</span></div>
                <div><span>Saturday</span><span>12:00 PM - 6:00 PM</span></div>
                <div><span>Sunday</span><span>Closed</span></div>
              </div>
              <p className="booking-note">
                <strong>Call-in Booking Hours:</strong> 9AM - 9PM Daily
              </p>
            </motion.div>

            <motion.div 
              className="location-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3>GTA Coverage Area</h3>
              <p className="coverage-headline">Scarborough to Georgina and beyond!</p>
              <div className="areas-tags">
                <span>Scarborough</span>
                <span>Newmarket</span>
                <span>Stouffville</span>
                <span>Markham</span>
                <span>East Gwillimbury</span>
                <span>Georgina</span>
                <span>Aurora</span>
                <span>Keswick</span>
                <span>Sutton</span>
                <span>Beaverton</span>
              </div>
              <p className="coverage-note">*Extra charge for travel outside service area</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="philosophy-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="philosophy-icon" />
            <h2>Our Training Philosophy</h2>
            <p>
              Our training techniques are <strong>positive reinforcement based</strong> and 
              strictly follow the <strong>CCPDT-KA standards</strong>. Training a dog is based 
              on earning a reward, as opposed to avoiding a punishment.
            </p>
            <p>
              The more your dog is appropriately behaved by society standards, the more 
              opportunities you and your dog will have.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Transform Your Dog's Behavior?</h2>
          <p>We'd love to hear from you—let's talk about your dog!</p>
          <div className="cta-contacts">
            <a href="tel:647-528-9442" className="btn btn-primary btn-lg">
              <Phone size={20} /> 647-528-9442
            </a>
            <a href="mailto:angelkerrdogtraining@gmail.com" className="btn btn-ghost-light btn-lg">
              <Mail size={20} /> Email Us
            </a>
          </div>
          <Link to="/book" className="book-link">
            Or book a consultation online <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About
