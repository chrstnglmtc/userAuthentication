// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
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
        // Update login state
        setLoggedIn(false);
      } else {
        // Handle logout failure
        console.error('Logout failed');
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Unexpected error during logout', error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      // Perform login API call with credentials
      const response = await fetch('http://localhost:8085/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        // Update authentication token
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        // Update login state
        setLoggedIn(true);
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Unexpected error during login', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
