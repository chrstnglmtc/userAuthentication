import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotForm({ onForgotPassword }) {
  const [email, setEmail] = useState('');

  const handleForgot = (e) => {
    e.preventDefault();
    // Call the onForgotPassword prop with the email value
    onForgotPassword(email);
    console.log('Resetting password for email:', email);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-container">
        <form className="forgot-form" onSubmit={handleForgot}>
          <h2 className="title">Forgot Password</h2>
          <p>Please enter your email address to reset your password.</p>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            {/* Use setEmail to update the email state */}
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Send to Email</button>
          <Link to="/login">
            <div className="existing-account">
              Remember your password?
            </div>
          </Link>
        </form>
      </div>

      <div className="forgot-container">
        <div className="forgot left-panel">
          <div className="forgot-content">
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotForm;