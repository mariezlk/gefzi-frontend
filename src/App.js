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

  const userCalendar = useMemo(() => {
    if (!user || !Array.isArray(calendar)) return null;
    return calendar.find(c => c.groupCalendarId === user.fk_groupCalendarId);
  }, [user, calendar]);

  return (
    <Flex>
      {!hideLocation && <Layout userId={user?.userId}/>}
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/:userId" element={<Home setUserIdParams={setUserIdParams}/>} />
        <Route path="/persoenlicheDaten/:userId" element={<PersoenlicheDaten setUserIdParams={setUserIdParams} user={user} calendar={userCalendar}/>} />
        <Route path="/gruppenkalender/:userId" element={<Gruppenkalender setUserIdParams={setUserIdParams}/>} />
        <Route path="/hilfe/:userId" element={<Hilfe setUserIdParams={setUserIdParams}/>} />
      </Routes>
    </Flex>
  );
}

export default App;
