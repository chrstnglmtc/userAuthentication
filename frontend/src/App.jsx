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
import ProfileEdit from './components/ProfileEdit';
import SendCode from './components/SendCode.jsx';

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
        <Route path="/update" element={<ProfileEdit />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/send" element={<SendCode />} />
      </Routes>
    </>
  )
}

export default App; 