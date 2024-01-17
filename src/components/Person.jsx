import React, { useState } from 'react';

function PersonForm({ onPersonform }) {
  const [verification, setVerification] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onPersonform(verification);
    console.log('Verification code submitted:', verification);
    // You can add further logic or redirection if needed
  };

  return (
    <div className="Person-container">
    <div className="Person-header">
      <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
    </div>
    <div className="Person-navi">
      <div className="home-button">
          <Link to="/">
              <button>Home</button>
          </Link> 
      </div>
    </div>

    <div className="Person-content">
      <div className="Person-sign">
          <PersonForm/>
      </div>
    </div>
  </div>
  );
}

export default PersonForm;
