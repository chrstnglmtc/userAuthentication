/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TeamA_RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('User'); // Default to 'User'
  const [error, setError] = useState('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false); // New state variable

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isValid = passwordRegex.test(password);

    setError(isValid ? '' : 'Password must be at least 8 characters with at least 1 uppercase, 1 numeric, and 1 symbol.');

    return isValid;
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8085/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName, userName }),
      });

      if (response.ok) {
        console.log('Registration successful');
        // Store the email in local storage
        localStorage.setItem('email', email);
        setVerificationCodeSent(true);
        navigate('/verify'); // Include email as a query parameter
      } else {
        console.error('Registration failed');
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleRegister} className="template-form">
      <Link to="/">
        <div className="qBackbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </div>
      </Link>
      <h2>Sign up an account.</h2>
      <h2>Be part of the success.</h2>

      <div className="group_input">
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={`Username (${userType === 'Admin' ? 'Admin' : userType})`}
          required
        />

        <select
          id="userType"
          value={userType}
          onChange={handleUserTypeChange}
        >
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
          <option value="Instructor">Instructor</option>
        </select>
      </div>
      <input
        type="text"
        id="FirstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
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
        onChange={handlePasswordChange}
        placeholder="Password"
        required
      />
      <div className="data-validation">
        <label style={{ color: error ? 'red' : 'green', fontSize: '15px', fontWeight: '700', transition: 'color 0.3s' }}>
          { error || 'Password must be at least 8 characters long with one uppercase character, number, and symbol.'}
        </label>
      </div>
      <div>
        <h3 style={{ fontSize: '15px' }}>By clicking Sign up you agree to our Terms of Use and our Privacy Policy.</h3>
      </div>
      {verificationCodeSent && (
        <div style={{ backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
          <span style={{ color: 'green' }}>✓</span> Verification code has been sent to your email. Please check your inbox.
        </div>
      )}
      <Link to="/login">
        <div className="existing-account">
          Already have an account?
        </div>
      </Link>
      <button type="submit" className="TeamA-button">Sign up</button>
    </form>
  );
}

export default TeamA_RegisterForm;
