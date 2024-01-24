/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./TeamA_AuthContext"; // Adjust the path accordingly
import '../Auth.css';

const TeamA_Navigation = () => {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <div className="home-header">
      <div className="left-container">
        <div className="logo-container">
          <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
        </div>
        {isLoggedIn && (
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <h3>Catalog</h3>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <h3>Activities</h3>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div className="right-container">
        <Link to="/">
          <button>Home</button>
        </Link>
        {!isLoggedIn && ( // Only render the "Register" button if not logged in
          <Link to="/register">
            <button>Register</button>
          </Link>
        )}
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TeamA_Navigation;
