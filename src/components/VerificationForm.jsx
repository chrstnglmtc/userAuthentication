import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Auth.css'; // Import a CSS file for styling

function VerificationForm({ onVerificationForm }) {
  const [verification, setVerification] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onVerificationForm(verification);
    console.log('Verification code submitted:', verification);
    // You can add further logic or redirection if needed
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
        <p className="center-text">Please enter Email</p>
        <label htmlFor="verification">Email:</label>
        <div className="verification-input-field">
          <input
            type="email"
            placeholder="Email"
            id="verification"
            name="verification"
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
            required
          />
          <button type="submit" className="verification-button">Send</button>
        </div>
      </form>

      <div className="verification-panels-container">
        {/* Add content for the verification panels if needed */}
      </div>
    </div>
  );
}

export default VerificationForm;
