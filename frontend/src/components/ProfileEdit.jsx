import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.css';
import ProfileEditForm from "./ProfileEditForm";
import Navigation from './Navigation';
import { useAuth } from "./AuthContext";


function ProfileEdit() {

  const { isLoggedIn, handleLogout } = useAuth();
  const navigate = useNavigate(); //
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous window
  };
    
  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Link to="/profile">
      </Link>
      <div className="Prof2-content">
        <div className="Prof2-sign">
          <ProfileEditForm/>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;