import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, Sun, Download, CreditCard, Palmtree } from 'lucide-react'
import {
  SCHEDULE_META,
  GROUP_CLASS_PROGRAMS,
  getScheduleByMonth,
  getMonthLabel,
  formatScheduleDate,
  formatScheduleDateShort,
  buildGroupClassBookUrl,
} from '../data/groupClassSchedule'
import './GroupClassSchedule.css'

function GroupClassSchedule({
  showFullSchedule = true,
  upcomingLimit = null,
  hideFullCalendarLink = false,
  id = 'group-schedule',
}) {
  const scheduleByMonth = useMemo(() => getScheduleByMonth(new Date()), [])

  const displayMonths = useMemo(() => {
    if (!upcomingLimit) return scheduleByMonth
    let count = 0
    const limited = []
    for (const [monthKey, days] of scheduleByMonth) {
      const remaining = upcomingLimit - count
      if (remaining <= 0) break
      const slice = days.slice(0, remaining)
      limited.push([monthKey, slice])
      count += slice.length
    }
    return limited
  }, [scheduleByMonth, upcomingLimit])

  return (
    <section className="group-schedule" id={id}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Group Class Calendar</span>
          <h2>{SCHEDULE_META.title}</h2>
          <p>{SCHEDULE_META.season} — Saturdays at our facility. Book your spot online; deposits can be collected securely through this website.</p>
        </motion.div>

        <div className="schedule-time-legend">
          {SCHEDULE_META.timeBlocks.map((block) => (
            <div key={block.id} className={`schedule-legend-item schedule-legend-item--${block.id}`}>
              <Clock size={18} />
              <div>
                <strong>{block.label}</strong>
                <span>{block.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="schedule-vacation-notice">
          <Palmtree size={20} />
          <span>{SCHEDULE_META.vacation.label}</span>
        </div>

        <div className="schedule-programs">
          <Sun size={18} />
          <p>
            Programs this season:{' '}
            {GROUP_CLASS_PROGRAMS.map((name, i) => (
              <span key={name}>
                {i > 0 && (i === GROUP_CLASS_PROGRAMS.length - 1 ? ' & ' : ', ')}
                <strong>{name}</strong>
              </span>
            ))}
          </p>
        </div>

        <div className="schedule-months">
          {displayMonths.map(([monthKey, days], monthIndex) => (
            <motion.div
              key={monthKey}
              className="schedule-month"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: monthIndex * 0.05 }}
            >
              <h3 className="schedule-month-title">
                <Calendar size={20} />
                {getMonthLabel(monthKey)}
              </h3>

              <div className="schedule-date-cards">
                {days.map((day) => (
                  <article key={day.date} className="schedule-date-card">
                    <header className="schedule-date-card__header">
                      <time dateTime={day.date}>
                        <span className="schedule-date-card__weekday">
                          {formatScheduleDate(day.date).split(',')[0]}
                        </span>
                        <span className="schedule-date-card__date">
                          {formatScheduleDateShort(day.date)}
                        </span>
                      </time>
                    </header>

                    <ul className="schedule-sessions">
                      {day.sessions.map((session) => (
                        <li
                          key={`${day.date}-${session.program}-${session.slot}`}
                          className={`schedule-session schedule-session--${session.slot}`}
                        >
                          <div className="schedule-session__info">
                            <span className="schedule-session__time">{session.time}</span>
                            <span className="schedule-session__program">{session.program}</span>
                            {session.instructor === 'Paul' && (
                              <span className="schedule-session__instructor">with Paul</span>
                            )}
                          </div>
                          <Link
                            to={buildGroupClassBookUrl({
                              date: day.date,
                              program: session.program,
                              slot: session.slot,
                            })}
                            className="btn btn-primary btn-sm schedule-session__cta"
                          >
                            Book Your Spot
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {showFullSchedule && (
          <div className="schedule-footer">
            <div className="schedule-deposit-note">
              <CreditCard size={20} />
              <p>
                Ready to join a class? Choose <strong>Register Now</strong> on any session above to
                complete your booking request. We can collect your class deposit online when you register.
              </p>
            </div>

            <ul className="schedule-notes">
              {SCHEDULE_META.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>

            <div className="schedule-footer-actions">
              {!hideFullCalendarLink && (
                <Link to="/schedule" className="btn btn-outline">
                  View Full Calendar
                </Link>
              )}
              <a
                href="/AngelKerr_Calendar_Schedule_2026_2027.pdf"
                className="btn btn-outline"
                download
              >
                <Download size={18} /> Download PDF Schedule
              </a>
              <Link to="/book?service=group-training" className="btn btn-primary">
                Register Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default GroupClassSchedule
