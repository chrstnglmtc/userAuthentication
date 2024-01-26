/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import React from "react";
import '../Auth.css';
import { Link } from "react-router-dom";
import Footer from "./TeamA_Footer";

// New component for the photo section
const PhotoSection = () => {
  return (
    <div className="photo-section">
      <div className="photo-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>
        <h1>Vision</h1>
        <p>TGSI is committed to be THE PREMIER GLOBAL I.T. BUSINESS PARTNER driven by passion for innovation.</p>
      </div>
      <div className="photo-box">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
        <h1>Mission</h1>
        <p>We aim to...
provide excellent quality service to our CLIENTS,
foster professional growth and care to our EMPLOYEES &
develop innovative solutions dedicated
for the welfare of our COMMUNITY & SOCIETY.</p>
      </div>
    </div>
  );
};

const TeamA_About = () => {
  return (
    <>
      {/* Header Section */}
      <div className="home-header">
        <div className="logo-container">
        <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
        
       
        </div>
        <nav>
          <ul>
            <Link to='/dashboard'>
              <button className="TeamA-button">
              Home</button>
            </Link>
            <Link to='/'>
              <button className="TeamA-button">Logout</button>
            </Link>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>

      {/* Main Content Section */}
      <div className="home-content">
        <div className="TeamA-about-container">
          <h1>About Us</h1>
          <p>
            Tsukiden Global Solutions, Inc. YOUR RELIABLE IT PARTNER That's who WE are. For more than 30 years now, Team Tsukiden has always been the trusted reliable IT partner of its clients for various projects in Japan, Philippines, Malaysia, Hong Kong, Singapore, Taiwan, United Kingdom, and the United States of America.
          </p>
          <p>Pioneer in IT Outsourcing
Tsukiden Global Solutions Inc. is one of the pioneers in IT Outsourcing for the Japanese market here in the Philippines. Since 1989, even before the word “outsourcing” was coined, WE have been sending engineers to Japan for software development. With our years of experience and still growing, there is no other more stable company to outsource to than Tsukiden Global Solutions Inc.
</p>
<p>Tsukiden Global Solutions Inc. provide its clients the advantage of having hardworking, committed and talented manpower on demand, where and when they are needed at a cost that fits the development budget.
  
</p>
          {/* Include the PhotoSection component here */}
          <PhotoSection />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TeamA_About;