// eslint-disable-next-line no-unused-vars
import React from 'react';
import LoginForm from './LoginForm';
import { Link } from "react-router-dom";
import '../Auth.css';
/**
 * Login page component.
 */
function Login() {

  return (
    <div className="auth-container">
        {/* Header with company logo */}
      <div className="home-header">
        
        <img
          src="/assets/images/companyLogo.png" 
          alt="Logo"
          className="logo"
        />
      </div>
      
       {/* Navigation section */}
      <div className="auth-navi">
        <div className="home-button">
            {/* Link to the Home page */}
          <Link to="/">
          
            <button className='login-button'>Home</button>
           
          </Link>
        </div>
      </div>
      {/* Main content container */}
      <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "start", }}>
        
         {/* Authentication label */}
      <div>
        <div className="auth-label">
          <h1>LOG IN</h1>
        </div>
      </div>
         {/* Authentication content */}
      <div className="auth-content">
        <div className="auth-sign">
          {/* LoginForm component */}
          <LoginForm />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Login;
