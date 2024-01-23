import React from 'react';
import LoginForm from './ForgotForm';
import { Link } from "react-router-dom";
import '../Auth.css';
function New({ onNavigateHome, onNew }) {

  return (
    <div className="forgot-container">
     <div className="auth-header">
        <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
      </div>
      <div className="forgot-navi">
        <div className="home-button">
            <Link to="/">
                <button>Home</button>
            </Link> 
        </div>
      </div>
      <div className="forgot-content">
        <div className="forgot-sign">
            <LoginForm onNew={onNew} />
        </div>
      </div>
    </div>
  );
}

export default New;