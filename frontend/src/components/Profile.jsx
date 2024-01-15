import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8085/api/v1/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Logout successful');
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8085/api/v1/update/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          firstName,
          lastName,
        }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        console.error('Profile update failed');
      }
    } catch (error) {
      console.error('Error during profile update:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="home-header">
        <div className="left-container">
          <div className="logo-container">
            <img src="/assets/images/companyLogo.png" alt="Logo" className="logo" />
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <h3>Catalog</h3>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <h3>Activities</h3>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="right-container">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="account-details-container">
        <form onSubmit={handleSubmit}>
          <div className="form-label">Account Details</div>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
