import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TeamA_ForgotForm({ onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Continue with the password reset process since the email is registered
      // Add your existing password reset logic here
      onForgotPassword(email);
      console.log('Resetting password for email:', email);

      // Redirect to EmailVerification page after handling the forgot password logic
      navigate('/EmailForm');
    } catch (error) {
      console.error('Error during email check:', error);
      setResetStatus('Error during email check. Please try again.');
    }
  };

  const handleSendToEmailClick = async () => {
    try {
      // Check if the email is registered before initiating the forgot password logic
      const checkEmailResponse = await fetch(`http://localhost:8085/api/v1/auth/checkRegisteredEmail?email=${email}`, {
        method: 'GET',
      });

      if (checkEmailResponse.ok) {
        const isEmailRegistered = await checkEmailResponse.json();

        if (isEmailRegistered) {
          // Set state indicating that the verification was attempted
          setVerificationAttempted(true);
          // Show success message or handle accordingly
          setResetStatus('Email is registered. Please check your email.');
          navigate('/email');
        } else {
          // Set state indicating that the verification was attempted
          setVerificationAttempted(true);
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
            {/* Use setEmail to update the email state */}
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {verificationAttempted && <p className="verification-status">{resetStatus}</p>}
          <Link to="/login">
            <div className="existing-account">
              Remember your password?
            </div>
          </Link>
          <button className="TeamA-button" onClick={handleSendToEmailClick}>Send to Email</button>
        </form>
      </div>

      <div className="forgot left-panel">
        <div className="forgot-content"></div>
      </div>
    </div>
  );
}

export default TeamA_ForgotForm;
