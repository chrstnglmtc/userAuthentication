import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function VerifyForm({ onVerifyForm }) {
  const [email, setEmail] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onVerifyForm(email);
    console.log('Email submitted:', email);
    // You can add further logic or redirection if needed
  };

  return (
    <div className="email-forms-container" style={{ fontFamily: 'sans-serif' }}>
      <form className="email-sign-in-form" onSubmit={handleFormSubmit}>
        <h2 className="email-title">Code Verification</h2>
        <p>Please enter Code</p>
        <label htmlFor="email">
          <i className="fas fa-envelope"></i>
        </label>
        <div className="email-input-field">
          <input
            type="email"
            placeholder="Code"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <input type="submit" className="email-button" value="Send" />
        <p>Did not get the code?</p>
      </form>

      <div className="email-panels-container">
        <div className="email-panel email-left-panel">
          <div className="content">
            {/* Your content goes here */}
          </div>
          <img src="your-image.png" className="email-image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default VerifyForm;
