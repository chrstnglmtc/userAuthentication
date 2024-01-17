import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ChangeForm({ onChangeForm }) {
  const [verification, setVerification] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onChangeForm(verification);
    console.log('Verification code submitted:', verification);
    // You can add further logic or redirection if needed
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
              <label htmlFor="Email/Username">Email/Username</label>
              <input
                type="text"
                id="Email/Username"
                name="Email/Username"
                placeholder="Enter Email/Username"
              />
            </div>
            <div className="Change-data">
              <label htmlFor="old password">Old Password</label>
              <input
                type="text"
                id="old password"
                name="old password"
                placeholder="Enter your Old Password"
              />
            </div>
            <div className="Change-data">
              <label htmlFor="new password">New Password</label>
              <input
                type="text"
                id="New Password"
                name="New Password"
                placeholder="Enter New Password"
              />
            </div>
            <div className="Change-data">
              <label htmlFor="Confirm Password">Confirm Password</label>
              <input
                type="text"
                id="Confirm Password"
                name="Confirm Password"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="Change-buttons">
            <Link to="/">
              <button className="save-button">Save</button>
            </Link>
            <Link to="/profile">
              <button className="cancel-button">Cancel</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeForm;
