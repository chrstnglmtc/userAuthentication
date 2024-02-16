import React from "react";
import Navigation from './Navigation';
import { useAuth } from './AuthContext';
import '../Auth.css';

const Home = () => {
  // Accessing authentication-related functions and state from the AuthContext
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  return (
    <div className="home-container">
      {/* Navigation component with login/logout functionality */}
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> 
      {/* Main content of the home page */}
      <div className="home-content">
        {/* Japanese message section */}
        <div className="japanese-message">
          <h1>知識を得る。自分のやり方で学ぼう。ベストを尽くす。</h1>
        </div>
         {/* English message section */}
        <div className="english-message">
          <h1>Gain knowledge. Learn your way. Be the best.</h1>
        </div>
        {/* Courses section with different categories */}
        <div className="courses">
          {/* Square for Programming category */}
          <div className="square">
            <h3>Programming</h3>
          </div>
           {/* Square for Artificial Intelligence category */}
          <div className="square">
            <h3>Artificial Intelligence</h3>
          </div>
          {/* Square for Business category */}
          <div className="square">
            <h3>Business</h3>
          </div>
            {/* Square for Security category */}
          <div className="square">
            <h3>Security</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;