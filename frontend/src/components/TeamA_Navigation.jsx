import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./TeamA_AuthContext";
import '../Auth.css';

const TeamA_Navigation = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const verificationStatus = true;

  return (
    <div className="home-header">
      <div className="left-container">
        <div className="logo-container">
          <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
        </div>
        {isLoggedIn}
      </div>
      <div className="right-container">
        <Link to="/dashboard">
          <button className="TeamA-button">Home</button>
        </Link>
        <Link to="/about">
          <button className="TeamA-button">About</button>
        </Link>
        <Link to="/profile">
          <button className="TeamA-button">Profile</button>
        </Link>
        {!isLoggedIn && (
          <Link to="/register">
            <button className="TeamA-button">Register</button>
          </Link>
        )}
        {isLoggedIn ? (
          <button className="TeamA-button" onClick={() => setShowModal(true)}>Logout</button>
        ) : (
          <Link to="/login">
            <button className="TeamA-button">Login</button>
          </Link>
        )}
      </div>
      
      {verificationStatus && showModal && (
        <>
          <div className="ln-modal-overlay"></div>
          <div className="ln-modal-sql modal fade show" id="modalSql" tabIndex="-1" aria-labelledby="modalSql" aria-hidden="true" style={{ display: 'block' }}>
            <div className="ln-modal-dialog">
              <div className="ln-modal-content" style={{ backgroundColor: "#D9FFCF", zIndex: 1051 }}>
                <div className="ln-modal-header">
                  <h5 className="ln-modal-title1" id="modalSql">
                    Log-out
                  </h5>
                </div>
                <div className="ln-modal-body">
                  <p>Are you sure you want to log-out?</p>
                </div>
                <div className="ln-modal-footer">
                    <button
                      type="button"
                      className="ln-yes-btn"
                      style={{
                        backgroundColor: "#0e3b03",
                        color: "#ffffff",
                        borderRadius: "20px",
                        fontSize: "15px",
                        position: "center",
                      }}
                      
                      onClick={() => {
                        console.log('Yes button clicked');
                        handleLogout();
                      }}
                    >
                      Yes
                    </button>
      
                  <button
                    type="button"
                    className="ln-cancel-btn"
                    style={{
                      backgroundColor: "#0e3b03",
                      color: "#ffffff",
                      borderRadius: "20px",
                      fontSize: "15px",
                      position: "center",
                    }}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamA_Navigation;
