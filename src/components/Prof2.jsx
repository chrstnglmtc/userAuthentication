import React from 'react';
import Prof2Form from './Prof2Form'; // Correct import statement
import { Link } from 'react-router-dom';
import '../Auth.css';

function TeamA_Prof2({ onProf1 }) {
  return (
    <div>
      <nav className="Prof2-navbar">
        <div className="Prof2-nav-logo">
          <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
        </div>
        <ul className="Prof2-nav-list">
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
        </ul>
      </nav>
      <Link to="/profile">
        <button className="Prof2-Backbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
      </Link>
      <div className="Prof2-content">
        <div className="Prof2-sign">
          <Prof2Form onProf2Form={onProf1} />
        </div>
      </div>
    </div>
  );
}

export default TeamA_Prof2;
