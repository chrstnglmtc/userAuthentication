/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "../Auth.css";
import Footer from "./TeamA_Footer";

const TeamA_Landing = () => {
  return (
    <div>
      <nav>
        <img src="/assets/images/companyLogo.png" alt="Logo" />
        <ul className="menu hide">
          <li>
            <a href="About">About</a>
          </li>
          <li>
            <a href="profile">Profile</a>
          </li>
        </ul>
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
          <div className="card-container">
            <div className="card">
              <div className="card-title">
                <h3>SQL QUERY</h3>
              </div>

              <div className="card-body">
                <Link to='/'>
                  <button>View </button>
                </Link>
              </div>

              <div className="card-button">
                <button>Enroll </button>
              </div>
            </div>
            <div className="card">
              <div className="card-title">
                <h3>Version Control: SVN</h3>
              </div>

              <div className="card-body">
              <Link to='/'>
                  <button>View </button>
                </Link>
              </div>

              <div className="card-button">
                <button>Enroll </button>
              </div>
            </div>
            <div className="card">
              <div className="card-title">
                <h3>HTML Programming</h3>
              </div>

              <div className="card-body">
              <Link to='/'>
                  <button>View </button>
                </Link>
              </div>

              <div className="card-button">
                <button>Enroll</button>
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

export default TeamA_Landing;