/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path accordingly
import '../Auth.css';

const Navigation = () => {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <nav className="my-navigation">
      <img src="..\src\assets\TeamAassets\companyLogo.png" alt="Logo" />
      <ul className="menu hide">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="About">About us</a>
        </li>
        <li>
          <a href="https://www.tsukiden.com.ph">Contact us</a>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/verification">
              <button>Verification</button>
            </Link>
          ) : (
            <></>
          )}
        </li>
        <li></li>
      </ul>
      <div className="testing">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
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
