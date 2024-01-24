import React, { useState } from 'react';
import './index.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProfileEdit from './components/ProfileEdit';
import Verification from './components/Verification';
import ChangePassword from './components/ChangePassword';
import About from './components/About';


function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update" element={<ProfileEdit />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/change" element={<ChangePassword/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </>
  )
}

export default App; 