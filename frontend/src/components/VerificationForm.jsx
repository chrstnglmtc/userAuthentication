import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function VerificationForm({ onVerificationForm }) {
  // Corrected function name
  const [verification, setVerification] = useState(''); // Corrected state variable name

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onVerificationForm(verification);
    console.log('Verification code submitted:', verification);
    // You can add further logic or redirection if needed
  };

  return (
    <div className="verification-forms-container" style={{ fontFamily: 'sans-serif' }}>
      <form className="verification-sign-in-form" onSubmit={handleFormSubmit}>
        <h1  className="verification-title">Email Verification</h1>
        <Link to="/email">
        <button className="Verification-Backbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
        </Link>
        <p>Please enter Email</p>
        <label htmlFor="verification">
       
        </label>
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
        </div>
        <input type="submit" className="verification-button" value="Send" />
      </form>

      <div className="verification-panels-container">
        <div className="verification-panel verification-left-panel">
          <div className="content">
            {/* Your content goes here */}
          </div>
          <img src="your-image.png" className="verification-image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default VerificationForm;
