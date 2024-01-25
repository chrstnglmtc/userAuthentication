package com.authentication.userAuthentication.Service.impl;

import com.authentication.userAuthentication.Entity.EmailDetails;
import com.authentication.userAuthentication.Service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    private final Map<String, String> verificationCodeStorage = new HashMap<>();
    // No changes in the sendSimpleMail method
    @Override
    public String sendSimpleMail(EmailDetails details) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully";
        } catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

    // No changes in the sendMailWithAttachment method
    @Override
    public String sendMailWithAttachment(EmailDetails details) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(details.getSubject());

            FileSystemResource file = new FileSystemResource(new File(details.getAttachment()));
            mimeMessageHelper.addAttachment(file.getFilename(), file);

            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        } catch (MessagingException e) {
            return "Error while sending mail!!!";
        }
    }

    // Changes start here

    // Removed @Override, as these methods are not overriding any methods
    // Added the actual implementation of these methods

    @Override
    public String generateAndStoreVerificationCode(String userEmail) {
        String verificationCode = generateRandomCode(); // Implement your code generation logic
        storeVerificationCodeForUser(userEmail, verificationCode);

        return "Verification code generated and stored successfully";
    }

    @Override
    public boolean verifyCode(String userEmail, String enteredCode) {
        String storedCode = getStoredCodeForUser(userEmail);

        // Compare the entered code with the stored code
        return enteredCode.equals(getStoredCodeForUser(userEmail));
    }

    // Added the actual implementation of the generateRandomCode method
    @Override
    public String getStoredCodeForUser(String userEmail) {
        // Retrieve the stored code from your data storage (e.g., database)
        // Replace this with your actual logic
        return "123456"; // Placeholder, replace with actual logic
    }

    // Placeholder method, replace with actual logic to store verification code
    private void storeVerificationCodeForUser(String userEmail, String verificationCode) {
        // Store the verification code for the user in your data storage (e.g., database)
        // Replace this with your actual logic
    }

    // Placeholder method, replace with actual logic to generate verification code
    private String generateRandomCode() {
        // Generate a verification code (e.g., random 6-digit code)
        // Replace this with your actual logic
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }
}
