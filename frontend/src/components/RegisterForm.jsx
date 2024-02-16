/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState(''); // Default to 'STUDENT'
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
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
      const mappedRole = role === 'INSTRUCTOR' ? 'INSTRUCTOR' : 'STUDENT';
      console.log('Selected Role:', role);
      console.log('Mapped role:', mappedRole);

      console.log('Email:', email);
      console.log('Password:', password);
      console.log('FirstName:', firstName);
      console.log('LastName:', lastName);
      console.log('UserName:', userName);
      console.log('Role:', mappedRole);

      const response = await fetch('http://localhost:8085/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName, userName, role: mappedRole }),
      });

      if (response.ok) {
        console.log('Registration successful');
        localStorage.setItem('email', email);
        setVerificationCodeSent(true);
        navigate('/verify');
      } else {
        const data = response.headers.get('Content-Type')?.includes('application/json') ? await response.json() : null;
        if (response.status === 409) {
          console.error('User already exists');
          setError(data?.message || 'User with this email or username already exists. Please use different credentials.');
        } else {
          console.error('Registration failed');
          setError(data?.message || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister(e);
    }
  };

  const checkEmailAvailability = async () => {
    try {
      const response = await fetch('http://localhost:8085/api/v1/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        console.log('Email is available');
        setError(''); // Reset error state
        setShowError(false); // Reset showError state
      } else if (response.status === 409) {
        console.error('Email already exists');
        setError('Email already exists');
        setShowError(true);
      } else {
        console.error('Error checking email availability');
        setError('Error checking email availability');
        setShowError(true);
      }
    } catch (error) {
      console.error('Error during email availability check:', error);
      setError('Error during email availability check');
      setShowError(true);
    }
  };
  
  const checkUsernameAvailability = async () => {
    try {
      const response = await fetch('http://localhost:8085/api/v1/auth/check-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName }),
      });
  
      if (response.ok) {
        console.log('Username is available');
        setError(''); // Reset error state
        setShowError(false); // Reset showError state
      } else if (response.status === 409) {
        console.error('Username already exists');
        setError('Username already exists');
        setShowError(true);
      } else {
        console.error('Error checking username availability');
        setError('Error checking username availability');
        setShowError(true);
      }
    } catch (error) {
      console.error('Error during username availability check:', error);
      setError('Error during username availability check');
      setShowError(true);
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
          onBlur={checkUsernameAvailability}
          placeholder={`Username (${role === 'Admin' ? 'Admin' : role})`}
          required
        />

        <select
          id="Role"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="STUDENT">Student</option>
          <option value="INSTRUCTOR">Instructor</option>
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
        onBlur={checkEmailAvailability}
        placeholder="Email Address"
        required
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        onKeyPress={handleKeyPress}
        placeholder="Password"
        required
      />
      <div className="data-validation">
        {showError && (
          <label style={{ color: 'red', fontSize: '15px', fontWeight: '700', transition: 'color 0.3s' }}>
            {error}
          </label>
        )}
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
      <button className="TeamA-button" style={{ backgroundColor: '#126912' }}>Sign Up</button>
    </form>
  );
}

export default RegisterForm;