/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "../Auth.css";
import Footer from "./Footer";

const Landing = () => {
  return (
    <div>
      <nav className="my-navigation">
        <img src="/assets/images/companyLogo.png" alt="Logo" />
        {/* <ul className="menu hide">
          <li>
            <a href="About">About</a>
          </li>
        </ul> */}
        <div>
          <Link to="/register">
            <button id="register">Register</button>
          </Link>
          <Link to="/login">
            <button id="login">Log In</button>
          </Link>
        </div>
      </nav>

      <div className="content-container">
        <div className="text-container">
          <h1 style={{ fontFamily: "Inter, sans-serif" }}>ONLINE LEARNING</h1>
          <h2>Gain knowledge. Learn your way. Be the best</h2>
          <div className="TeamA-card-container">
            <div className="TeamA-card">
              <div className="TeamA-card-title">
                <h3>SQL QUERY</h3>
              </div>

              <div className="TeamA-card-body">
                <Link to='/'>
                  <button className="TeamA-button">View </button>
                </Link>
              </div>

              <div className="TeamA-card-button">
                <button className="TeamA-button">Enroll </button>
              </div>
            </div>
            <div className="TeamA-card">
              <div className="TeamA-card-title">
                <h3>Version Control: SVN</h3>
              </div>

              <div className="TeamA-card-body">
              <Link to='/'>
                  <button className="TeamA-button">View </button>
                </Link>
              </div>

              <div className="TeamA-card-button">
                <button className="TeamA-button">Enroll </button>
              </div>
            </div>
            <div className="TeamA-card">
              <div className="TeamA-card-title">
                <h3>HTML Programming</h3>
              </div>

              <div className="TeamA-card-body">
              <Link to='/'>
                  <button className="TeamA-button">View </button>
                </Link>
              </div>

              <div className="TeamA-card-button">
                <button className="TeamA-button">Enroll</button>
              </div>
            </div>
          </div>
        </div>

        <div className="image-container">
          <img src="/assets/images/logo.png" alt="Description of the photo" />
        </div>
      </div>

      <Footer/>
    </div>
  
  );
};

export default Landing;