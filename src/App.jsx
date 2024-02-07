import React from 'react';
import './index.css';
import TeamA_Home from './components/Home';
import TeamA_Login from './components/Login';
import TeamA_Register from './components/Register';
import TeamA_Forgot from './components/Forgot';
import TeamA_Verify from './components/Verification';
import TeamA_Dashboard from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import TeamA_Email from './components/Email';
import TeamA_Prof1 from './components/Prof1';
import TeamA_Prof2 from './components/Prof2';
import TeamA_Person from './components/PersonForm';
import TeamA_Change from './components/Change';
import TeamA_LandingPage from './components/LandingPage';
import TeamA_About from './components/About';
import TeamA_NewPass from './components/NewPass';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TeamA_LandingPage />} />
      <Route path="/login" element={<TeamA_Login />} />
      <Route path="/register" element={<TeamA_Register />} />
      <Route path="/dashboard" element={<TeamA_Dashboard />} />
      <Route path="/forgot" element={<TeamA_Forgot />} />
      <Route path="/verify" element={<TeamA_Verify />} />
      <Route path="/email" element={<TeamA_Email />} />
      <Route path="/profile" element={<TeamA_Prof1 />} />
      <Route path="/info" element={<TeamA_Prof2 />} />
      <Route path="/Person" element={<TeamA_Person />} />
      <Route path="/change" element={<TeamA_Change />} />
      <Route path="/about" element={<TeamA_About />} />
      <Route path="/home" element={<TeamA_Home />} />
      <Route path="/new" element={<TeamA_NewPass />} /> 
      <Route path='/admin' element={<AdminPage/>}/>
    </Routes>
  );
}

export default App;
