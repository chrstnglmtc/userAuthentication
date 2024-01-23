import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

function LoginForm({ onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Use the useAuth hook to get the handleLogin and setLoggedIn functions
  const { handleLogin, setLoggedIn } = useAuth(); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the handleLogin function from useAuth
      await handleLogin({ email, password });
      // Set the login state using setLoggedIn
      setLoggedIn(true);
      // Redirect upon successful login
      navigate('/');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="template-form">
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
        <div className="forgot-password">Forgot your password?</div>
      </Link>
      <button type="submit">Sign in</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export default LoginForm;
