/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path accordingly
import '../Auth.css';

const Navigation = () => {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <nav className="my-navigation">
      <img src="/assets/images/companyLogo.png" alt="Logo" />
      <ul className="menu hide">
        <li>
          <a href="/dashboard">Home</a>
        </li>
        <li>
          <a href="/about">About us</a>
        </li>
        <li>
          <a href="https://www.tsukiden.com.ph">Contact us</a>
        </li>
      </ul>
      <div className="testing">
        {isLoggedIn ? (
          <>
          <Link to="/profile">
            <button id="profile">Profile</button>
          </Link>
          <button id="logout" onClick={handleLogout}>Logout</button>
        </>
        ) : (
          <>
            <Link to="/register">
              <button id="register">Register</button>
            </Link>
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
