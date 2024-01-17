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
      const response = await fetch('http://localhost:8080/login', {
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
    <h2>Sign in on your account.</h2> <Link to="/">
        <button className="Log-Backbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
        </Link>
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
      <div className="remember-me">
      <input type="checkbox" id="rememberMe"  className='rememberMe_input'/><p>Remember me </p>
       </div>
      
      <div>
        <h3>By clicking "Sign in," you agree to our Terms of Use and our Privacy Policy.</h3>
      </div>
      <Link to="/forgot">
        <div className="forgot-password">
          Forgot your password?
        </div>
      </Link>
      <button type="submit">Sign in</button>
    </form>
  );
}

export default LoginForm;
