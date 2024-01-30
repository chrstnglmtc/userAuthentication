import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './TeamA_AuthContext';
import '../Auth.css';

function TeamA_ProfileEditForm() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [updateData, setUpdateData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    profilePicture: null, // Add profilePicture to state
  });

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

          // If the profile picture is in binary format, convert it to a data URL
          if (userData.profilePicture) {
            const base64 = btoa(String.fromCharCode(...new Uint8Array(userData.profilePicture)));
            const dataUrl = `data:image/avif;base64,${base64}`;
            setUpdateData((prevData) => ({
              ...prevData,
              profilePicture: dataUrl,
            }));
          }
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

  const handleInputChange = (e, isFile = false) => {
    const { name, value, files } = e.target;

    setUpdateData((prevData) => ({
      ...prevData,
      [name]: isFile ? files[0] : value,
    }));
  };

  const handleProfilePictureUpload = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const authToken = localStorage.getItem('authToken');

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('file', updateData.profilePicture);

      const response = await fetch(`http://localhost:8085/api/v1/auth/upload-pp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Profile picture uploaded successfully');
      } else {
        console.error('Profile picture upload failed', response.status, response.statusText);
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Unexpected error during profile picture upload', error);
      // Handle unexpected errors
    }
  };

  const handleUpdate = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const authToken = localStorage.getItem('authToken');

      const response = await fetch(`http://localhost:8085/api/v1/auth/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          firstName: updateData.firstName,
          lastName: updateData.lastName,
          userName: updateData.userName,
          // Add more fields as needed
        }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        navigate('/profile');
      } else {
        console.error('Update failed', response.status, response.statusText);
        // Handle update failure
      }
    } catch (error) {
      console.error('Unexpected error during update', error);
      // Handle network or unexpected errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload profile picture
    await handleProfilePictureUpload();

    // Update general profile information
    await handleUpdate();
  };

  return (
    <div className="Prof2-wrapper">
      <div className="Prof2-left">
        {/* profile picture change here */}
        <h4>Name</h4>
        <p>Position name</p>
      </div>
      <div className="Prof2-right">
        <div className="Prof2-info">
          <h3>Profile Information</h3>
          <form onSubmit={handleSubmit} className="Prof2-info_data">
            {/* Existing form fields */}
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
  
            {/* Profile Picture Input */}
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={(e) => handleInputChange(e, true)}
              accept="image/*"
            />
  
            {/* Update and Cancel buttons */}
            <div className="Prof2-buttons">
              <button className="submit-button" type="submit">
                Update
              </button>
              <Link to="/profile">
                <button className="cancel-button">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}  
export default TeamA_ProfileEditForm;