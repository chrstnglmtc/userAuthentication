/* eslint-disable no-unused-vars */
import React from "react";
import "../Auth.css";
import Navigation from './Navigation';
import { useAuth } from "./AuthContext"; // Make sure to import your auth context


const TeamA_Dashboard = () => {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <div className="home-container">
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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
