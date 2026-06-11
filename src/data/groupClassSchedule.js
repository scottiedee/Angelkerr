/**
 * 6-Month Group Class Calendar — AngelKerr Dog Training (2026–2027)
 * Source: AngelKerr_Calendar_Schedule_2026_2027.pdf
 */

export const SCHEDULE_META = {
  title: '6-Month Group Class Calendar',
  season: 'July 2026 – February 2027',
  vacation: { start: '2026-07-18', end: '2026-07-26', label: 'Vacation Break — July 18–26, 2026' },
  timeBlocks: [
    { id: 'social', label: 'Puppy Socialization with Paul', time: '10:00 AM – 11:00 AM', slot: '10:00 AM' },
    { id: 'main', label: 'Main structured classes', time: '12:00 PM – 1:00 PM', slot: '12:00 PM' },
    { id: 'secondary', label: 'Optional secondary classes', time: '4:00 PM – 5:00 PM', slot: '4:00 PM' },
  ],
  notes: [
    'Vacation blocked: July 18–26, 2026',
    'Labour Day weekend intentionally skipped',
    'Thanksgiving weekend intentionally skipped',
    'All classes support online registration; deposits can be collected through this website.',
  ],
}

/** @type {{ date: string, sessions: { program: string, time: string, slot: 'social' | 'main' | 'secondary' }[] }[]} */
export const GROUP_CLASS_SCHEDULE = [
  {
    date: '2026-07-04',
    sessions: [{ program: 'Puppy Group 101', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2026-07-11',
    sessions: [
      { program: 'Puppy Socialization', time: '10:00 AM – 11:00 AM', slot: 'social', instructor: 'Paul' },
      { program: 'Puppy Group 101', time: '12:00 PM – 1:00 PM', slot: 'main' },
    ],
  },
  {
    date: '2026-07-25',
    sessions: [{ program: 'Puppy Group 101', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2026-08-01',
    sessions: [{ program: 'Puppy Group 101', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2026-08-08',
    sessions: [{ program: 'Puppy Group 101', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2026-08-22',
    sessions: [
      { program: 'Puppy Socialization', time: '10:00 AM – 11:00 AM', slot: 'social', instructor: 'Paul' },
      { program: 'Basic Fundamentals', time: '12:00 PM – 1:00 PM', slot: 'main' },
      { program: 'Mental Enrichment', time: '4:00 PM – 5:00 PM', slot: 'secondary' },
    ],
  },
  {
    date: '2026-08-29',
    sessions: [
      { program: 'Puppy Socialization', time: '10:00 AM – 11:00 AM', slot: 'social', instructor: 'Paul' },
      { program: 'Basic Fundamentals', time: '12:00 PM – 1:00 PM', slot: 'main' },
      { program: 'Mental Enrichment', time: '4:00 PM – 5:00 PM', slot: 'secondary' },
    ],
  },
  {
    date: '2026-09-12',
    sessions: [
      { program: 'Puppy Socialization', time: '10:00 AM – 11:00 AM', slot: 'social', instructor: 'Paul' },
      { program: 'Basic Fundamentals', time: '12:00 PM – 1:00 PM', slot: 'main' },
      { program: 'Mental Enrichment', time: '4:00 PM – 5:00 PM', slot: 'secondary' },
    ],
  },
  {
    date: '2026-09-19',
    sessions: [
      { program: 'Puppy Socialization', time: '10:00 AM – 11:00 AM', slot: 'social', instructor: 'Paul' },
      { program: 'Basic Fundamentals', time: '12:00 PM – 1:00 PM', slot: 'main' },
      { program: 'Mental Enrichment', time: '4:00 PM – 5:00 PM', slot: 'secondary' },
    ],
  },
  {
    date: '2026-09-26',
    sessions: [
      { program: 'Puppy Socialization', time: '10:00 AM – 11:00 AM', slot: 'social', instructor: 'Paul' },
      { program: 'Basic Fundamentals', time: '12:00 PM – 1:00 PM', slot: 'main' },
      { program: 'Mental Enrichment', time: '4:00 PM – 5:00 PM', slot: 'secondary' },
    ],
  },
  {
    date: '2026-10-03',
    sessions: [{ program: 'Puppy Socialization', time: '10:00 AM – 11:00 AM', slot: 'social', instructor: 'Paul' }],
  },
  {
    date: '2026-10-10',
    sessions: [{ program: 'Advanced Fundamentals', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2026-10-17',
    sessions: [{ program: 'Advanced Fundamentals', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2026-10-24',
    sessions: [{ program: 'Advanced Fundamentals', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2026-10-31',
    sessions: [{ program: 'Advanced Fundamentals', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2026-11-14',
    sessions: [{ program: 'Advanced Fundamentals', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2026-11-21',
    sessions: [
      { program: 'Intro to Agility', time: '12:00 PM – 1:00 PM', slot: 'main' },
      { program: 'Puppy Group 101', time: '4:00 PM – 5:00 PM', slot: 'secondary' },
    ],
  },
  {
    date: '2026-11-28',
    sessions: [
      { program: 'Intro to Agility', time: '12:00 PM – 1:00 PM', slot: 'main' },
      { program: 'Puppy Group 101', time: '4:00 PM – 5:00 PM', slot: 'secondary' },
    ],
  },
  {
    date: '2026-12-05',
    sessions: [
      { program: 'Intro to Agility', time: '12:00 PM – 1:00 PM', slot: 'main' },
      { program: 'Puppy Group 101', time: '4:00 PM – 5:00 PM', slot: 'secondary' },
    ],
  },
  {
    date: '2026-12-12',
    sessions: [
      { program: 'Intro to Agility', time: '12:00 PM – 1:00 PM', slot: 'main' },
      { program: 'Puppy Group 101', time: '4:00 PM – 5:00 PM', slot: 'secondary' },
    ],
  },
  {
    date: '2026-12-19',
    sessions: [
      { program: 'Intro to Agility', time: '12:00 PM – 1:00 PM', slot: 'main' },
      { program: 'Puppy Group 101', time: '4:00 PM – 5:00 PM', slot: 'secondary' },
    ],
  },
  {
    date: '2027-01-09',
    sessions: [{ program: 'Mental Enrichment', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2027-01-16',
    sessions: [{ program: 'Mental Enrichment', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2027-01-23',
    sessions: [{ program: 'Mental Enrichment', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2027-01-30',
    sessions: [{ program: 'Mental Enrichment', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
  {
    date: '2027-02-06',
    sessions: [{ program: 'Mental Enrichment', time: '12:00 PM – 1:00 PM', slot: 'main' }],
  },
]

export const GROUP_CLASS_PROGRAMS = [
  'Puppy Group 101',
  'Basic Fundamentals',
  'Mental Enrichment',
  'Advanced Fundamentals',
  'Intro to Agility',
  'Puppy Socialization',
]

/** Booking time value used in /book flow (matches calendar slot buttons) */
export const slotToBookingTime = {
  social: '10:00 AM',
  main: '12:00 PM',
  secondary: '4:00 PM',
}

export function parseScheduleDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatScheduleDate(dateStr) {
  return parseScheduleDate(dateStr).toLocaleDateString('en-CA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatScheduleDateShort(dateStr) {
  return parseScheduleDate(dateStr).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getMonthKey(dateStr) {
  const d = parseScheduleDate(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function getMonthLabel(monthKey) {
  const [y, m] = monthKey.split('-').map(Number)
  return new Date(y, m - 1, 1).toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })
}

export function getUpcomingScheduleDays(fromDate = new Date()) {
  const start = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
  return GROUP_CLASS_SCHEDULE.filter((day) => parseScheduleDate(day.date) >= start)
}

export function getScheduleByMonth(fromDate = new Date()) {
  const upcoming = getUpcomingScheduleDays(fromDate)
  const byMonth = new Map()
  for (const day of upcoming) {
    const key = getMonthKey(day.date)
    if (!byMonth.has(key)) byMonth.set(key, [])
    byMonth.get(key).push(day)
  }
  return [...byMonth.entries()].sort(([a], [b]) => a.localeCompare(b))
}

export function getClassSessionKey({ date, program, time }) {
  return `${date}|${time}|${program}`
}

/** Resolve the exact calendar session the customer clicked (date + program + bookable time). */
export function findGroupClassSession({ date, program, time }) {
  const day = GROUP_CLASS_SCHEDULE.find((d) => d.date === date)
  if (!day) return null

  const session = day.sessions.find(
    (s) => s.program === program && slotToBookingTime[s.slot] === time
  )
  if (!session) return null

  const bookingTime = slotToBookingTime[session.slot]

  return {
    scheduleDate: date,
    program: session.program,
    slot: session.slot,
    timeDisplay: session.time,
    bookingTime,
    instructor: session.instructor || null,
    sessionKey: getClassSessionKey({ date, program: session.program, time: bookingTime }),
  }
}

export function buildGroupClassBookUrl({ date, program, slot }) {
  const time = slotToBookingTime[slot]
  const params = new URLSearchParams({
    service: 'group-training',
    program,
    date,
    time,
    slot,
  })
  return `/book?${params.toString()}`
}
