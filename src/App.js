import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Layout from './Layout';
import Home from './components/Home'
import PersoenlicheDaten from './components/PersoenlicheDaten';
import Gruppenkalender from './components/Gruppenkalender';
import Hilfe from './components/Hilfe';
import EntryRoute from './components/EntryRoute';
import { Flex } from '@mantine/core';
import { useMemo } from 'react';

// URL: https://gefzi.vercel.app

function App() {

  //Variablen und Konstanten, die in der App-Komponente gesetzt und an Kinder-Komponenten vererbt werden
  const location = useLocation()
  const hideLocation = location.pathname == "/login"
  const [userIdParams, setUserIdParams] = useState("")
  const [user, setUser] = useState(undefined)
  const [userList, setUserList] = useState([])
  const [calendar, setCalendar] = useState({})
  const [events, setEvents] = useState({})
  const [holiday, setHoliday] = useState([])
  const [freeSlots, setFreeSlots] = useState([])
  const [currentYear, setCurrentYear] = useState(2026)

  //setzt den user auf den User mit der userId, die in der URL steht
  useEffect(() => {
    fetch('http://localhost:8080/users') 
    .then(response => {
      if (!response.ok) {
      throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => setUser(data.find((user) => user.user_id == userIdParams)))
    .catch(error => console.error('Error fetching data:', error))
  }, [userIdParams])

  //setzt Variablen auf Listen aus der data.json
  useEffect(() => {
    fetchData('http://localhost:8080/groupcalendars', setCalendar)
    fetchData('http://localhost:8080/events', setEvents)
    fetchData('http://localhost:8080/users', setUserList)
    fetchData('https://get.api-feiertage.de?all_states=true', setHoliday)
  }, [])

  //ruft Funktion zur Auflistung von freie Zeiten auf Grundlage von gebuchten Terminen, Arbeitszeiten und 
  //bundesweiten Feiertagen auf, wenn sich einer der genannten Grundlageneinflüsse ändert
  useEffect(() => {
    if (!events.length || !calendar) return

    const free = calcFreeTimesForDateRange(events, calendar)
    setFreeSlots(free)

  }, [events, calendar, holiday])

  //standardisierte Funktion zur Abfrage von Daten aus data.json
  const fetchData = async (url, setter) => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setter(data)
    } catch (error) {
      console.error(`Error fetching ${url}:`, error)
    }
  }

  //findet Kalender, der zu dem eingeloggten User zugeordnet ist über den Gruppenkalender-Fremdschlüssel
  const userCalendar = useMemo(() => {
    if (!user || !Array.isArray(calendar)) return null
    return calendar.find(c => c.group_calendar_id === user.group_calendar_id)
  }, [user, calendar])

  //findet die Events, die über den Fremdschlüssel des Gruppenkalenders zu dem behandelten Kalender zugeordnet werden
  const calendarEvents = useMemo(() => {
    if (!userCalendar || !Array.isArray(events)) return null
    return events.filter(e => e.group_calendar_id === userCalendar.group_calendar_id)
  }, [user, calendar])

  //Funktion zur Berechnung der freien Zeiten
  function calcFreeTimes(booked) {
    const DAY_START = toMinutes(calendar?.work_start ?? "08:00")
    const DAY_END   = toMinutes(calendar?.work_end ?? "18:00")
    const MIN_FREE  = 30
    const MAX_WIDTH = 88
    const free = []

    const sorted = booked
      .map(b => ({ start: toMinutes(b.start), end: toMinutes(b.end) }))
      .sort((a, b) => a.start - b.start)

    let lastEnd = DAY_START

    for (const b of sorted) {
      if (b.start > lastEnd) {
        const duration = b.start - lastEnd
        if (duration >= MIN_FREE) {
          free.push({
            start: toHHMM(lastEnd),
            end: toHHMM(b.start),
            minutes: duration,
            width: (duration / 600) * MAX_WIDTH,
            left: ((lastEnd - DAY_START) / 600) * MAX_WIDTH
          })
        }
      }
      lastEnd = Math.max(lastEnd, b.end)
    }

    if (lastEnd < DAY_END) {
      const duration = DAY_END - lastEnd
      if (duration >= MIN_FREE) {
        free.push({
          start: toHHMM(lastEnd),
          end: toHHMM(DAY_END),
          minutes: duration,
          width: (duration / 600) * MAX_WIDTH,
          left: ((lastEnd - DAY_START) / 600) * MAX_WIDTH
        })
      }
    }

    return free
  }

  //listet alle freien Zeiten in Objekten auf und ruft die Berechnung der freien Zeiten auf
  function calcFreeTimesForDateRange(events, calendar) {
    const grouped = groupEventsByDate(events)
    const slots = []
    const today = new Date()
    const endDate = new Date("2026-12-31")
    today.setHours(0, 0, 0, 0)

    for (
      let d = new Date(today);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = formatDate(d)
      const bookedForDay = grouped[dateStr] ?? []

      const freeTimes = calcFreeTimes(bookedForDay, calendar)
      const holiDates = holiday?.feiertage?.map(f => f.date) || []

      for (const slot of freeTimes) {
        slots.push({
          date: dateStr,
          start: slot.start,
          end: slot.end,
          minutes: slot.minutes,
          holiday: holiDates.includes(dateStr),
          weekend: d.getDay() == 0 || d.getDay() == 6,
          width: slot.width,
          left: slot.left
        })
      }
    }

    return slots
  }

  //Gruppierung von events nach Datum
  function groupEventsByDate(events) {
    return events.reduce((acc, e) => {
      if (!acc[e.date]) acc[e.date] = []
      acc[e.date].push({
        start: e.start_time,
        end: e.end_time
      })
      return acc
    }, {})
  }

  //Funktion zur Umwandlung von Uhrzeiten in Minuten
  function toMinutes(time) {
    const [h, m] = time.split(":").map(Number)
    return h * 60 + m
  }

  //Funktion zur Umwandlung von Minuten in Uhrzeiten
  function toHHMM(min) {
    const h = Math.floor(min / 60)
    const m = min % 60
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  }

  //Funktion zur einheitlichen Formatierung von Datumselemnten
  function formatDate(date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
  }

  return (
    <Flex>
      {!hideLocation && <Layout userId={user?.user_id}/>}
      <Flex ml="5vw">
        <Routes>
          <Route path="/" element={<EntryRoute user={user} />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/:userId" element={<Home setUserIdParams={setUserIdParams}/>} />
          <Route path="/persoenlicheDaten/:userId" element={<PersoenlicheDaten setUserIdParams={setUserIdParams} 
                 user={user} calendar={userCalendar}/>} />
          <Route path="/gruppenkalender/:userId" element={<Gruppenkalender setUserIdParams={setUserIdParams} 
                 calendar={userCalendar} events={calendarEvents} freeSlots={freeSlots} currentYear={currentYear} 
                 setCurrentYear={setCurrentYear} userList={userList}/>} />
          <Route path="/hilfe/:userId" element={<Hilfe setUserIdParams={setUserIdParams}/>} />
        </Routes>
      </Flex>
    </Flex>
  );
}

export default App;
