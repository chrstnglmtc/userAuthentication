import React from 'react';
import LoginForm from './TeamA_LoginForm';
import { Link } from "react-router-dom";
import '../Auth.css';

function TeamA_Login({ onNavigateHome, onForgotPassword }) {

  return (
    <div className="auth-container">
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
          <h1>SIGN IN</h1>
        </div>
      </div>
      <div className="auth-content">
        <div className="auth-sign">
            <LoginForm/>
        </div>
      </div>
    </div>
  );
}

export default TeamA_Login;
