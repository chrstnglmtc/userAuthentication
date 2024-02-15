/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path accordingly
import '../Auth.css';

/**
 * Navigation component.
 */
import Login from "./Login";
import Register from "./Register";

const CustomModal = ({ show, handleClose, children }) => {
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: show ? 'blur(5px)' : 'none', 
    },
    modalContent: {
      position: 'relative',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      background: 'none',  // Set the background to none or transparent
    },
    innerContent: {
      background: 'none',
      padding: '20px',
      borderRadius: '8px',
    },
  };

  return (
    <>
      {show && (
        <div style={modalStyles.overlay} onClick={handleClose}>
          <div style={modalStyles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.innerContent}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Navigation = () => {
  // Use the useAuth hook to get isLoggedIn and handleLogout functions
  const { isLoggedIn, handleLogout } = useAuth();
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  const openLoginModal = () => setLoginModalIsOpen(true);
  const closeLoginModal = () => setLoginModalIsOpen(false);

  const openRegisterModal = () => setRegisterModalIsOpen(true);
  const closeRegisterModal = () => setRegisterModalIsOpen(false);

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
            <button id="logout" onClick={handleLogout}>
              Logout
            </button>
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
            <button className="TeamA-button" onClick={openLoginModal}>
              Login
            </button>
            <CustomModal show={loginModalIsOpen} handleClose={closeLoginModal}>
              <Login />
            </CustomModal>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
