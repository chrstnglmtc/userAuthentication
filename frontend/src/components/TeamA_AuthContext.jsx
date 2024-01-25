/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      // Retrieve authentication token from localStorage
      const authToken = localStorage.getItem('authToken');
  
      // Perform logout API call with the authentication token
      const response = await fetch('http://localhost:8085/api/v1/auth/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // 'Authorization' is the key
        },
      });
  
      if (response.ok) {
        // Clear authentication token
        localStorage.removeItem('authToken');
        // Clear other session-related items if needed
        // localStorage.removeItem('otherSessionItem');
        // Update login state
        setLoggedIn(false);
        // Redirect to another page (e.g., home page)
        history.push('/');
      } else {
        // Handle logout failure
        console.error('Logout failed', response.status, response.statusText);
        // Display user-friendly message
        // setError('Logout failed. Please try again.');
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Unexpected error during logout', error);
      // Display user-friendly message
      // setError('An unexpected error occurred. Please try again.');
    }
  };
  

  const handleLogin = async (credentials) => {
    try {
        setLoading(true);

        const response = await fetch('http://localhost:8085/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Server Response:', data);

            if (data.accessToken) {
                // Update authentication token and user information
                localStorage.setItem('authToken', data.accessToken);

                // Check and update user-related information
                updateLocalStorage('userId', data.userId);
                updateLocalStorage('username', data.username);
                updateLocalStorage('firstName', data.firstName);
                updateLocalStorage('lastName', data.lastName);
                updateLocalStorage('email', data.email);

                // Update login state
                setLoggedIn(true);
                setError(null);
            } else {
                console.error('Token missing in response:', data);
                setError('Invalid response from the server: Token missing');
            }
        } else {
            console.error('Login failed. Server response:', data);

            // Provide user-friendly error messages based on server response
            if ('message' in data) {
                setError(data.message);
            } else {
                setError('Invalid email or password. Please try again.');
            }
        }
    } catch (error) {
        console.error('Unexpected error during login', error);
        setError('An unexpected error occurred. Please try again later.');
    } finally {
        setLoading(false);
    }
};

const updateLocalStorage = (key, value) => {
    if (value !== undefined) {
        localStorage.setItem(key, value);
    }
};




  // Check for stored token on initialization
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout, setLoggedIn, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
