import React, { useState } from "react";
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
  const { isLoggedIn } = useAuth();
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  const openLoginModal = () => setLoginModalIsOpen(true);
  const closeLoginModal = () => setLoginModalIsOpen(false);

  const openRegisterModal = () => setRegisterModalIsOpen(true);
  const closeRegisterModal = () => setRegisterModalIsOpen(false);

  return (
    <div className="home-header">
      <div className="left-container">
        <div className="logo-container">
          <img
            src="/assets/images/companyLogo.png"
            alt="Logo"
            className="logo"
          />
        </div>
      </div>
      <div className="right-container">
        {!isLoggedIn && (
          <>
            <button className="TeamA-button" onClick={openRegisterModal}>
              Register
            </button>
            <CustomModal show={registerModalIsOpen} handleClose={closeRegisterModal}>
              <Register />
            </CustomModal>
          </>
        )}
        {!isLoggedIn && (
          <>
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
