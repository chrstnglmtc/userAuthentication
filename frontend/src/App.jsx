/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';

import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import ProfileEdit from './components/ProfileEdit';
import Verification from './components/Verification';
import ChangePassword from './components/ChangePassword';
import About from './components/About';
import Email from './components/Email';
import NewPass from './components/NewPass';

import './index.css';
import PropTypes from 'prop-types';
import Home from './components/Home';

function PrivateRoute({ element, ...rest }) {
  const { isLoggedIn, isAuthReady } = useAuth();

  if (!isAuthReady) {
    // Loading state, you can render a loading spinner or some other indicator
    return <div>Loading...</div>;
  }

  return isLoggedIn ? element : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

function App() {
  const [isVerified, setIsVerified] = useState(false);
  const { isAuthReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      // Retrieve the user ID from local storage
      const storedUserId = localStorage.getItem('userId');

      if (storedUserId) {
        try {
          // Use the user ID to fetch verification status
          const response = await fetch(`http://localhost:8085/api/v1/auth/users/${storedUserId}`);
          if (response.ok) {
            const user = await response.json();

            // Ensure that the response has the expected structure
            if (user && user.hasOwnProperty('user_id')) {
              setIsVerified(user.verified);

              // Redirect to a different route if the user is verified
              if (!user.verified && window.location.pathname !== '/verify') {
                navigate('/verify');
              }
            } else {
              console.error('Invalid user data received from the server:', user);
            }
          } else {
            console.error('Failed to fetch user data. Response:', response.status);
          }
        } catch (error) {
          console.error('Error during verification status check:', error);
        }
      } else {
        console.log('User ID not found in local storage');
      }
    };

    // Check verification status only when authentication is ready
    if (isAuthReady) {
      checkVerificationStatus();
    }
  }, [isAuthReady, navigate]);

  useEffect(() => {
    // Trigger verification check after successful registration
    if (localStorage.getItem('registrationSuccess')) {
      checkVerificationStatus();
      // Clear the registration success flag
      localStorage.removeItem('registrationSuccess');
    }
  }, []);
  // Show loading indicator while authentication is not ready
  if (!isAuthReady) {
    return <div>Loading...</div>;
  }
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/email" element={<Email />} />
      <Route path="/new" element={<NewPass />}/>

      {/* Protected Routes */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/update" element={<PrivateRoute element={<ProfileEdit />} />} />
      <Route path="/navigation" element={<PrivateRoute element={<Navigation />} />} />
      <Route path="/change" element={<PrivateRoute element={<ChangePassword />} />} />
      <Route path="/about" element={<PrivateRoute element={<About />} />} />

      {/* Verification Route */}
      <Route
        path="/verify"
        element={<Verification />}
      />
    </Routes>
    </AuthProvider>
  );
}

export default App;
