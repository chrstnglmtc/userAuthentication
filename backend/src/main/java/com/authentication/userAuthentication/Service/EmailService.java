package com.authentication.userAuthentication.Service;

import com.authentication.userAuthentication.Entity.EmailDetails;

public interface EmailService {
    String sendSimpleMail(EmailDetails details);

    String sendMailWithAttachment(EmailDetails details);

    // Existing method for getting stored verification code
    String getStoredCodeForUser(String generatedCode);

    // New method for generating and storing verification codes
    String generateAndStoreVerificationCode(String userEmail);

    // New method for getting entered code
    String getEnteredCodeForUser(String verificationCode);

    // New method for storing entered code
    void storeEnteredCode(String verificationCode, String enteredCode);

    // Existing method for verifying the entered code
    boolean verifyCode(String userEmail, String enteredCode);
}
