/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Auth.css'; // Import a CSS file for styling

function TeamA_VerificationForm() {
  const [verification, setVerification] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [resendStatus, setResendStatus] = useState(null);
  const [showResendButton, setShowResendButton] = useState(true);
  const [emailFromRegistration, setEmailFromRegistration] = useState('');
  const [resending, setResending] = useState(false);
  const [codeExpired, setCodeExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    setEmailFromRegistration(queryParams.get('email'));
  }, [queryParams]);

  useEffect(() => {
    checkVerificationCodeExpiration(emailFromRegistration);
  }, [emailFromRegistration]);

  const checkVerificationCodeExpiration = async (email) => {
    try {
      const response = await fetch(`http://localhost:8085/api/v1/auth/checkCodeExpiration?email=${email}`);

      if (response.ok) {
        const { codeExpired } = await response.json();
        setCodeExpired(codeExpired);
        setShowResendButton(codeExpired);
        setShowModal(true);
      } else {
        console.error('Failed to fetch verification code expiration status. Response:', response.status);
      }
    } catch (error) {
      console.error('Error during code expiration check:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8085/api/v1/auth/verifyForgotPasswordCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode: verification, recipient: emailFromRegistration }),
      });

      if (response.ok) {
        setVerificationStatus('Verification successful');
        setShowResendButton(false); // Hide the Resend Code button after successful verification
      } else {
        setVerificationStatus('Verification failed');
        setShowResendButton(codeExpired); // Show the Resend Code button if the code is expired
      }
    } catch (error) {
      console.error('Error during verification:', error);
    }
  };

  const handleResendCode = async () => {
    try {
      setResending(true);

      const resendResponse = await fetch('http://localhost:8085/api/v1/auth/resendCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient: emailFromRegistration }),
      });

      if (resendResponse.ok) {
        setResendStatus('Verification code resent successfully');
        setShowResendButton(false); // Hide the Resend Code button after successfully resending
      } else {
        setResendStatus('Failed to resend verification code');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error('Error during code resend:', error);
    } finally {
      setResending(false);
    }
  };

  const enroll = () => {
    // Handle enrollment logic if needed
  };

  // New function for handling forgot password verification code
  const handleForgotPasswordVerification = async () => {
    try {
      // Implement the logic for handling forgot password verification here

      // Example:
       /*const response = await fetch('http://localhost:8085/api/v1/auth/forgot-password', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email: emailFromRegistration }),
       });

       if (response.ok) {
         setVerificationStatus('Verification successful');
         setShowResendButton(false); // Hide the Resend Code button after successful verification
       } else {
         setVerificationStatus('Verification failed');
         setShowResendButton(codeExpired); // Show the Resend Code button if the code is expired
       }*/
    } catch (error) {
      console.error('Error during forgot password verification:', error);
    }
  };

  return (
    <div className="verification-forms-container">
      <form className="template-form" onSubmit={handleFormSubmit}>
        <Link to="/forgot" className="wBackbutton">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
        </Link>
        <h1 className="verification-title">Email Verification</h1>
        <p className="center-text">Please enter the verification code sent to {emailFromRegistration}</p>
        <div className="verification-input-field">
          <input
            type="text"
            placeholder="Verification Code"
            id="verification"
            name="verification"
            value={verification}
            onChange={(e) => setVerification(e.target.value)}
            required
          />
          {resending ? (
            <p>Resending verification code...</p>
          ) : codeExpired ? (
            <>
              {showResendButton && (
                <button type="button" className="TeamA-button" onClick={handleResendCode} disabled={resending}>
                  {resending ? 'Resending...' : 'Resend Code'}
                </button>
              )}
              <button type="submit" className="TeamA-button" onClick={handleForgotPasswordVerification}>
                Send
              </button>
            </>
          ) : (
            <button type="submit" className="TeamA-button" onClick={handleForgotPasswordVerification}>
              Send
            </button>
          )}
        </div>
      </form>

      {verificationStatus && showModal && (
        <>
          <div className="vf-modal-overlay"></div>
          <div className="vf-modal-sql modal fade show" id="modalSql" tabIndex="-1" aria-labelledby="modalSql" aria-hidden="true" style={{ display: 'block' }}>
            <div className="vf-modal-dialog">
              <div className="vf-modal-content" style={{ backgroundColor: "#D9FFCF", zIndex: 1051 /* Adjust the z-index to be higher than the overlay */ }}>
                <div className="vf-modal-header">
                  <h5 className="vf-modal-title" id="modalSql">
                    Email Verification
                  </h5>
                </div>
                <div className="vf-modal-body">
                  <p>Email Verified Successfully!</p>
                </div>
                <div className="vf-modal-footer">
                  <Link to="/login">
                    <button
                      type="button"
                      className="vf-login-btn"
                      style={{
                        backgroundColor: "#0e3b03",
                        color: "#ffffff",
                        borderRadius: "20px",
                        fontSize: "15px",
                        position: "center",
                      }}
                      onClick={enroll}
                    >
                      Log-In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="verification-panels-container">
        {verificationStatus && <p>{verificationStatus}</p>}
        {showResendButton && resendStatus && <p>{resendStatus}</p>}
      </div>
    </div>
  );
}

export default TeamA_VerificationForm;
