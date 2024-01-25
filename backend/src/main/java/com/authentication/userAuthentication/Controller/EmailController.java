package com.authentication.userAuthentication.Controller;

import com.authentication.userAuthentication.Entity.EmailDetails;
import com.authentication.userAuthentication.Service.EmailService; // Adjusted import statement
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
        return emailService.generateAndStoreVerificationCode(details.getRecipient());
    }

    // New endpoint for verifying the entered code
    @PostMapping("/verifyCode")
    public ResponseEntity<String> verifyCode(@RequestBody EmailDetails details) {
        System.out.println("Received Verification Request: " + details.toString()); // Add this line
        String userEmail = details.getRecipient();
        String enteredCode = details.getVerificationCode();

        // Retrieve the stored code for the user
        String storedCode = emailService.getStoredCodeForUser(userEmail);

        // Compare the entered code with the stored code
        if (enteredCode.equals(storedCode)) {
            // Verification successful
            return ResponseEntity.ok("Verification successful");
        } else {
            // Verification failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Verification failed");
        }
    }
}
