import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function VerificationForm({
  onVerificationForm = () => {}, // Default to an empty function
  onVerificationSuccess = () => {} // Default to an empty function
}) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const otpCode = generateOTP();

    // Use the email value when making the verification request
    const verificationData = {
      recipient: email,
      msgBody: `Your verification code is: ${otpCode}`,
      subject: 'Verification Code',
    };

    try {
      const response = await fetch('http://localhost:8085/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      });

      if (response.ok) {
        navigate('/send');
        console.log('Verification email sent successfully');
        onVerificationForm(email, otpCode); // Pass the email and OTP to the parent component
        onVerificationSuccess(); // Notify the parent component of the successful verification
      } else {
        console.error('Failed to send verification email');
        // Handle the case where the email sending fails
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      // Handle the case where an error occurs during the verification process
    }
  };

  return (
    <div className="verification-forms-container" style={{ fontFamily: 'sans-serif' }}>
      <form className="verification-sign-in-form" onSubmit={handleFormSubmit}>
        <h1 className="verification-title">Email Verification</h1>
        <Link to="/email">
        <button className="Verification-Backbutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
          </svg>
        </button>
        </Link>
        <p>Please enter Email</p>
        <div className="verification-input-field">
          <input
            type="email"
            placeholder="Email"
            id="verification"
            name="verification"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <input type="submit" className="verification-button" value="Send" />
      </form>

      <div className="verification-panels-container">
        <div className="verification-panel verification-left-panel">
          <div className="content">
            {/* Your content goes here */}
          </div>
          <img src="your-image.png" className="verification-image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default VerificationForm;
