// eslint-disable-next-line no-unused-vars
import React from 'react';
import LoginForm from './LoginForm';
import { Link } from "react-router-dom";
import '../Auth.css';
/**
 * Login page component.
 */
function Login() {


  return (
    
    <div>
      <div className="label-container">
        <div className="container-under">
        <div className="auth-label">
          <h1>LOG IN</h1>
        </div>
     
      <div className="auth-content">
        <div className="auth-sign">
          <LoginForm />
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Login;

