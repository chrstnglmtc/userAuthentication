// SendCode.jsx

import React, { useState } from 'react';
import SendCodeForm from './SendCodeForm';
import { Link } from 'react-router-dom';
import '../Auth.css';

function SendCode() {
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleVerificationSuccess = () => {
    setVerificationSuccess(true);
  };

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
          <h1>Verification Code</h1>
        </div>
      </div>
      <div className="auth-content">
        <div className="auth-sign">
          {verificationSuccess ? (
            <VerificationSuccessPopup />
          ) : (
            <SendCodeForm onVerifySuccess={handleVerificationSuccess} />
          )}
        </div>
      </div>
    </div>
  );
}

function VerificationSuccessPopup() {
  return (
    <div className="verification-success-popup">
      <img src="/assets/images/Check.png" alt="Logo" className="logo with-margin" />
      <h2>Email Verified Successfully</h2>
      <div className="popup-buttons">
        <Link to="/profile">
          <button>Create Profile</button>
        </Link>
        <Link to="/">
          <button>Return Home</button>
        </Link>
      </div>
    </div>
  );
}

export default SendCode;
