import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/TeamA_AuthContext';

import TeamA_Landing from './components/TeamA_Landing';
import TeamA_Login from './components/TeamA_Login';
import TeamA_Register from './components/TeamA_Register';
import TeamA_Forgot from './components/TeamA_Forgot';
import TeamA_Dashboard from './components/TeamA_Dashboard';
import TeamA_Profile from './components/TeamA_Profile';
import TeamA_Navigation from './components/TeamA_Navigation';
import TeamA_ProfileEdit from './components/TeamA_ProfileEdit';
import TeamA_Verification from './components/TeamA_Verification';
import TeamA_ChangePassword from './components/TeamA_ChangePassword';
import TeamA_About from './components/TeamA_About';
import TeamA_Email from './components/TeamA_Email';
import TeamA_NewPass from './components/TeamA_NewPass';

import './index.css';
import PropTypes from 'prop-types';

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
              if (user.verified) {
                navigate('/dashboard');
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
  }, [isAuthReady, navigate, isVerified]);  // Added 'isVerified' as a dependency

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
        <Route path="/" element={<TeamA_Landing />} />
        <Route path="/login" element={<TeamA_Login />} />
        <Route path="/register" element={<TeamA_Register />} />
        <Route path="/dashboard" element={<PrivateRoute element={<TeamA_Dashboard />} />} />
        <Route path="/forgot" element={<TeamA_Forgot />} />
        <Route path="/email" element={<TeamA_Email />} />
        <Route
          path="/verify"
          element={isVerified ? <Navigate to="/dashboard" /> : <TeamA_Verification />}
        />
        <Route path="/login" element={<TeamA_Login />} />
        <Route path="/profile" element={<PrivateRoute element={<TeamA_Profile />} />} />
        <Route path="/update" element={<PrivateRoute element={<TeamA_ProfileEdit />} />} />
        <Route path="/navigation" element={<TeamA_Navigation />} />
        <Route path="/change" element={<TeamA_ChangePassword />} />
        <Route path="/about" element={<PrivateRoute element={<TeamA_About />} />} />
        <Route path="/new" element={<TeamA_NewPass />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
