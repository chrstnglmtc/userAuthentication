import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotForm() {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [error, setError] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(false); // State to track button disabled status

  const navigate = useNavigate();

  const sendForgotCode = async () => {
    try {
      const response = await fetch(`http://localhost:8085/api/v1/auth/forgot-password?email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Email is registered. Please check your email.')
        setEmailSubmitted(true);
      } else {
        setError('Failed to send verification code');
        console.log('Email is invalid. Please Sign-up.')
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Error sending OTP. Please try again.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const verifyOtp = async (otp) => {
    try {
      const response = await fetch(`http://localhost:8085/api/v1/auth/verify-forgot-code?email=${email}&code=${otp}`, {
        method: 'GET',
      });
  
      if (response.ok) {
        console.log('Verification successful');
        // Store ForgotCode and ForgotEmail in local storage
        localStorage.setItem('forgotCode', otp);
        localStorage.setItem('forgotEmail', email);
        navigate('/new');
        setError('');
      } else {
        console.log('Verification not successful');
        setError('OTP Code Invalid');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="forgot-container">
      <div className="template-form-container">
        <form className="template-form" onSubmit={handleFormSubmit}>
          <Link to="/login">
            <button className="wBackbutton">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
            </button>
          </Link>
          <h2 className="title">Forgot Password</h2>
          {emailSubmitted ? (
            <>
              <p>Please enter the OTP code sent to your email.</p>
              <div className="otp-input-field">
                <i className="fas fa-key"></i>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button className="TeamA-button" onClick={() => verifyOtp(otp)}>
                Verify
              </button>
            </>
          ) : (
            <>
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
              {error && (
                <p className="error-message">{error}</p>
              )}
              </div>
              <button className="TeamA-button" onClick={sendForgotCode}>
                Continue
              </button>
            </>
          )}
        </form>
      </div>
  
      <div className="forgot left-panel">
        <div className="forgot-content"></div>
      </div>
    </div>
  );
}

export default ForgotForm;




