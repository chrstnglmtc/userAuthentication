// SendCode.jsx

import React, { useState } from 'react';
import VerificationForm from './VerificationForm';
import SendCodeForm from './SendCodeForm';
import { Link } from 'react-router-dom';
import '../Auth.css';

function SendCode() {
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleVerificationSuccess = () => {
    setVerificationSuccess(true);
  };
  const handleVerificationForm = (email) => {
    // Implement any logic you need with the email
    console.log('Email received in SendCode:', email);
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
      {/* ... rest of the code */}
    </div>
  );
}

export default SendCode;
