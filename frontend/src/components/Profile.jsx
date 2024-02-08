/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useNavigation} from 'react-router-dom';
import '../Auth.css';
import { useAuth } from "./AuthContext";
import { Modal } from 'react-bootstrap';
import ProfileEditForm from './ProfileEditForm';
// import UserNavigation from './UserNavigation';

// Function to get user image type
function getUserImageType(profilePicture) {
  // Check if profilePicture is defined and not null
  if (profilePicture && profilePicture.startsWith) {
    // Check the image type based on the data
    const isPNG = profilePicture.startsWith('data:image/png;base64,');
    const isJPEG = profilePicture.startsWith('data:image/jpeg;base64,');
    
    if (isPNG) {
      return 'png';
    } else if (isJPEG) {
      return 'jpeg';
    } else {
      // Return a default type or handle accordingly
      return 'unknown'; // You can change this to 'jpeg' or handle as needed
    }
  } else {
    // Return a default type or handle accordingly
    return 'unknown'; // You can change this to 'jpeg' or handle as needed
  }
}


const Profile  = ({ handleClose, handleEditClick }) => {

  const { isLoggedIn, handleLogout } = useAuth();
  const [userData, setUserData] = useState({});
  const [updateData, setUpdateData] = useState({});
  const navigate = useNavigate(); //


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in local storage');
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
  
          if (userData.profilePicture !== undefined && userData.profilePicture !== null) {
            const base64 = btoa(String.fromCharCode(...new Uint8Array(userData.profilePicture)));
            const imageType = getUserImageType(userData.profilePicture);
            const dataUrl = `data:image/${imageType};base64,${base64}`;
  
            // console.log('base64:', base64);
            // console.log('imageType:', imageType);
            // console.log('dataUrl:', dataUrl);
  
            setUpdateData((prevData) => ({
              ...prevData,
              profilePicture: dataUrl,
            }));
          } else {
            console.error('Profile picture is undefined or null in user data');
          }
        } else {
          console.error('Failed to fetch user data', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Unexpected error during user data fetch', error);
      }
    };
  
    fetchUserData();
  }, []);

    
  return (
    <>
      {/* <UserNavigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> */}
      <div className="Prof1-wrapper">
        <div className="Prof1-left">
        <button onClick={handleClose} className="wBackbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
        <img
          src={`data:image/${getUserImageType(userData.profilePicture)};base64,${userData.profilePicture}`}
          alt="Profile"
          className="Profile-picture"
        />
          <h4>{userData.firstName} {userData.lastName}</h4>
          <p>Position name</p>
        </div>
        <div className="Prof1-right">
          <div className="Prof1-info">
            <h3>Profile Information</h3>
            <div className="Prof1-info_data">
              <div className="Prof1-data_row">
                <h4>Email</h4>
                <p>{userData.email}</p>
              </div>
              <div className="Prof1-data_row">
                <h4>Username</h4>
                <p>{userData.username}</p>
              </div>
              <div className="Prof1-data_row">
                <h4>First Name</h4>
                <p>{userData.firstName}</p>
              </div>
              <div className="Prof1-data_row">
                <h4>Last Name</h4>
                <p>{userData.lastName}</p>
              </div>
            </div>
          </div>
          <div className="Pro1-data">
          {/* Add content for earned badges */}
        </div>
          <div className="Prof1-buttons">
            <Link to="#">
              <button onClick={handleEditClick} className="Prof1-Editbuttons">Edit</button>
            </Link>
            <Link to="/change">
              <button className="Prof1-ChangeButton">Change Password</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;