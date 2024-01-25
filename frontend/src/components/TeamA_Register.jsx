import React from 'react';
import RegisterForm from './TeamA_RegisterForm';
import { Link } from "react-router-dom";
import '../Auth.css';

function TeamA_Register({ onNavigateHome }) {
  const handleRegister = () => {
    alert('Register button clicked');
    // You can add register logic here
  };

  return (
    <div>
      <div className="auth-header">
        <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
      </div>
      <div className="auth-navi">
        <div className="home-button">
          <Link to="/">
            <button className="TeamA-button" >Home</button>
          </Link> 
        </div>
      </div>
      <div className="label-container">
        <div className="auth-label">
          <h1>SIGN UP</h1>
        </div>
      </div>
      <div className="auth-content">
        <div className="auth-sign">
            <RegisterForm/>
        </div>
      </div>
    </div>
  );
}

export default TeamA_Register;
 