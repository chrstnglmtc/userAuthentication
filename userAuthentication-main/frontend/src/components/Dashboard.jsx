import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Perform logout API call
    const response = await fetch('http://localhost:8085/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Clear authentication token
      localStorage.removeItem('authToken');
      // Redirect to login page or perform other client-side actions
      navigate('/login');
    } else {
      // Handle logout failure
      console.error('Logout failed');
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
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <h3>Catalog</h3>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <h3>Activities</h3>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="right-container">
          <button onClick={handleLogout}>Logout</button>
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

export default Dashboard;
