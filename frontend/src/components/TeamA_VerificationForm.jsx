/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Auth.css'; // Import a CSS file for styling

function TeamA_VerificationForm() {
  const [verification, setVerification] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailFromRegistration = queryParams.get('email'); 
  
  useEffect(() => {
    console.log('Component re-rendered. Current verificationStatus:', verificationStatus);
  }, [verificationStatus]);

  useEffect(() => {
    if (emailFromRegistration) {
      // Do something with the email if needed
    }
  }, [emailFromRegistration]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // TODO: Perform API call or verification logic
    try {
      console.log('Submitting:', { verificationCode: verification, userEmail: emailFromRegistration });

      // Example: Verify the code using an API endpoint
      const response = await fetch('http://localhost:8085/api/v1/auth/verifyCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode: verification, recipient: emailFromRegistration }),
      });

      console.log('Response:', response);

      if (response.ok) {
        // Verification successful
        setVerificationStatus('Verification successful');
      } else {
        // Verification failed
        setVerificationStatus('Verification failed');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      // Handle error
    }
  };
  

  return (
    <div className="verification-forms-container">
      <form className="template-form" onSubmit={handleFormSubmit}>
        <Link to="/forgot" className="wBackbutton">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
        </Link>
        <h1 className="verification-title">Email Verification</h1>
        <p className="center-text">Please enter the verification code sent to {emailFromRegistration}</p>
        <div className="verification-input-field">
          <input
            type="text"
            placeholder="Verification Code"
            id="verification"
            name="verification"
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
            required
          />
          <button type="submit" className="TeamA-button">Send</button>
        </div>
      </form>

      <div className="verification-panels-container">
        {/* Display verification status */}
        {verificationStatus && <p>{verificationStatus}</p>}
      </div>
    </div>
  );
}

export default TeamA_VerificationForm;