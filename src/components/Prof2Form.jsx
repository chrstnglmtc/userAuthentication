import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TeamA_Prof2Form({ onProf2Form }) {
  const [verification, setVerification] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onProf2Form(verification);
    console.log('Verification code submitted:', verification);
    // You can add further logic or redirection if needed
  };

  return (
    <div className="Prof2-wrapper">
      <div className="Prof2-left">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
      </svg>
        <h4>Name</h4>
        <p>Position name</p>
      </div>
      <div className="Prof2-right">
        <div className="Prof2-info">
          <h3>Profile Information</h3>
          <div className="Prof2-info_data">
            <div className="Prof2-data">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="Prof2-data">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
              />
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
              />
              
            
            </div>
          </div>
        </div>
        {/* Update and Cancel buttons */}
        <div className="Prof2-buttons">
        <button className="submit-button" onClick={handleFormSubmit}>
            Update
          </button>
          <Link to="/profile">
          <button className="cancel-button">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeamA_Prof2Form;
