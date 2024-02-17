import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NewPassForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmedPassword = e.target.value.trim();
    setConfirmPassword(confirmedPassword);

    if (newPassword !== confirmedPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve email and verification code from local storage
    const resetEmail = localStorage.getItem('resetEmail');
    const verificationCode = localStorage.getItem('verificationCode');
  
    // Perform your form submission here
    if (newPassword === confirmPassword && newPassword.trim() !== '' && resetEmail && verificationCode) {
      console.log('Password match! Submitting...');
  
      try {
        const response = await fetch('http://localhost:8085/api/v1/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: resetEmail,
            code: verificationCode,
            newPassword,
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log(result);  // Log the result from the server
  
          // Clear the items from local storage after successful reset
          localStorage.removeItem('resetEmail');
          localStorage.removeItem('verificationCode');
  
          // Add logic for handling successful password reset if needed
        } else {
          console.error('Failed to reset password');
          // Add logic for handling failed password reset if needed
        }
      } catch (error) {
        console.error('Error during password reset:', error);
        // Add logic for handling error during password reset if needed
      }
    } else {
      console.error('Passwords do not match or are empty, or resetEmail/verificationCode is missing. Please check.');
    }
  };
  

  return (
    <div className="email-forms-container" style={{ fontFamily: 'sans-serif' }}>
      <form className="template-form" onSubmit={handleSubmit}>
        <Link to="/forgot">
          <button className="wBackbutton">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
        </Link>
        <h2 className="email-title">Change Password</h2>
        <p>Please Change Your Password Here.</p>
        <label htmlFor="newPassword">
          <i className="fas fa-envelope"></i>
        </label>
        <div className="pw-input-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter New Password here*"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => setNewPasswordError('')}
            required
          />
          <button type="button" className="toggle-button" onClick={handleTogglePassword}>
            <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
          </button>
        </div>
        <div className="pw-input-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm New Password*"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onFocus={() => setConfirmPasswordError('')}
            required
          />
        </div>

        {newPassword === confirmPassword && newPassword.trim() !== '' && (
          <span style={{ color: 'green', fontSize: '14px', marginTop: '15px', display: 'block' }}>Passwords match</span>
        )}

        {newPassword !== confirmPassword && newPassword.trim() !== '' && (
          <span style={{ color: 'red', fontSize: '14px', marginTop: '15px', display: 'block' }}>{confirmPasswordError || 'Passwords do not match'}</span>
        )}

        {newPassword.trim() === '' && confirmPassword.trim() === '' && (
          <span style={{ color: 'red', fontSize: '14px', marginTop: '15px', display: 'block' }}>{newPasswordError}</span>
        )}

        <button type="submit" className="TeamA-button" style={{ marginTop: '10px' }}>Confirm</button>
      </form>

      <div className="email-panels-container">
        <div className="email-panel email-left-panel">
          <div className="content">
            {/* Add content for the left panel */}
          </div>
          <img src="your-image.png" className="email-image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default NewPassForm;