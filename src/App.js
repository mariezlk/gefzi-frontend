import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Layout from './Layout';
import Home from './components/Home'
import PersoenlicheDaten from './components/PersoenlicheDaten';
import Gruppenkalender from './components/Gruppenkalender';
import Hilfe from './components/Hilfe';
import { Flex } from '@mantine/core';


function App() {

  const location = useLocation();
  const hideLocation = location.pathname == "/login";
  const [user, setUser] = useState({});

  return (
    <Flex>
      {!hideLocation && <Layout/>}
      <Routes>
        <Route path="/login" element={<Login user={user} setUser={setUser}/>} />
        <Route path="/" element={<Home />} />
        <Route path="/persoenlicheDaten" element={<PersoenlicheDaten user={user}/>} />
        <Route path="/gruppenkalender" element={<Gruppenkalender />} />
        <Route path="/hilfe" element={<Hilfe />} />
      </Routes>
    </Flex>
  );
}

export default App;
