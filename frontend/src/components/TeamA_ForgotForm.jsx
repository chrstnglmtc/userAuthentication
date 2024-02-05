import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.css';

function TeamA_ForgotForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [isSendButtonDisabled, setSendButtonDisabled] = useState(false);
  const [isVerifyButtonDisabled, setVerifyButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSendToEmailClick = async () => {
    e.preventDefault();

    try {
      // Check if the email is registered before initiating the forgot password logic
      console.log('Before fetch');
      const checkEmailResponse = await fetch(`http://localhost:8085/api/v1/auth/checkRegisteredEmail?email=${email}`, {
        method: 'GET',
      });
  
      if (checkEmailResponse.ok) {
        const isEmailRegistered = await checkEmailResponse.json();
  
        // Set state indicating that the verification was attempted
        setVerificationAttempted(true);
  
        if (isEmailRegistered) {
          // Show success message or handle accordingly
          setResetStatus('Email is registered. Please check your email.');
  
          // Your existing logic for initiating the forgot password process
          const forgotPasswordResponse = await fetch(`http://localhost:8085/api/v1/auth/forgot-password?email=${email}`, {
            method: 'POST',
          });
  
          if (forgotPasswordResponse.ok) {
            console.log('Email Sent Successfully');
            navigate(`/email?email=${email}`);
            // Handle successful response from the forgot password endpoint if needed
          } else {
            // Handle error response from the forgot password endpoint if needed
          }
        } else {
          // Show error message to the user that the entered email is not registered
          setResetStatus('Email Not Registered');
        }
      } else {
        // Handle other errors if needed
        setVerificationAttempted(true);
        setResetStatus('Error: Unable to check the email registration status. Please try again.');
      }
    } catch (error) {
      console.error('Error during email check:', error);
      setVerificationAttempted(true);
      setResetStatus('Error during email check. Please try again.');
    }
  };

  const handleVerifyClick = async () => {
    // Your existing logic for OTP verification
    // ...
  };

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
          </div>
          
          {/* Remember Password Navigation */}
          <Link to="/login" className="remember-password-link">
            Remember Passworda
          </Link>

          {verificationAttempted && <p className="verification-status">{resetStatus}</p>}
          {error && <p className="error-message">{error}</p>}
          
          {/* Replace the "Send to Email" button with "Verify" button */}
          <button className="TeamA-button" onClick={handleVerifyClick} disabled={isVerifyButtonDisabled}>
            Verify
          </button>
        </form>
      </div>

      <div className="forgot left-panel">
        <div className="forgot-content"></div>
      </div>
    </div>
  );
}

export default TeamA_ForgotForm;
