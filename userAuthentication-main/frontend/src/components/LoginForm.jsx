import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm({ onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8085/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful, redirect to the dashboard or home page
        console.log('Login successful');
        navigate('/dashboard'); // Adjust the path based on your application
      } else {
        // Login failed, handle errors
        console.error('Login failed');
        setError('Invalid email or password. Please try again.'); // Provide a more user-friendly error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="template-form">
      <h2>Sign in on your account.</h2>
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
        placeholder="Password"
        required
      />
      <div>
        <h3>By clicking "Sign in," you agree to our Terms of Use and our Privacy Policy.</h3>
      </div>
      <Link to="/forgot">
        <div className="forgot-password">
          Forgot your password?
        </div>
      </Link>
      <button type="submit">Sign in</button>

      {/* Add a Link to navigate to the email verification page */}
      <Link to="/verify">
        <button type="button" className="verify-email-button">
          Verify Email
        </button>
      </Link>
    </form>
  );
}

export default LoginForm;