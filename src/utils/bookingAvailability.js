/**
 * Derives booked slot state from Firestore booking documents.
 */
export function parseBookingAvailability(bookings) {
  const bookedSessionKeys = new Set()
  const bookedSlotsByDate = {}

  for (const booking of bookings) {
    if (!booking || booking.status === 'cancelled') continue

    if (booking.classSessionKey) {
      bookedSessionKeys.add(booking.classSessionKey)
    }

    if (!booking.date || !booking.time) continue

    const bookingDate = new Date(booking.date)
    if (Number.isNaN(bookingDate.getTime())) continue

    const dateKey = `${bookingDate.getFullYear()}-${String(bookingDate.getMonth() + 1).padStart(2, '0')}-${String(bookingDate.getDate()).padStart(2, '0')}`

    if (!bookedSlotsByDate[dateKey]) {
      bookedSlotsByDate[dateKey] = new Set()
    }

    // Legacy: time-only blocks (consultations). Group classes use classSessionKey.
    if (booking.bookingType !== 'group-class') {
      bookedSlotsByDate[dateKey].add(booking.time)
    }
  }

  return { bookedSessionKeys, bookedSlotsByDate }
}

export function isGroupSessionBooked(bookedSessionKeys, sessionKey) {
  return bookedSessionKeys.has(sessionKey)
}
