package com.authentication.userAuthentication.Service;

import com.authentication.userAuthentication.Entity.EmailDetails;

public interface EmailService {
    String sendSimpleMail(EmailDetails details);

    String sendMailWithAttachment(EmailDetails details);
    // New method for generating and storing verification codes
    String generateAndStoreVerificationCode(String userEmail);
    // New method for verifying the entered code
    boolean verifyCode(String userEmail, String enteredCode);
}
