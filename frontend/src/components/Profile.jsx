/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.css';
import Navigation from './Navigation';
import { useAuth } from "./AuthContext";


function Profile() {

  const { isLoggedIn, handleLogout } = useAuth();
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Introduce a delay to ensure asynchronous operations have completed
        setTimeout(async () => {
          const authToken = localStorage.getItem('yourAuthTokenKey');

          if (!authToken) {
            console.error('Authentication token not found');
            return;
          }

          const response = await fetch('http://localhost:8085/api/v1/auth/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUserData(userData);
          } else {
            console.error('Failed to fetch user data');
          }
        }, 100); // Adjust the delay as needed
      } catch (error) {
        console.error('Error during user data fetch:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="Prof1-wrapper">
        <Link to="/">
        <button className="Backbutton">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
        </svg>
        </button>
        </Link>
        <div className="Prof1-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
          </svg>
          <h4>Name</h4>
          <p>Position name</p>
        </div>
        <div className="Prof1-right">
          <div className="Prof1-info">
            <h3>Profile Information</h3>
            <div className="Prof1-info_data">
              <div className="data">
                <h4>Email</h4>
                <p>{userData.email}</p>
              </div>
              <div className="Prof1-data">
                <h4>Username</h4>
                <p>{userData.userName}</p>
              </div>
            </div>
          </div>
          <div className="Prof1-projects">
            <h3>Earned badges</h3>
            <div className="Pro1-data">
              {/* Add content for earned badges */}
            </div>
          </div>
          <div className="Prof1-buttons">
            <Link to="/update">
              <button className="Prof1-Editbuttons">Edit</button>
            </Link>
            <Link to="/change">
              <button className="Prof1-ChangeButton">Change Password</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;