// SendCodeForm.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SendCodeForm({ onVerifySuccess }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();

    // Placeholder logic for verification (replace with actual verification logic)
    const systemGeneratedCode = '123456'; // Replace with the actual system-generated code
    if (verificationCode === systemGeneratedCode) {
      console.log('Verification successful');
      onVerifySuccess(); // Notify the parent component of the successful verification
    } else {
      console.log('Verification failed');
      setErrorMessage('Wrong OTP');
    }
  };

  const handleRetry = () => {
    // Clear the error message and reset the verification code
    setErrorMessage('');
    setVerificationCode('');
  };

  return (
    <div className="container">
      <div className="forms-container">
        <form action="index.html" className="sign-in-form">
          <h2 className="title">Verification Code</h2>
          <p>Please enter the verification code sent to your email address.</p>
          <div className="input-field">
            <i className="fas fa-key"></i>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
              <div className="popup-buttons">
                <button onClick={handleRetry}>Retry</button>
                <Link to="/">
                  <button>Cancel</button>
                </Link>
              </div>
            </div>
          )}
          {!errorMessage && (
            <button className="btn" onClick={handleVerify}>
              Verify
            </button>
          )}
        </form>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            {/* You can add any content or links here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendCodeForm;
