import React from 'react';
import VerificationForm from './TeamA_VerificationForm'; // Correct import statement
import { Link } from 'react-router-dom';
import '../Auth.css';

function TeamA_Verification({ onVerification }) { // Corrected function name
  return (
    <div className="verification-container">
      <div className="verification-header">
        <img src="/assets/images/companyLogo.png" alt="Logo" className="verification-logo" />
      </div>
      <div className="verification-navi">
        <div className="home-button">
          <Link to="/">
            <button className="TeamA-button" >Home</button>
          </Link>
        </div>
      </div>
      <div className="content">
        <div className="verification-sign">
          <VerificationForm onVerification={onVerification} /> {/* Corrected component name */}
        </div>
      </div>
    </div>
  );
}

export default TeamA_Verification;