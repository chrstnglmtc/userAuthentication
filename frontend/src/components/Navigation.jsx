/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path accordingly
import '../Auth.css';
/**
 * Navigation component.
 */
const Navigation = () => {
  // Use the useAuth hook to get isLoggedIn and handleLogout functions
  const { isLoggedIn, handleLogout } = useAuth();

  return (
     // Navigation container
    <nav className="my-navigation">
      <img src="/assets/images/companyLogo.png" alt="Logo" />
       {/* Menu items */}
      <ul className="menu hide">
          {/* Home link */}
        <li>
          <a href="/dashboard">Home</a>
        </li>
          {/* About us link */}
        <li>
          <a href="/about">About us</a>
        </li>
        {/* External link to the company's website */}
        <li>
          <a href="https://www.tsukiden.com.ph">Contact us</a>
        </li>
      </ul>
       {/* Testing section */}
      <div className="testing">
        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
        // If user is logged in
          <>
             {/* Link to the user's profile */}
          <Link to="/profile">
            <button id="profile">Profile</button>
          </Link>
             {/* Logout button */}
          <button id="logout" onClick={handleLogout}>Logout</button>
        </>
        ) : (
      // If user is not logged in
          <>
              {/* Link to the registration page */}
            <Link to="/register">
              <button id="register">Register</button>
            </Link>
                 {/* Link to the login page */}
            <Link to="/login">
              <button id="login">Log In</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
