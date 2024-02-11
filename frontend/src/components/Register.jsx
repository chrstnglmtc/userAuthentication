import React from 'react';
import RegisterForm from './RegisterForm';
import { Link } from "react-router-dom";
import '../Auth.css';

function Register({ onNavigateHome }) {
  const handleRegister = () => {
    alert('Register button clicked');
    // You can add register logic here
  };

  return (
    <div>
      <div className="home-header">
        <img
           src="..\src\assets\TeamAassets\companyLogo.png"
          alt="Logo"
          className="logo"
        />
      </div>
      <div className="auth-navi">
        <div className="home-button">
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      </div>
      <div className="label-container">
        <div className="container-under">
        <div className="auth-label">
          <h1>SIGN UP</h1>
        </div>
     
      <div className="auth-content">
        <div className="auth-sign">
          <RegisterForm />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Register;
 