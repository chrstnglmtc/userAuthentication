import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TeamA_EmailForm({ onEmailForm, onResendCode }) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [resending, setResending] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onEmailForm(email, verificationCode);
    console.log('Email submitted:', email, 'Verification Code:', verificationCode);
    // You can add further logic or redirection if needed
  };

  const handleResendCodeClick = async () => {
    try {
      setResending(true);

      // Assume onResendCode function returns the new verification code
      const newVerificationCode = await onResendCode(email);

      // Set the new verification code in the state
      setVerificationCode(newVerificationCode);

      // You can also show a message or handle UI updates as needed
      console.log('Verification code resent successfully:', newVerificationCode);
    } catch (error) {
      console.error('Error during code resend:', error);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="email-forms-container" style={{ fontFamily: 'sans-serif' }}>
      <form className="template-form" onSubmit={handleFormSubmit}>
        <Link to="/forgot">
          <button className="wBackbutton">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
        </Link>
        <h2 className="email-title">Code Verification</h2>
        <p>Please enter Code</p>
        <label htmlFor="email">
          <i className="fas fa-envelope"></i>
        </label>
        <div className="email-input-field">
          <input
            type="text" // Assuming the verification code is numeric
            placeholder="Enter Code here"
            id="verificationCode"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <p>
          <Link to="#" onClick={handleResendCodeClick}>
            <div className='resend'>
              {resending ? 'Resending verification code...' : 'Resend Code'}
            </div>
          </Link>
        </p>
        <Link to="/new">
          <button className="TeamA-button" >Verify</button>
        </Link>
      </form>

      <div className="email-panels-container">
        <div className="email-panel email-left-panel">
          <div className="content"></div>
          <img src="your-image.png" className="email-image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default TeamA_EmailForm;
