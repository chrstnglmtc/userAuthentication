import React from 'react';
import { Link } from "react-router-dom";
import '../Auth.css';
import ForgotForm from './ForgotForm';

function Forgot({ onNavigateHome, onForgotPassword }) {
  // Function implementation goes here

  return (
    <div className="forgot-container">
        {/* Home page header containing the company logo */}
      <div className="home-header">
      
          {/* Company logo displayed with an image element */}
        <img
          src="..\src\assets\TeamAassets\companyLogo.png" 
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="forgot-navi">
        <div className="home-button">
        <Link to="/">
          {/* Button triggering navigation to the home page */}
            <button className='login-button'>Home</button>
           
          </Link>
        </div>
      </div>
        {/* Main content section with the 'Forgot Password' form */}
      <div className="forgot-content">
        <div className="forgot-sign">
          <ForgotForm />
        </div>
      </div>
    </div>
  );
}

export default Forgot;
