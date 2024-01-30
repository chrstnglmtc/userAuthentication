import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TeamA_RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('User');
  const [error, setError] = useState('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
        setVerificationCodeSent(true);
        setShowModal(true);
      } else {
        console.error('Registration failed');
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  const enroll = () => {
    setShowModal(false);
    navigate(`/verify?email=${email}`);
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
          {error || 'Password must be at least 8 characters long with one uppercase character, number, and symbol.'}
        </label>
      </div>
      <div>
        <h3 style={{ fontSize: '15px' }}>By clicking Sign up you agree to our Terms of Use and our Privacy Policy.</h3>
      </div>

      {verificationCodeSent && showModal && (
  <>
    <div className="rf-modal-overlay"></div>
    <div className="rf-modal-sql modal fade show" id="modalSql" tabIndex="-1" aria-labelledby="modalSql" aria-hidden="true" style={{ display: 'block' }}>
      <div className="rf-modal-dialog">
        <div className="rf-modal-content" style={{ backgroundColor: "#D9FFCF", zIndex: 1051 /* Adjust the z-index to be higher than the overlay */ }}>
          <div className="rf-modal-header">
            <h5 className="rf-modal-title" id="modalSql">
              Account Registration Successful!
            </h5>
          </div>
          <div className="rf-modal-body">
            <p>Verify your Email</p>
          </div>
          <div className="rf-modal-footer">
            <button
              type="button"
              className="rf-verify-btn"
              style={{
                backgroundColor: "#0e3b03",
                color: "#ffffff",
                borderRadius: "20px",
                fontSize: "15px",
              }}
              onClick={enroll}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
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
