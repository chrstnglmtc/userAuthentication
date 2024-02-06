import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function TeamA_ForgotForm() {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [error, setError] = useState('');


  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if the email is registered before initiating the forgot password logic
      const checkEmailResponse = await fetch(`http://localhost:8085/api/v1/auth/checkRegisteredEmail?email=${email}`, {
        method: 'GET',
      });
  
      if (checkEmailResponse.ok) {
        const isEmailRegistered = await checkEmailResponse.json();
  
        if (isEmailRegistered) {
          // Email is registered, display a message and optionally trigger further actions
          setResetStatus('Email is Registered. Please check your Email.');
          console.log('Email is Registered. Please check your Email.');
          sendOtp();
          // Automatically trigger sending OTP if email is registered
        } else {
          // Email is not registered, display a message
          setResetStatus('Email is not registered. Please sign up.');
          console.log('Email is not registered. Please sign-up.');
        }
      } else {
        // Handle other errors if needed
        setResetStatus('Error: Unable to check the email registration status.');
      }
    } catch (error) {
      console.error('Error during email check:', error);
      setResetStatus('Error during email check. Please try again.');
    }
  };
  
  const sendOtp = async () => {
    try {
      // Make API call to trigger sending OTP to email
      const response = await fetch(`http://localhost:8085/api/v1/auth/forgot-password?email=${email}`, {
        method: 'POST', // Use POST method for sending OTP
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        setVerificationStatus('Verification code sent successfully');
        setError('');
      } else {
        setVerificationStatus('');
        setError('Failed to send verification code');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  
  const verifyOtp = async () => {
    try {
        // Make API call to verify OTP for forgot password
        const response = await fetch(`http://localhost:8085/api/v1/auth/verify-forgot-password?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        });

        if (response.ok) {
            // Verification successful
            setResetStatus('Verification successful'); // Corrected function name
            console.log('Verification successful');
            navigate('/new');
            setError('');
            // Add navigation logic here or any other action upon successful verification
        } else {
            setResetStatus('');
            console.log('Verification not successful');
            setError('OTP Code Invalid');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
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
            <button className="small-button" onClick={handleFormSubmit} title="Send Email">
              Send
            </button>
          </div>

          {/* Remember Password Navigation */}
          <Link to="/login" className="remember-password-link">
            Remember Password
          </Link>

          {/* Replace the "Send to Email" button with "Verify" button */}
          
        </form>
        <button className="TeamA-button" onClick={verifyOtp}>
            Verify
          </button>
      </div>

      <div className="forgot left-panel">
        <div className="forgot-content"></div>
      </div>
    </div>
  );
}

export default TeamA_ForgotForm;
