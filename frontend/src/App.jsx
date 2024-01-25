/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './index.css';
import TeamA_Landing from './components/TeamA_Landing';
import TeamA_Login from './components/TeamA_Login';
import TeamA_Register from './components/TeamA_Register';
import TeamA_Forgot from './components/TeamA_Forgot';
import TeamA_Dashboard from './components/TeamA_Dashboard';
import TeamA_Profile from './components/TeamA_Profile';
import { Route, Routes } from 'react-router-dom';
import TeamA_Navigation from './components/TeamA_Navigation';
import TeamA_ProfileEdit from './components/TeamA_ProfileEdit';
import TeamA_Verification from './components/TeamA_Verification';
import TeamA_ChangePassword from './components/TeamA_ChangePassword';
import TeamA_About from './components/TeamA_About';
import TeamA_Email from './components/TeamA_Email';
import TeamA_NewPass from './components/TeamA_NewPass';


function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<TeamA_Landing />} />
        <Route path="/login" element={<TeamA_Login />} />
        <Route path="/register" element={<TeamA_Register />} />
        <Route path="/dashboard" element={<TeamA_Dashboard />} />
        <Route path="/forgot" element={<TeamA_Forgot />} />
        <Route path="/email" element={<TeamA_Email />}/>
        <Route path="/verify" element={<TeamA_Verification />} />
        <Route path="/profile" element={<TeamA_Profile />} />
        <Route path="/update" element={<TeamA_ProfileEdit />} />
        <Route path="/navigation" element={<TeamA_Navigation />} />
        <Route path="/change" element={<TeamA_ChangePassword/>}/>
        <Route path="/about" element={<TeamA_About/>}/>
        <Route path="/new" element={<TeamA_NewPass/>}/>
      </Routes>
    </>
  )
}

export default App; 