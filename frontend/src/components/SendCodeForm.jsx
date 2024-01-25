import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SendCodeForm({ onVerifySuccess, email, otpCode }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();

    console.log('Entered Verification Code:', verificationCode);

    // Use the entered verification code
    const verificationData = {
      verificationCode: verificationCode,
    };

    try {
      // Make the verification request using the entered verification code
      const response = await fetch('http://localhost:8085/verifyCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      });

      // Check if the response is okay
      if (response.ok) {
        // You can handle successful verification here
        console.log('Verification successful');
        onVerifySuccess();
      } else {
        // Handle the case where verification fails
        console.error('Verification failed');
        setErrorMessage('Verification failed');
      }
    } catch (error) {
      // Handle errors during the verification process
      console.error('Error verifying code:', error);
      setErrorMessage('Error verifying code');
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
              placeholder="Enter Verification Code"
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
