// VerificationForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function VerificationForm() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(email)) {
      setErrorMessage('Email should include @');
      return;
    }

    // Generate a random 6-digit code
    const verificationCode = generateRandomCode();

    try {
      // Send the verification code to the provided email using nodemailer
      await sendVerificationCode(email, verificationCode);

      // Additional logging to check if navigate is working
      console.log('Verification code sent successfully');
      
      // Navigate to the SentCode page
      navigate('/send');
    } catch (error) {
      console.error('Error sending verification code:', error);
      setErrorMessage('Failed to send verification code. Please try again.');
    }
  };

  // Helper function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  // Helper function to generate a random 6-digit code
  const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Helper function to send verification code via nodemailer
  const sendVerificationCode = async (email, code) => {
    try {
      const response = await fetch('http://localhost:3001/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        throw new Error('Failed to send verification code');
      }
    } catch (error) {
      throw new Error('Failed to send verification code');
    }
  };

  return (
    <div className="container">
      <div className="forms-container">
        <form action="index.html" className="sign-in-form">
          <h2 className="title">Email Verification</h2>
          <p>Please enter your registered email address to receive the verification code.</p>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Registered Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="btn" onClick={handleSendCode}>
            Send Code
          </button>
        </form>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3 className="center-text">Remember your password?</h3>
            <p className="center-text">
              <Link to="/login" className="back-to-login-link">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationForm;
