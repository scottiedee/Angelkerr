import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, Clock, Phone, Mail, User, Dog, 
  CheckCircle, XCircle, Loader, LogOut, Lock,
  ChevronDown, ChevronUp, Trash2
} from 'lucide-react'
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { auth, db } from '../firebase'
import './Admin.css'

function Admin() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState('all') // all, pending, confirmed, cancelled
  const [expandedBooking, setExpandedBooking] = useState(null)
  
  // Login form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Fetch bookings when logged in
  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setBookings(bookingsData)
    })

    return () => unsubscribe()
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error('Login error:', err)
      setLoginError('Invalid email or password')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: newStatus
      })
    } catch (err) {
      console.error('Error updating booking:', err)
    }
  }

  const deleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'bookings', bookingId))
      } catch (err) {
        console.error('Error deleting booking:', err)
      }
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    return booking.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#22c55e'
      case 'cancelled': return '#ef4444'
      default: return '#f59e0b'
    }
  }

  const formatDate = (dateString, scheduleDate) => {
    if (scheduleDate) {
      try {
        const [y, m, d] = scheduleDate.split('-').map(Number)
        return new Date(y, m - 1, d).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      } catch {
        return scheduleDate
      }
    }
    if (!dateString) return 'N/A'
    try {
      const parsed = new Date(dateString)
      return parsed.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const getBookingTitle = (booking) => {
    if (booking.bookingType === 'group-class' || booking.bookedClass) {
      return booking.bookedClass || booking.groupProgram || 'Group Class'
    }
    return booking.serviceName || 'Booking'
  }

  const getBookingSubtitle = (booking) => {
    if (booking.bookingType === 'group-class' || booking.bookedClass) {
      return 'Group Training · Saturday class'
    }
    return null
  }

  // Loading state
  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <Loader className="spin" size={40} />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Login form
  if (!user) {
    return (
      <div className="admin-page">
        <div className="login-container">
          <motion.div 
            className="login-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Lock className="login-icon" />
            <h1>Admin Login</h1>
            <p>Sign in to manage bookings</p>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {loginError && (
                <div className="login-error">{loginError}</div>
              )}

              <button type="submit" className="btn btn-primary" disabled={loginLoading}>
                {loginLoading ? (
                  <><Loader className="spin" size={18} /> Signing in...</>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <div>
              <h1>Booking Dashboard</h1>
              <p>Manage your appointments</p>
            </div>
            <button onClick={handleLogout} className="btn btn-outline logout-btn">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{bookings.length}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
            <div className="stat-card pending">
              <span className="stat-number">
                {bookings.filter(b => b.status === 'pending').length}
              </span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card confirmed">
              <span className="stat-number">
                {bookings.filter(b => b.status === 'confirmed').length}
              </span>
              <span className="stat-label">Confirmed</span>
            </div>
            <div className="stat-card cancelled">
              <span className="stat-number">
                {bookings.filter(b => b.status === 'cancelled').length}
              </span>
              <span className="stat-label">Cancelled</span>
            </div>
          </div>

          {/* Filter */}
          <div className="filter-bar">
            <span>Filter:</span>
            {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          <div className="bookings-list">
            {filteredBookings.length === 0 ? (
              <div className="no-bookings">
                <Calendar size={48} />
                <p>No bookings found</p>
              </div>
            ) : (
              filteredBookings.map(booking => (
                <motion.div
                  key={booking.id}
                  className="booking-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div 
                    className="booking-header"
                    onClick={() => setExpandedBooking(
                      expandedBooking === booking.id ? null : booking.id
                    )}
                  >
                    <div className="booking-main-info">
                      <span 
                        className="booking-status"
                        style={{ backgroundColor: getStatusColor(booking.status) }}
                      >
                        {booking.status}
                      </span>
                      {(booking.bookingType === 'group-class' || booking.bookedClass) && (
                        <span className="booking-type-badge">Group Class</span>
                      )}
                      <h3>{booking.firstName} {booking.lastName}</h3>
                      <span className="booking-service booking-service--primary">
                        {getBookingTitle(booking)}
                      </span>
                      {getBookingSubtitle(booking) && (
                        <span className="booking-service booking-service--muted">
                          {getBookingSubtitle(booking)}
                        </span>
                      )}
                    </div>
                    <div className="booking-date-info">
                      <span>
                        <Calendar size={16} />{' '}
                        {formatDate(booking.date, booking.scheduleDate)}
                      </span>
                      <span>
                        <Clock size={16} />{' '}
                        {booking.classTimeDisplay || booking.time}
                      </span>
                    </div>
                    {expandedBooking === booking.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>

                  {expandedBooking === booking.id && (
                    <motion.div 
                      className="booking-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                    >
                      {(booking.bookedClass || booking.groupProgram) && (
                        <div className="booking-class-detail">
                          <strong>Registered for</strong>
                          <p className="booking-class-name">
                            {booking.bookedClass || booking.groupProgram}
                          </p>
                          {booking.classTimeDisplay && (
                            <p className="booking-class-meta">{booking.classTimeDisplay}</p>
                          )}
                          {booking.classInstructor && (
                            <p className="booking-class-meta">Instructor: {booking.classInstructor}</p>
                          )}
                          {booking.scheduleDate && (
                            <p className="booking-class-meta">Schedule date: {booking.scheduleDate}</p>
                          )}
                        </div>
                      )}

                      <div className="details-grid">
                        <div className="detail-item">
                          <Phone size={16} />
                          <a href={`tel:${booking.phone}`}>{booking.phone}</a>
                        </div>
                        <div className="detail-item">
                          <Mail size={16} />
                          <a href={`mailto:${booking.email}`}>{booking.email}</a>
                        </div>
                        <div className="detail-item">
                          <Dog size={16} />
                          <span>
                            {booking.dogName}
                            {booking.dogBreed && ` (${booking.dogBreed})`}
                            {booking.dogAge && `, ${booking.dogAge}`}
                          </span>
                        </div>
                      </div>

                      {booking.message && (
                        <div className="booking-message">
                          <strong>Notes:</strong>
                          <p>{booking.message}</p>
                        </div>
                      )}

                      <div className="booking-actions">
                        {booking.status !== 'confirmed' && (
                          <button
                            className="action-btn confirm"
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          >
                            <CheckCircle size={16} /> Confirm
                          </button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <button
                            className="action-btn cancel"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          >
                            <XCircle size={16} /> Cancel
                          </button>
                        )}
                        {booking.status !== 'pending' && (
                          <button
                            className="action-btn pending"
                            onClick={() => updateBookingStatus(booking.id, 'pending')}
                          >
                            Set Pending
                          </button>
                        )}
                        <button
                          className="action-btn delete"
                          onClick={() => deleteBooking(booking.id)}
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin

