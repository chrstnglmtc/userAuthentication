import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Account.css';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:8080/logout', {
          method: 'POST', // You can adjust the method based on your server implementation
          headers: {
            'Content-Type': 'application/json',
            // Include any additional headers needed for authentication, e.g., authorization token
          },
          // You may include a body if needed, e.g., for sending additional logout information
        });
    
        if (response.ok) {
          // Logout successful, redirect to the home page
          console.log('Logout successful');
          navigate('/'); // Redirect to the home page after logout
        } else {
          // Logout failed, handle errors
          console.error('Logout failed');
          // Handle errors or provide a user-friendly message
        }
      } catch (error) {
        console.error('Error during logout:', error);
        // Handle unexpected errors or provide a user-friendly message
      }
    };
    
    return (
      <div className="profile-container">
        <div className="home-header">
          <div className="left-container">
            <div className="logo-container">
              <img
                src="/assets/images/companyLogo.png"
                alt="Logo"
                className="logo"
              />
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
    <form>
      <div className="form-label">Account Details</div>
      <label>
        Username/Email:
        <input type="text" required />
      </label>
      <label>
        Full Name:
        <input type="text" required />
      </label>
      <label>
        Old Password:
        <input type="password" required />
      </label>
      <label>
        New Password:
        <input type="password" required />
      </label>
      <label>
        Confirm Password:
        <input type="password" required />
      </label>
      <button type="submit">Update</button>
    </form>
  </div>
      </div>
    );
}

export default Profile;