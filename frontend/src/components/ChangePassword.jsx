import React from 'react';
import ChangePasswordForm from './ChangePasswordForm'; // Correct import statement
import { Link } from 'react-router-dom';
import '../Auth.css';

function ChangePassword({ onChangeForm }) { // Corrected function name
  return (
    <div>
      
      <nav className="Change-navbar">
        <div className="Change-nav-logo">
          <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
        </div>
        <ul className="Change-nav-list">
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
        </ul>
      </nav>
      <Link to="/profile">
        <button className="Change-Backbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
        </Link>
      <div className="Change-content">
        <div className="Change-sign">
          
          <ChangePasswordForm onChangeForm={onChangeForm} />
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;