import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const getUpcomingSessions = (startDate) => {
  const sessions = []
  const currentDate = new Date(startDate)
  currentDate.setHours(0, 0, 0, 0)
  const endDate = new Date(startDate)
  endDate.setFullYear(endDate.getFullYear() + 1)

  while (currentDate < endDate) {
    // Saturday session
    if (currentDate.getDay() === 6) {
      sessions.push(new Date(currentDate))
    }

    // Random weekday session (Monday to Friday)
    if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5 && Math.random() < 0.2) {
      sessions.push(new Date(currentDate))
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return sessions
}

export default function Calendar() {
  const [date, setDate] = useState(new Date())
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const upcomingSessions = getUpcomingSessions(today)
    setSessions(upcomingSessions)
  }, [])

  const changeMonth = (increment) => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + increment, 1)
    setDate(newDate)
  }

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const formatDate = (date) => {
    const day = date.getDate()
    const month = MONTHS[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth())
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    const calendarDays = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="text-center p-2"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day)
      const isToday = today.toDateString() === currentDate.toDateString()
      const isSession = sessions.some((session) => session.toDateString() === currentDate.toDateString())
      const isPastDate = currentDate < today

      calendarDays.push(
        <div
          key={day}
          className={`text-center p-2 ${
            isToday
              ? "bg-yellow-200 rounded-full font-bold"
              : isSession && !isPastDate
                ? "bg-blue-500 text-white rounded-full"
                : isPastDate
                  ? "text-gray-400"
                  : ""
          }`}
        >
          {day}
        </div>,
      )
    }

    return calendarDays
  }

  const getUpcomingFourSessions = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return sessions.filter((session) => session >= today).slice(0, 4)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Striver Calendar</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeMonth(-1)}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">{formatDate(date)}</span>
          <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-200" aria-label="Next month">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-md border p-4">
          <div className="grid grid-cols-7 gap-1">
            {DAYS.map((day) => (
              <div key={day} className="text-center font-medium text-gray-500">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Upcoming Practice Sessions</h3>
          {getUpcomingFourSessions().map((session) => (
            <div
              key={session.toISOString()}
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium">
                  {session.getDay() === 6 ? "Interview Practice" : "Additional Study Session"}
                </div>
                <div className="text-sm text-gray-500">{formatDate(session)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

