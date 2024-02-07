import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

const TeamA_Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST', // You can adjust the method based on your server implementation
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers needed for authentication, e.g., authorization token
        },
        // You may include a body if needed, e.g., for sending additional logout information
      });
  
      if (response.ok) {
        // Logout successful, redirect to the home page
        console.log('Logout successful');
        navigate('/'); // Redirect to the home page after logout
      } else {
        // Logout failed, handle errors
        console.error('Logout failed');
        // Handle errors or provide a user-friendly message
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle unexpected errors or provide a user-friendly message
    }
  };
  
  return (
    <div className="home-container">
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
          <Link to='/'>
          <button onClick={handleLogout}>Logout</button>
          </Link>
        </div>
      </div>
      <div className="home-content">
        <div className="japanese-message">
          <h1>知識を得る。自分のやり方で学ぼう。ベストを尽くす。</h1>
        </div>
        <div className="english-message">
          <h1>Gain knowledge. Learn your way. Be the best.</h1>
        </div>
        <div className="courses">
          <div className="square">
            <h3>Programming</h3>
          </div>
          <div className="square">
            <h3>Artificial Intelligence</h3>
          </div>
          <div className="square">
            <h3>Business</h3>
          </div>
          <div className="square">
            <h3>Security</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamA_Dashboard;
