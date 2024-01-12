import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function VerificationForm() {
  const [email, setEmail] = useState('');

  const handleForgot = (e) => {
    e.preventDefault();
    // Call the onForgotPassword prop with the email value
    onForgotPassword(email);
    console.log('Resetting password for email:', email);
  };

  return (
    <div class="container">
        <div class="forms-container">
            <form action="index.html" class="sign-in-form">
                <h2 class="title">Email Verification</h2>
                <p>Please enter the verification code sent to your email address.</p>
                <div class="input-field">
                    <i class="fas fa-key"></i>
                    <input type="text" placeholder="Verification Code" />
                </div>
                <input type="submit" class="btn" value="Verify Email" />
            </form>
            
        </div>

        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3 class="center-text">Remember your password?</h3>
                    <p class="center-text">
                        <a href="index.html" class="back-to-login-link">Back to Login</a>
                    </p>
                </div>
                <img src="your-image.png" class="image" alt="" />
            </div>
        </div>
    </div>
       
  );
}

export default VerificationForm;
