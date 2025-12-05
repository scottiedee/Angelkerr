import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, Clock, Phone, Mail, 
  ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Loader
} from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import './Book.css'

const services = [
  { id: 'consultation', name: 'Initial Consultation', duration: '30 min', desc: 'Free consultation to discuss your needs' },
  { id: 'group-training', name: 'Group Training', duration: '1 hour', desc: 'Group obedience classes' },
  { id: '1on1', name: '1-on-1 Training', duration: '1 hour', desc: 'Private training session' },
  { id: 'board-train', name: 'Board & Train Consultation', duration: '45 min', desc: 'Discuss board & train options' },
  { id: 'boarding', name: 'Boarding Inquiry', duration: '30 min', desc: 'Plan your dog\'s stay' },
]

const timeSlots = [
  '10:30 AM', '11:30 AM', '12:30 PM', '1:30 PM', 
  '2:30 PM', '3:30 PM', '4:30 PM', '5:30 PM'
]

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

function Book() {
  const [minDate] = useState(() => {
    const today = new Date()
    return new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) // 1 week from now
  })
  
  const [currentMonth, setCurrentMonth] = useState(() => minDate.getMonth())
  const [currentYear, setCurrentYear] = useState(() => minDate.getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedService, setSelectedService] = useState('')
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    dogName: '', dogBreed: '', dogAge: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  const calendarDays = useMemo(() => {
    const days = []
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    
    // Empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, disabled: true })
    }
    
    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const dayOfWeek = date.getDay()
      const isPast = date < minDate
      const isSunday = dayOfWeek === 0
      
      days.push({
        day,
        date,
        disabled: isPast || isSunday,
        isSunday
      })
    }
    
    return days
  }, [currentMonth, currentYear, minDate])

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
    } else {
      setCurrentMonth(m => m - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
    } else {
      setCurrentMonth(m => m + 1)
    }
  }

  const canGoPrev = () => {
    const prevDate = new Date(currentYear, currentMonth - 1, 1)
    const minMonthDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1)
    return prevDate >= minMonthDate
  }

  const selectDate = (dayObj) => {
    if (!dayObj.disabled) {
      setSelectedDate(dayObj.date)
      setSelectedTime(null)
    }
  }

  const formatSelectedDate = () => {
    if (!selectedDate) return ''
    return selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
    })
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!selectedDate || !selectedTime || !selectedService) {
      setError('Please select a service, date, and time')
      return
    }
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.dogName) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      // Save booking to Firebase
      await addDoc(collection(db, 'bookings'), {
        service: selectedService,
        serviceName: services.find(s => s.id === selectedService)?.name,
        date: selectedDate.toISOString(),
        dateFormatted: formatSelectedDate(),
        time: selectedTime,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dogName: formData.dogName,
        dogBreed: formData.dogBreed,
        dogAge: formData.dogAge,
        message: formData.message,
        status: 'pending', // pending, confirmed, cancelled
        createdAt: serverTimestamp()
      })
      
      setLoading(false)
      setSubmitted(true)
    } catch (err) {
      console.error('Error saving booking:', err)
      setError(`Failed to submit: ${err.message}. Please try again or call us directly.`)
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="book-page">
        <section className="page-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1>Book a Consultation</h1>
              <p>Schedule your appointment at least 1 week in advance</p>
            </motion.div>
          </div>
        </section>
        
        <section className="confirmation-section">
          <motion.div 
            className="confirmation-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="confirmation-icon" />
            <h2>Booking Request Received!</h2>
            <p>Thank you, {formData.firstName}! We've received your booking request for:</p>
            <div className="confirmation-details">
              <p><strong>Service:</strong> {services.find(s => s.id === selectedService)?.name}</p>
              <p><strong>Date:</strong> {formatSelectedDate()}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Dog:</strong> {formData.dogName}</p>
            </div>
            <p className="confirmation-note">
              We'll contact you within 24 hours to confirm your appointment.
            </p>
            <a href="tel:647-528-9442" className="btn btn-primary">
              <Phone size={18} /> Call to Confirm Sooner
            </a>
          </motion.div>
        </section>
      </div>
    )
  }

  return (
    <div className="book-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1>Book a Consultation</h1>
            <p>Schedule your appointment at least 1 week in advance</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="booking-section">
        <div className="container">
          <form onSubmit={handleSubmit} className="booking-form">
            {/* Step 1: Service */}
            <motion.div 
              className="form-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2><span>1</span> Select a Service</h2>
              <div className="services-grid">
                {services.map(service => (
                  <label 
                    key={service.id}
                    className={`service-option ${selectedService === service.id ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={selectedService === service.id}
                      onChange={(e) => setSelectedService(e.target.value)}
                    />
                    <div className="service-content">
                      <strong>{service.name}</strong>
                      <span className="service-duration">{service.duration}</span>
                      <p>{service.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Step 2: Date & Time */}
            <motion.div 
              className="form-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2><span>2</span> Choose Date & Time</h2>
              <p className="step-note">
                <AlertCircle size={16} /> Bookings must be at least 1 week in advance. Closed Sundays.
              </p>
              
              <div className="datetime-grid">
                {/* Calendar */}
                <div className="calendar">
                  <div className="calendar-header">
                    <button type="button" onClick={prevMonth} disabled={!canGoPrev()}>
                      <ChevronLeft />
                    </button>
                    <span>{monthNames[currentMonth]} {currentYear}</span>
                    <button type="button" onClick={nextMonth}>
                      <ChevronRight />
                    </button>
                  </div>
                  
                  <div className="calendar-weekdays">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                  
                  <div className="calendar-days">
                    {calendarDays.map((dayObj, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`calendar-day ${dayObj.disabled ? 'disabled' : ''} 
                          ${selectedDate && dayObj.date?.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
                        onClick={() => selectDate(dayObj)}
                        disabled={dayObj.disabled}
                      >
                        {dayObj.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="time-slots">
                  <h3><Clock size={18} /> Available Times</h3>
                  {selectedDate ? (
                    <div className="slots-grid">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          type="button"
                          className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="slots-placeholder">Select a date to see available times</p>
                  )}
                </div>
              </div>

              {selectedDate && selectedTime && (
                <div className="selection-summary">
                  <Calendar size={18} />
                  <span>{formatSelectedDate()} at {selectedTime}</span>
                </div>
              )}
            </motion.div>

            {/* Step 3: Your Info */}
            <motion.div 
              className="form-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2><span>3</span> Your Information</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name *</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              <h3 className="subsection-title">About Your Dog</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Dog's Name *</label>
                  <input 
                    type="text" 
                    name="dogName"
                    value={formData.dogName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Breed</label>
                  <input 
                    type="text" 
                    name="dogBreed"
                    value={formData.dogBreed}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input 
                    type="text" 
                    name="dogAge"
                    value={formData.dogAge}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 years"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Tell us about your dog and goals</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Describe any behavioral issues, training goals, or questions you have..."
                ></textarea>
              </div>
            </motion.div>

            {/* Debug info - remove later */}
            <div style={{background: '#f0f0f0', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem'}}>
              <strong>Debug:</strong><br/>
              Service: {selectedService || 'NOT SELECTED'}<br/>
              Date: {selectedDate ? selectedDate.toDateString() : 'NOT SELECTED'}<br/>
              Time: {selectedTime || 'NOT SELECTED'}
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <Loader size={20} className="spin" /> Submitting...
                </>
              ) : (
                <>
                  <Calendar size={20} /> Request Booking
                </>
              )}
            </button>
          </form>

          {/* Contact Alternative */}
          <motion.div 
            className="contact-alternative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3>Prefer to talk?</h3>
            <p>Call us directly to book or ask questions</p>
            <div className="contact-options">
              <a href="tel:647-528-9442">
                <Phone size={18} /> 647-528-9442
              </a>
              <a href="mailto:angelkerrdogtraining@gmail.com">
                <Mail size={18} /> Email Us
              </a>
            </div>
            <p className="contact-hours">Booking hours: 9AM - 9PM Daily</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Book
