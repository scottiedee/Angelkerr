import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calendar, Clock, Phone, Mail, 
  ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Loader, Users
} from 'lucide-react'
import { collection, addDoc, serverTimestamp, query, getDocs, where } from 'firebase/firestore'
import { db } from '../firebase'
import {
  GROUP_CLASS_SCHEDULE,
  parseScheduleDate,
  findGroupClassSession,
  formatScheduleDate,
} from '../data/groupClassSchedule'
import { useBookingAvailability } from '../hooks/useBookingAvailability'
import './Book.css'

const groupClassTimeSlots = ['10:00 AM', '12:00 PM', '4:00 PM']

const groupClassDateSet = new Set(GROUP_CLASS_SCHEDULE.map((d) => d.date))

const services = [
  { id: 'consultation', name: 'Initial Consultation', duration: '30 min', desc: 'Free meet & greet to discuss your dog\'s needs' },
  { id: 'group-training', name: 'Group Training', duration: '1 hour', desc: 'Fun, social obedience classes with other pups' },
  { id: '1on1', name: '1-on-1 Private Training', duration: '1 hour', desc: 'Personalized attention for you and your dog' },
  { id: 'board-train', name: 'Board & Train Consultation', duration: '45 min', desc: 'Explore our intensive live-in training program' },
  { id: 'boarding', name: 'Boarding Inquiry', duration: '30 min', desc: 'Plan a comfortable stay for your furry friend' },
]

const timeSlotsByDay = {
  0: ['11:00 AM'], // Sunday
  1: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'], // Monday
  2: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'], // Tuesday
  3: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'], // Wednesday
  4: ['1:00 PM', '2:00 PM', '3:00 PM', '7:00 PM'], // Thursday
  5: ['1:00 PM', '2:00 PM', '3:00 PM', '7:00 PM'], // Friday
  6: ['11:00 AM', '12:00 PM', '1:00 PM'], // Saturday
}

const getTimeSlotsForDate = (date, serviceId) => {
  if (!date) return []
  const dayOfWeek = date.getDay()
  if (serviceId === 'group-training' && dayOfWeek === 6) {
    return groupClassTimeSlots
  }
  return timeSlotsByDay[dayOfWeek] || []
}

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()
const holidayMonthDays = new Set(['01-01', '07-01', '12-25', '12-26'])

const formatMonthDay = (date) =>
  `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const getDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const isHoliday = (date) => holidayMonthDays.has(formatMonthDay(date))

const localDateToIso = (date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0)
  return normalized.toISOString()
}

function Book() {
  const [searchParams] = useSearchParams()
  const { bookedSessionKeys, bookedSlotsByDate } = useBookingAvailability()

  const lockedGroupSession = useMemo(() => {
    if (searchParams.get('service') !== 'group-training') return null
    const program = searchParams.get('program')
    const date = searchParams.get('date')
    const time = searchParams.get('time')
    if (!program || !date || !time) return null
    return findGroupClassSession({ date, program, time })
  }, [searchParams])

  const isGroupClassBooking = Boolean(lockedGroupSession)
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

  useEffect(() => {
    if (!lockedGroupSession) return

    setSelectedService('group-training')
    setSelectedDate(parseScheduleDate(lockedGroupSession.scheduleDate))
    setSelectedTime(lockedGroupSession.bookingTime)
    setCurrentMonth(parseScheduleDate(lockedGroupSession.scheduleDate).getMonth())
    setCurrentYear(parseScheduleDate(lockedGroupSession.scheduleDate).getFullYear())
  }, [lockedGroupSession])

  const selectedDateKey = selectedDate ? getDateKey(selectedDate) : null
  const unavailableTimes = selectedDateKey ? bookedSlotsByDate[selectedDateKey] || new Set() : new Set()
  const groupSessionTaken = lockedGroupSession
    ? bookedSessionKeys.has(lockedGroupSession.sessionKey)
    : false

  useEffect(() => {
    if (selectedTime && unavailableTimes.has(selectedTime)) {
      setSelectedTime(null)
    }
  }, [selectedTime, unavailableTimes])

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
      const dateKey = getDateKey(date)
      const isPast = date < minDate
      const isGroupDay = selectedService === 'group-training' && dayOfWeek === 6
      const isScheduledGroupDay = isGroupDay && groupClassDateSet.has(dateKey)
      const daySlots = getTimeSlotsForDate(date, selectedService)
      const allSlotsTaken = daySlots.length > 0 && (bookedSlotsByDate[dateKey]?.size || 0) >= daySlots.length

      const noSlots = daySlots.length === 0
      const groupOnlyBlocked = selectedService === 'group-training' && dayOfWeek === 6 && !isScheduledGroupDay

      days.push({
        day,
        date,
        disabled: isPast || isHoliday(date) || noSlots || groupOnlyBlocked || allSlotsTaken,
        isSunday: dayOfWeek === 0
      })
    }
    
    return days
  }, [currentMonth, currentYear, minDate, bookedSlotsByDate, selectedService])

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
    if (isGroupClassBooking) return
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

    if (isGroupClassBooking && !lockedGroupSession) {
      setError('This class session is invalid. Please choose a class from the schedule.')
      return
    }

    if (isGroupClassBooking && groupSessionTaken) {
      setError('Sorry, this class spot was just taken. Please pick another session from the schedule.')
      return
    }
    
    if (!selectedDate || !selectedTime || !selectedService) {
      setError(isGroupClassBooking
        ? 'Class details are missing. Please return to the schedule and try again.'
        : 'Please select a service, date, and time')
      return
    }

    if (isHoliday(selectedDate)) {
      setError('We are closed on holidays. Please pick a different date.')
      return
    }

    if (!isGroupClassBooking && unavailableTimes.has(selectedTime)) {
      setError('That time is no longer available. Please choose another slot.')
      return
    }
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.dogName) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const selectedDateIso = isGroupClassBooking
        ? localDateToIso(parseScheduleDate(lockedGroupSession.scheduleDate))
        : localDateToIso(selectedDate)

      if (isGroupClassBooking) {
        const sessionQuery = query(
          collection(db, 'bookings'),
          where('classSessionKey', '==', lockedGroupSession.sessionKey)
        )
        const sessionSnapshot = await getDocs(sessionQuery)
        const sessionTaken = sessionSnapshot.docs.some(
          (bookingDoc) => bookingDoc.data().status !== 'cancelled'
        )

        if (sessionTaken) {
          setError('Sorry, this class spot was just taken. Please pick another session from the schedule.')
          setLoading(false)
          return
        }

        await addDoc(collection(db, 'bookings'), {
          bookingType: 'group-class',
          service: 'group-training',
          serviceName: 'Group Training',
          bookedClass: lockedGroupSession.program,
          groupProgram: lockedGroupSession.program,
          classSlot: lockedGroupSession.slot,
          classTimeDisplay: lockedGroupSession.timeDisplay,
          classInstructor: lockedGroupSession.instructor,
          scheduleDate: lockedGroupSession.scheduleDate,
          classSessionKey: lockedGroupSession.sessionKey,
          date: selectedDateIso,
          dateFormatted: formatScheduleDate(lockedGroupSession.scheduleDate),
          time: lockedGroupSession.bookingTime,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dogName: formData.dogName,
          dogBreed: formData.dogBreed,
          dogAge: formData.dogAge,
          message: formData.message,
          status: 'pending',
          createdAt: serverTimestamp(),
        })
      } else {
        const sameDateQuery = query(
          collection(db, 'bookings'),
          where('date', '==', selectedDateIso)
        )
        const sameDateSnapshot = await getDocs(sameDateQuery)
        const hasConflict = sameDateSnapshot.docs.some((bookingDoc) => {
          const booking = bookingDoc.data()
          return booking.time === selectedTime && booking.status !== 'cancelled'
        })

        if (hasConflict) {
          setError('That time has just been booked. Please pick another time.')
          setLoading(false)
          setSelectedTime(null)
          return
        }

        await addDoc(collection(db, 'bookings'), {
          bookingType: 'consultation',
          service: selectedService,
          serviceName: services.find(s => s.id === selectedService)?.name,
          bookedClass: null,
          groupProgram: null,
          classSessionKey: null,
          date: selectedDateIso,
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
          status: 'pending',
          createdAt: serverTimestamp(),
        })
      }
      
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
            <h2>We Can't Wait to Meet You!</h2>
            <p>
              Thank you, {formData.firstName}! Your{' '}
              {isGroupClassBooking ? 'group class registration' : 'consultation request'} has been received:
            </p>
            <div className="confirmation-details">
              {isGroupClassBooking && lockedGroupSession ? (
                <>
                  <p><strong>Class:</strong> {lockedGroupSession.program}</p>
                  <p><strong>Date:</strong> {formatScheduleDate(lockedGroupSession.scheduleDate)}</p>
                  <p><strong>Time:</strong> {lockedGroupSession.timeDisplay}</p>
                  {lockedGroupSession.instructor && (
                    <p><strong>Instructor:</strong> {lockedGroupSession.instructor}</p>
                  )}
                </>
              ) : (
                <>
                  <p><strong>Service:</strong> {services.find(s => s.id === selectedService)?.name}</p>
                  <p><strong>Date:</strong> {formatSelectedDate()}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                </>
              )}
              <p><strong>Dog:</strong> {formData.dogName}</p>
            </div>
            <p className="confirmation-note">
              {isGroupClassBooking
                ? "We'll contact you within 24 hours to confirm your spot. Class deposits can be arranged through our website when we confirm your registration."
                : "We'll contact you within 24 hours to confirm your appointment."}
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
            <h1>
              {isGroupClassBooking
                ? 'Register for Group Class'
                : selectedService === 'group-training'
                  ? 'Group Class Registration'
                  : 'Book a Consultation'}
            </h1>
            <p>
              {isGroupClassBooking
                ? 'Complete your details below to reserve the class you selected.'
                : selectedService === 'group-training'
                  ? 'Choose a class from our schedule to register for a specific date and program.'
                  : "Let's discuss your dog's needs and create a training plan together"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="booking-section">
        <div className="container">
          <form onSubmit={handleSubmit} className="booking-form">
            {searchParams.get('service') === 'group-training' && !lockedGroupSession && (
              <div className="error-message group-class-pick-message">
                <AlertCircle size={18} />
                <div>
                  <p>Please pick a specific class from the calendar first.</p>
                  <Link to="/schedule" className="btn btn-primary btn-sm">View Class Schedule</Link>
                </div>
              </div>
            )}

            {isGroupClassBooking && lockedGroupSession && (
              <motion.div
                className="form-step group-class-locked"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2><span>1</span> Your Class</h2>
                {groupSessionTaken ? (
                  <div className="error-message">
                    <AlertCircle size={18} />
                    This spot is no longer available.{' '}
                    <Link to="/schedule">Choose another class</Link>
                  </div>
                ) : (
                  <div className="group-class-summary-card">
                    <Users className="group-class-summary-icon" />
                    <div>
                      <p className="group-class-summary-label">You are booking</p>
                      <h3>{lockedGroupSession.program}</h3>
                      <p>
                        <Calendar size={16} />
                        {formatScheduleDate(lockedGroupSession.scheduleDate)}
                      </p>
                      <p>
                        <Clock size={16} />
                        {lockedGroupSession.timeDisplay}
                        {lockedGroupSession.instructor && ` · with ${lockedGroupSession.instructor}`}
                      </p>
                    </div>
                  </div>
                )}
                <p className="group-booking-note">
                  Need a different class? <Link to="/schedule">Return to the schedule</Link>
                </p>
              </motion.div>
            )}

            {!isGroupClassBooking && (
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
              {selectedService === 'group-training' && (
                <p className="group-booking-note">
                  Group classes must be booked from the calendar so we know your exact class and date.{' '}
                  <Link to="/schedule">View class schedule</Link>
                </p>
              )}
            </motion.div>
            )}

            {!isGroupClassBooking && (
            <motion.div 
              className="form-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2><span>2</span> Choose Date & Time</h2>
              <p className="step-note">
                <AlertCircle size={16} />
                {selectedService === 'group-training'
                  ? ' Group classes run on scheduled Saturdays only (see calendar). Bookings must be at least 1 week in advance.'
                  : ' Bookings must be at least 1 week in advance. Holidays are unavailable.'}
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
                      {getTimeSlotsForDate(selectedDate, selectedService).map(time => (
                        <button
                          key={time}
                          type="button"
                          className={`time-slot ${selectedTime === time ? 'selected' : ''} ${unavailableTimes.has(time) ? 'disabled' : ''}`}
                          onClick={() => !unavailableTimes.has(time) && setSelectedTime(time)}
                          disabled={unavailableTimes.has(time)}
                        >
                          {time} {unavailableTimes.has(time) ? '(Unavailable)' : ''}
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
            )}

            <motion.div 
              className="form-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2><span>{isGroupClassBooking ? '2' : '3'}</span> Your Information</h2>
              
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

            {error && (
              <div className="error-message">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg submit-btn"
              disabled={loading || (isGroupClassBooking && groupSessionTaken) || (searchParams.get('service') === 'group-training' && !lockedGroupSession)}
            >
              {loading ? (
                <>
                  <Loader size={20} className="spin" /> Submitting...
                </>
              ) : (
                <>
                  <Calendar size={20} /> {isGroupClassBooking ? 'Register Now' : 'Request Booking'}
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
            <h3>Prefer to Chat?</h3>
            <p className="quick-note">Quick note: spring bookings are filling up fast.</p>
            <p>We're happy to answer your questions directly!</p>
            <div className="contact-options">
              <a href="tel:647-528-9442">
                <Phone size={18} /> 647-528-9442
              </a>
              <a href="mailto:angelkerrdogtraining@gmail.com">
                <Mail size={18} /> Email Us
              </a>
            </div>
            <p className="contact-hours">Phone consultation hours: Mon-Wed 11AM-7PM · Thu-Fri 1PM-4PM & 7PM-8PM · Sat 11AM-2PM · Sun 11AM only</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Book
