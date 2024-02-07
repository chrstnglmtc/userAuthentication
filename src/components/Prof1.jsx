import React from 'react';
import Prof1Form from './Prof1Form'; // Correct import statement
import { Link } from 'react-router-dom';
import '../Auth.css';

function TeamA_Prof1({ onProf1 }) {
  return (
    <>
      <nav className="Prof1-navbar">
        <div className="Prof1-nav-logo">
          <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
        </div>
        <ul className="Prof1-nav-list">
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="Prof1-wrapper">
        <Link to="/">
        <button class="Backbutton">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
  </svg>
</button>
        </Link>
        <div className="Prof1-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
          </svg>
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
            <div className="Pro1-data">
              {/* Add content for earned badges */}
            </div>
          </div>
          <div className="Prof1-buttons">
            <Link to="/info">
              <button className="Prof1-Editbuttons">Edit</button>
            </Link>
            <Link to="/change">
              <button className="Prof1-ChangeButton">Password</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamA_Prof1;
