import React from 'react';
import './index.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Verify from './components/Verification';
import Dashboard from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Email from './components/Email';
import Prof1 from './components/Prof1';
import Prof2 from './components/Prof2';
import Person from './components/PersonForm';
import Change from './components/Change';
import LandingPage from './components/LandingPage';
import About from './components/About';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/email" element={<Email/>}/>
        <Route path="/profile" element={<Prof1/>}/>
        <Route path="/info" element={<Prof2/>}/>
        <Route path="/Person" element={<Person/>}/>
        <Route path="/change" element={<Change/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </>
  )
}

export default App; 