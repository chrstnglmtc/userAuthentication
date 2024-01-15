import React, { useState } from 'react';
import './index.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Verify from './components/Verification';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/navigation" element={<Navigation />} />
      </Routes>
    </>
  )
}

export default App; 