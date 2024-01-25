import React from 'react';
import LoginForm from './TeamA_ForgotForm';
import { Link } from "react-router-dom";
import '../Auth.css';
function TeamA_Forgot({ onNavigateHome, onForgotPassword }) {

  return (
    <div className="forgot-container">
     <div className="auth-header">
        <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
      </div>
      <div className="forgot-navi">
        <div className="home-button">
            <Link to="/">
                <button className="TeamA-button" >Home</button>
            </Link> 
        </div>
      </div>
      <div className="forgot-content">
        <div className="forgot-sign">
            <LoginForm onForgotPassword={onForgotPassword} />
        </div>
      </div>
    </div>
  );
}

export default TeamA_Forgot;