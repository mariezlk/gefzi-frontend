import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './components/Home'
import PersoenlicheDaten from './components/PersoenlicheDaten';
import Gruppenkalender from './components/Gruppenkalender';
import Hilfe from './components/Hilfe';
import { Flex } from '@mantine/core';


function App() {
  return (
    <Flex>
      <Router>
        <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/persoenlicheDaten" element={<PersoenlicheDaten />} />
          <Route path="/gruppenkalender" element={<Gruppenkalender />} />
          <Route path="/hilfe" element={<Hilfe />} />
        </Routes>
      </Router>
    </Flex>
  );
}

export default App;
