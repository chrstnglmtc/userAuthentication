import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const VerificationForm = ({
  onVerificationForm = () => {},
  onVerificationSuccess = () => {}
}) => {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Generate Verification Code
      const generateCodeResponse = await fetch('http://localhost:8085/generateVerificationCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: email,
        }),
      });

      if (!generateCodeResponse.ok) {
        console.error('Failed to generate verification code');
        return;
      }

      const generatedCode = await generateCodeResponse.text();
      setOtpCode(generatedCode);

      // Step 2: Send Verification Code
      const verificationData = {
        recipient: email,
        verificationCode: generatedCode,
      };

      const sendVerificationEmailResponse = await fetch('http://localhost:8085/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      });

      if (sendVerificationEmailResponse.ok) {
        navigate('/send');
        console.log('Verification email sent successfully');
        console.log('Generated Verification Code:', generatedCode);
        onVerificationForm(generatedCode);
        onVerificationSuccess();
      } else {
        console.error('Failed to send verification email');
      }
    } catch (error) {
      console.error('Error during verification:', error);
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
            {/* Display the received OTP code */}
            {otpCode && <p>Received OTP Code: {otpCode}</p>}
          </div>
          <img src="your-image.png" className="verification-image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default VerificationForm;
