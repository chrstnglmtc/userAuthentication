/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Use the useAuth hook to get the handleLogin and setLoggedIn functions
  const { handleLogin } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Form submitted'); // Add this line for debugging
  
      const result = await handleLogin({ email, password });
      
      if (result.success) {
        console.log('Login successful'); // Add this line for debugging
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Login failed:', error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="template-form">
      <Link to="/">
        <button className="qBackbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
      </Link>
      <h2>Sign in to your account.</h2>
      <h2>Be part of the success.</h2>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        required
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}  // Add this line to capture Enter key
        placeholder="Password"
        required
      />
      <div className="remember-me">
        {/* Your remember me checkbox */}
      </div>
      <div>
        <h3>By clicking "Sign in," you agree to our Terms of Use and our Privacy Policy.</h3>
      </div>
      <Link to="/forgot">
        <div className="forgot-password">
          Forgot your password?
        </div>
      </Link>
      <button type="submit" className="TeamA-button">Sign in</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}


export default LoginForm;
