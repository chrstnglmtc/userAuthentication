import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './TeamA_AuthContext';
import '../Auth.css';

function TeamA_ProfileEditForm() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Fetch user data from your backend API
    const fetchUserData = async () => {
      try {
        // Get user ID from local storage
        const userId = localStorage.getItem('userId');
  
        if (!userId) {
          console.error('User ID not found in local storage');
          // Handle this case, for example, redirect the user to login
          return;
        }
  
        const response = await fetch(`http://localhost:8085/api/v1/auth/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Failed to fetch user data', response.status, response.statusText);
          // Handle this error as needed
        }
      } catch (error) {
        console.error('Unexpected error during user data fetch', error);
        // Handle unexpected errors
      }
    };
  
    fetchUserData();
  }, []);

  const UpdateProfile = () => {
    const userId = localStorage.getItem('userId');
    const [updateData, setUpdateData] = useState({
      firstName: '',
      lastName: '',
      userName: '',
      // Add more fields as needed
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdateData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleUpdate = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
    
        const response = await fetch(`http://localhost:8085/api/v1/auth/update/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(updateData),
        });
    
        if (response.ok) {
          // Handle successful update, e.g., show a success message
          console.log('Profile updated successfully');
          // Redirect to '/profile'
          navigate('/profile');
        } else {  
          // Handle update failure, e.g., show an error message
          console.error('Update failed', response.status, response.statusText);
        }
      } catch (error) {
        // Handle network or unexpected errors
        console.error('Unexpected error during update', error);
      }
    };

    return {
      handleUpdate,
      handleInputChange,
      updateData,
    };
  };

  const { handleUpdate, handleInputChange, updateData } = UpdateProfile();

  return (
    <div className="Prof2-wrapper">
      <div className="Prof2-left">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
        </svg>
        <h4>Name</h4>
        <p>Position name</p>
      </div>
      <div className="Prof2-right">
        <div className="Prof2-info">
          <h3>Profile Information</h3>
          <form onSubmit={handleUpdate} className="Prof2-info_data">
            <div className="Prof2-data">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={updateData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
              />
              <label htmlFor="email">Email</label>
              <div className="data">
                {userData && <p>{userData.email}</p>}
              </div>
            </div>
            <div className="Prof2-data">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={updateData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="userName"
                value={updateData.userName}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
            </div>
          </form>
        </div>
        {/* Update and Cancel buttons */}
        <div className="Prof2-buttons">
          <button className="submit-button" onClick={handleUpdate}>
            Update
          </button>
          <Link to="/profile">
            <button className="cancel-button">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeamA_ProfileEditForm;