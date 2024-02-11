/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TeamA_ChangePasswordForm() {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        // Validate form inputs
        if (!email || !oldPassword || !newPassword || !confirmPassword) {
          setError('All fields are required.');
          return;
        }
    
        if (newPassword !== confirmPassword) {
          setError('New password and confirm password must match.');
          return;
        }
    
        // Perform form submission logic with the state values
        console.log('Form submitted:', { email, oldPassword, newPassword, confirmPassword });
    
        // Reset state and error after successful submission
        setEmail('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
      };
    
      return (
        <div className="Change-wrapper">
          <div className="Change-left">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
            </svg>
        <h4>Name</h4>
        <p>Position name</p>
          </div>
          <div className="Change-right">
            <div className="Change-info">
              <h3>Password</h3>
              <div className="Change-info_data">
                <div className="Change-data">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
        required

                  />
                </div>
                <div className="Change-data">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter Old Password"
        required

                  />
                </div>
                <div className="Change-data">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
        required

                  />
                </div>
                <div className="Change-data">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
        required

                  />
                </div>
              </div>
              <div className="Change-buttons">
                <button type="submit" className="save-button" onClick={handleFormSubmit}>
                  Save
                </button>
                <Link to="/profile">
                  <button className="cancel-button">Cancel</button>
                </Link>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </div>
      );
    }
    
    export default TeamA_ChangePasswordForm;