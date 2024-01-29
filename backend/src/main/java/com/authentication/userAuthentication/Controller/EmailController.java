package com.authentication.userAuthentication.Controller;

import com.authentication.userAuthentication.Entity.EmailDetails;
import com.authentication.userAuthentication.Entity.VerificationCodeEntity;
import com.authentication.userAuthentication.Service.AuthService;
import com.authentication.userAuthentication.Service.EmailService; // Adjusted import statement

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthService authService; 

    @PostMapping("/sendMail")
    public String sendMail(@RequestBody EmailDetails details) {
        return emailService.sendSimpleMail(details);
    }

    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(@RequestBody EmailDetails details) {
        return emailService.sendMailWithAttachment(details);
    }
    // New endpoint for generating and storing verification codes
    @PostMapping("/generateVerificationCode")
    public String generateVerificationCode(@RequestBody EmailDetails details) {
        // Set the expiration time (e.g., 5 seconds from now)
        long expirationTimeInMillis = System.currentTimeMillis() + (5 * 60 * 1000); // 5 minutes in milliseconds

        // Convert expiration time to a human-readable format (optional)
        LocalDateTime expirationDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(expirationTimeInMillis), ZoneId.systemDefault());
        
        String generatedCode = emailService.generateAndStoreVerificationCode(details.getRecipient(), expirationTimeInMillis);
        
        // Set the generated code and expiration time in the EmailDetails object
        details.setGeneratedCode(generatedCode);
        details.setExpirationTime(expirationDateTime);
        
        return generatedCode;
    }
    


    // New endpoint for verifying the entered code
    @PostMapping("/verifyCode")
    public ResponseEntity<String> verifyCode(@RequestBody EmailDetails details) {
        System.out.println("Received Verification Request: " + details.toString());
    
        String userEmail = details.getRecipient(); // Assuming recipient is the email
        String enteredCode = details.getVerificationCode();
    
        // Get the stored verification code for the user
        String storedCode = emailService.getStoredCodeForUser(userEmail);
    
        // Get the verification result
        boolean verificationResult = emailService.verifyCode(userEmail, enteredCode);
    
        if (verificationResult) {
            // Verification successful
            // Update user's verification status or perform other actions
            return ResponseEntity.ok("Verification successful");
        } else {
            // Verification failed
            // Handle expiration or incorrect code
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Verification failed");
        }
    }
    
}