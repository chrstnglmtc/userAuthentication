import React from 'react';
import { Link } from "react-router-dom";
import '../Auth.css';
import ForgotForm from './ForgotForm';

function Forgot({ onNavigateHome, onForgotPassword }) {

  return (
    <div className="forgot-container">
      <div className="home-header">
        
        <img
          src="..\src\assets\TeamAassets\companyLogo.png" 
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="forgot-navi">
        <div className="home-button">
        <Link to="/">
          
            <button className='login-button'>Home</button>
           
          </Link>
        </div>
      </div>
      <div className="forgot-content">
        <div className="forgot-sign">
          <ForgotForm />
        </div>
      </div>
    </div>
  );
}

export default Forgot;