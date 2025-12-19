import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Layout from './Layout';
import Home from './components/Home'
import PersoenlicheDaten from './components/PersoenlicheDaten';
import Gruppenkalender from './components/Gruppenkalender';
import Hilfe from './components/Hilfe';
import { Flex } from '@mantine/core';
import { useMemo } from 'react';

function App() {

  const location = useLocation();
  const hideLocation = location.pathname == "/login";
  const [userIdParams, setUserIdParams] = useState("");
  const [user, setUser] = useState({});
  const [calendar, setCalendar] = useState({});
  const [events, setEvents] = useState({});
  const [freeSlots, setFreeSlots] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/user') 
    .then(response => {
      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setUser(data.find((user) => user.userId == userIdParams)))
    .catch(error => console.error('Error fetching data:', error));
  }, [userIdParams]);

  useEffect(() => {
    fetch('http://localhost:8000/calendar') 
    .then(response => {
      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data =>  setCalendar(data))
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/events') 
    .then(response => {
      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data =>  setEvents(data))
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (!events.length || !calendar) return;

    const free = calcFreeTimesForDateRange(events, calendar);
    setFreeSlots(free);

  }, [events, calendar]);

  const userCalendar = useMemo(() => {
    if (!user || !Array.isArray(calendar)) return null;
    return calendar.find(c => c.groupCalendarId === user.fk_groupCalendarId);
  }, [user, calendar]);

  const calendarEvents = useMemo(() => {
    if (!userCalendar || !Array.isArray(events)) return null;
    return events.filter(e => e.fk_groupCalendarId === userCalendar.groupCalendarId);
  }, [user, calendar]);

  function calcFreeTimes(booked) {
    const DAY_START = toMinutes(calendar?.workStart ?? "08:00");
    const DAY_END   = toMinutes(calendar?.workEnd ?? "18:00");
    const MIN_FREE  = 30;
    const MAX_WIDTH = 88;

    const sorted = booked
      .map(b => ({ start: toMinutes(b.start), end: toMinutes(b.end) }))
      .sort((a, b) => a.start - b.start);

    const free = [];

    let lastEnd = DAY_START;

    for (const b of sorted) {
      if (b.start > lastEnd) {
        const duration = b.start - lastEnd;
        if (duration >= MIN_FREE) {
          free.push({
            start: toHHMM(lastEnd),
            end: toHHMM(b.start),
            minutes: duration,
            width: (duration / 600) * MAX_WIDTH,
            left: ((lastEnd - DAY_START) / 600) * MAX_WIDTH
          });
        }
      }
      lastEnd = Math.max(lastEnd, b.end);
    }

    if (lastEnd < DAY_END) {
      const duration = DAY_END - lastEnd;
      if (duration >= MIN_FREE) {
        free.push({
            start: toHHMM(lastEnd),
            end: toHHMM(DAY_END),
            minutes: duration,
            width: (duration / 600) * MAX_WIDTH,
            left: ((lastEnd - DAY_START) / 600) * MAX_WIDTH
        });
      }
    }

    return free;
  }

  function calcFreeTimesForDateRange(events, calendar) {
    const grouped = groupEventsByDate(events);
    const slots = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date("2026-12-31");

    for (
      let d = new Date(today);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = formatDate(d);
      const bookedForDay = grouped[dateStr] ?? [];

      const freeTimes = calcFreeTimes(bookedForDay, calendar);

      for (const slot of freeTimes) {
        slots.push({
          date: dateStr,
          start: slot.start,
          end: slot.end,
          minutes: slot.minutes,
          width: slot.width,
          left: slot.left
        });
      }
    }

    return slots;
  }

  function groupEventsByDate(events) {
    return events.reduce((acc, e) => {
      if (!acc[e.date]) acc[e.date] = [];
      acc[e.date].push({
        start: e.startTime,
        end: e.endTime
      });
      return acc;
    }, {});
  }

  function toMinutes(time) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }

  function toHHMM(min) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`
  }

  console.log(freeSlots)

  return (
    <Flex>
      {!hideLocation && <Layout userId={user?.userId}/>}
      <Flex ml="5vw">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/:userId" element={<Home setUserIdParams={setUserIdParams}/>} />
          <Route path="/persoenlicheDaten/:userId" element={<PersoenlicheDaten setUserIdParams={setUserIdParams} user={user} calendar={userCalendar}/>} />
          <Route path="/gruppenkalender/:userId" element={<Gruppenkalender setUserIdParams={setUserIdParams} calendar={userCalendar} events={calendarEvents} freeSlots={freeSlots}/>} />
          <Route path="/hilfe/:userId" element={<Hilfe setUserIdParams={setUserIdParams}/>} />
        </Routes>
      </Flex>
    </Flex>
  );
}

export default App;
