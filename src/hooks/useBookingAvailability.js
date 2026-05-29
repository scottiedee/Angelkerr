import { useState, useEffect } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase'
import { parseBookingAvailability } from '../utils/bookingAvailability'

export function useBookingAvailability() {
  const [bookedSessionKeys, setBookedSessionKeys] = useState(() => new Set())
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState({})

  useEffect(() => {
    const bookingsQuery = query(collection(db, 'bookings'))
    const unsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
      const bookings = snapshot.docs.map((doc) => doc.data())
      const parsed = parseBookingAvailability(bookings)
      setBookedSessionKeys(parsed.bookedSessionKeys)
      setBookedSlotsByDate(parsed.bookedSlotsByDate)
    })

    return () => unsubscribe()
  }, [])

  return { bookedSessionKeys, bookedSlotsByDate }
}
