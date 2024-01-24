import React from 'react';
import EmailForm from './EmailForm';
import { Link } from 'react-router-dom';
import '../Auth.css'; // Assuming you want to include Auth.css

function Email({ onNavigateHome, onEmailForm }) {
  return (
    <div className="email-container">
      <div className="auth-header">
        <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
      </div>
      <div className="email-navi">
        <div className="home-button">
          <Link to="/verify">
            <button>Home</button>
          </Link>
        </div>
      </div>
      
      <div className="content">
        <div className="email-sign">
          <EmailForm onEmailForm={onEmailForm} />
        </div>
      </div>
    </div>
  );
}

export default Email;