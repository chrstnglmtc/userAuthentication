import React, { useState } from 'react';

function Prof1Form({ onProf1Form }) {
  const [verification, setVerification] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onProf1Form(verification);
    console.log('Verification code submitted:', verification);
    // You can add further logic or redirection if needed
  };

  return (
    <div className="Prof1-wrapper">
      <div className="Prof1-left">
        <img src="path_to_user_image.jpg" alt="user" width="100" />
        <h4>Name</h4>
        <p>Position name</p>
      </div>
      <div className="Prof1-right">
        <div className="Prof1-info">
          <h3>Profile Information</h3>
          <div className="Prof1-info_data">
            <div className="Prof1-data">
              <h4>Email</h4>
              <p>@tspi.com.ph</p>
            </div>
            <div className="Prof1-data">
              <h4>Phone</h4>
              <p>123456789</p>
            </div>
          </div>
        </div>
        <div className="Prof1-projects">
          <h3>Earned badges</h3>
          <div className="Prof1-projects_data">
            <div className="Prof1-data">
              {/* Add content for earned badges */}
            </div>
          </div>
        </div>
      </div>
      <button className="Prof1-editbutton" onClick={handleFormSubmit}>
        <i className="fas fa-edit"></i> Edit
      </button>
    </div>
  );
}

export default Prof1Form;
