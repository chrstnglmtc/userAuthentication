import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('User'); // Default to 'User'
  const [error, setError] = useState('');

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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, firstName, lastName, password, userType }),
      });

      if (response.ok) {
        // Registration successful, you can redirect or perform other actions
        console.log('Registration successful');
      } else {
        // Registration failed, handle errors
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
      <h2>Sign up an account.</h2>
      <h2>Be part of the success.</h2>
      <Link to="/">
        <button className="Register-Backbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
        </Link>
      <div className="group_input">
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={`Username (${userType === 'Admin' ? 'Admin' : userType})`}
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
      />
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <div className="data-validation">
        <label style={{ color: error ? 'red' : 'green', fontSize: '20px', fontWeight: '700', transition: 'color 0.3s' }}>
          {error || 'Password must be at least 8 characters long with one uppercase character, number, and symbol.'}
        </label>
      </div>
      <div>
        <h3 style={{fontSize: '15px'}}>By clicking Sign up you agree to our Terms of Use and our Privacy Policy.</h3>
      </div>
      <Link to="/login">
        <div className="existing-account">
      Already have an account?
        </div>
      </Link>
      <button type="submit">Sign up</button>
    </form>
  );
}

export default RegisterForm;
