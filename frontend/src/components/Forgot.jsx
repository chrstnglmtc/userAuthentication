import React from 'react';
import { Link } from "react-router-dom";
import '../Auth.css';
import ForgotForm from './ForgotForm';

function Forgot({ onNavigateHome, onForgotPassword }) {
  // Function implementation goes here

  return (
    <div className="forgot-container">
        {/* Main content section with the 'Forgot Password' form */}
      <div className="forgot-content">
        <div className="forgot-sign">
          <ForgotForm />
        </div>
      </div>
    </div>
  );
}

export default Forgot;
