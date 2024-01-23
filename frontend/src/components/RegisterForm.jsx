import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

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
        // Registration successful, you can redirect or perform other actions
        console.log('Registration successful');
        navigate('/dashboard');
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
      <input
        type="text"
        id="firstName"
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
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
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
        <label style={{ color: error ? 'red' : 'green', fontSize: '12px', fontWeight: '700', transition: 'color 0.3s' }}>
          {error || 'Password must be at least 8 characters long with one uppercase character, number, and symbol.'}
        </label>
      </div>
      <div>
        <h3>By clicking Sign up you agree to our Terms of Use and our Privacy Policy.</h3>
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
