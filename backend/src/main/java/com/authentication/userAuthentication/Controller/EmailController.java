package com.authentication.userAuthentication.Controller;

import com.authentication.userAuthentication.Entity.EmailDetails;
import com.authentication.userAuthentication.Service.EmailService; // Adjusted import statement
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
    String generatedCode = emailService.generateAndStoreVerificationCode(details.getRecipient());
    
    // Set the generated code in the EmailDetails object
    details.setGeneratedCode(generatedCode);
    
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
    
        // Compare the entered code with the stored code
        if (enteredCode.equals(storedCode)) {
            // Verification successful, update the user's entered code
            emailService.storeEnteredCode(userEmail, enteredCode);
            
            // Update the user's is_verified field in the database
            userService.updateUserVerificationStatus(userEmail, true);
    
            return ResponseEntity.ok("Verification successful");
        } else {
            // Verification failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Verification failed");
        }
    }
    
    
}