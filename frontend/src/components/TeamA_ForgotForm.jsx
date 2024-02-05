import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Auth.css';

function TeamA_ForgotForm() {
function TeamA_ForgotForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [resetStatus, setResetStatus] = useState('');
  const [error, setError] = useState('');

  const handleSendToEmailClick = () => {
    fetch(`/checkRegisteredEmail?email=${email}`)
      .then(response => response.json())
      .then(data => {
        const isEmailRegistered = data;

        if (isEmailRegistered) {
          console.log('Email is registered.');
          // Implement the logic to send an email with an OTP
          // You can use a service or API call for this purpose
          console.log('Sending email...');
        } else {
          setError('Email not registered. Please enter a registered email.');
        }
      })
      .catch(error => {
        console.error('Error checking registered email:', error);
        setError('An error occurred while checking the registered email.');
      });
  };

  const handleVerifyClick = () => {
    // Implement the logic to verify the OTP
    // You can use a service or API call for this purpose
    console.log('Verifying...');
    setVerificationAttempted(true); // Update state to indicate verification attempt
    // Set the appropriate reset status or error message based on verification result
    // setResetStatus('Verification successful!');
    // setError('Verification failed. Please try again.');
  };


  // Rest of the code...

  return (
    <div className="forgot-container">
      <div className="template-form-container">
        <form className="template-form">
          <Link to="/login">
            <button className="wBackbutton">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
            </button>
          </Link>
      <div className="template-form-container">
        <form className="template-form">
          <Link to="/login">
            <button className="wBackbutton">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
            </button>
          </Link>
          <h2 className="title">Forgot Password</h2>
          <p>Please enter your email address to reset your password.</p>
          <div className="email-input-field">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="otp-input-field">
            <i className="fas fa-key"></i>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="small-button" onClick={handleSendToEmailClick} title="Send Email">
              Send
            </button>
          <div className="otp-input-field">
            <i className="fas fa-key"></i>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="small-button" onClick={handleSendToEmailClick} title="Send Email">
              Send
            </button>
          </div>
          
          {/* Remember Password Navigation */}
          <Link to="/login" className="remember-password-link">
            Remember Password
          </Link>

          {verificationAttempted && <p className="verification-status">{resetStatus}</p>}
          {error && <p className="error-message">{error}</p>}
          
          {/* Replace the "Send to Email" button with "Verify" button */}
          <button className="TeamA-button" onClick={handleVerifyClick}>
            Verify
          </button>
        </form>
      </div>

      <div className="forgot left-panel">
        <div className="forgot-content"></div>
      <div className="forgot left-panel">
        <div className="forgot-content"></div>
      </div>
    </div>
  );
}

export default TeamA_ForgotForm;

