import { motion } from 'framer-motion'
import GroupClassSchedule from '../components/GroupClassSchedule'
import './Schedule.css'

function Schedule() {
  return (
    <div className="schedule-page">
      <section className="page-hero schedule-page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1>Group Class Schedule</h1>
            <p>
              6-month calendar — June 2026 through February 2027. All group classes run on Saturdays.
            </p>
          </motion.div>
        </div>
      </section>

      <GroupClassSchedule hideFullCalendarLink id="calendar" />
    </div>
  )
}

export default Schedule
