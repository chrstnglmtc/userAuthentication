import React from 'react';
import ForgotForm from './ForgotForm';
import { Link } from 'react-router-dom';
import '../Auth.css'; // Assuming you want to include Auth.css

function Forgot() {
  return (
    <div className="email-container">
      <div className="email-header">
        <img src="/assets/images/companyLogo.png" alt="Logo" className="email-logo" />
      </div>
      <div className="email-navi">
        <div className="home-button">
          <Link to="/verify">
            <button>Home</button>
          </Link>
        </div>
      </div>
      <Link to="/">
        <button className="Email-Backbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
        </Link>
      <div className="content">
        <div className="email-sign">
          <ForgotForm/>
        </div>
      </div>
    </div>
  );
}

export default Forgot;