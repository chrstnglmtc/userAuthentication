import React from 'react';
import VerificationForm from './VerificationForm';
import { Link } from 'react-router-dom';
import '../Auth.css';

function Verification() {
  return (
    <div className="auth-container">
      <div className="auth-header">
        <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
      </div>
      <div className="auth-navi">
        <div className="home-button">
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      </div>
      <div className="label-container">
        <div className="auth-label">
          <h1>Email Verification</h1>
        </div>
      </div>
      <div className="auth-content">
        <div className="auth-sign">
          <VerificationForm />
        </div>
      </div>
    </div>
  );
}

export default Verification;