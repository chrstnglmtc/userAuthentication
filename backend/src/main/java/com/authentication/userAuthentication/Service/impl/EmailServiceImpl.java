package com.authentication.userAuthentication.Service.impl;

import com.authentication.userAuthentication.Entity.EmailDetails;
import com.authentication.userAuthentication.Entity.ForgotCodeEntity;
import com.authentication.userAuthentication.Entity.User;
import com.authentication.userAuthentication.Entity.VerificationCodeEntity;
import com.authentication.userAuthentication.Exceptions.UserNotFoundException;
import com.authentication.userAuthentication.Exceptions.VerificationCodeException;
import com.authentication.userAuthentication.Repo.ForgotCodeRepo;
import com.authentication.userAuthentication.Repo.UserRepo;
import com.authentication.userAuthentication.Repo.VerificationCodeRepo;
import com.authentication.userAuthentication.Service.AuthService;
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
import jakarta.transaction.Transactional;

import java.io.File;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ForgotCodeRepo forgotCodeRepo;

    @Autowired
    private VerificationCodeRepo verificationCodeRepo;

    @Value("${spring.mail.username}")
    private String sender;

    private final Map<String, String> generatedCodeStorage = new HashMap<>();
    private final Map<String, String> enteredCodeStorage = new HashMap<>();
    private final Map<String, VerificationCodeEntity> verificationCodeMap = new ConcurrentHashMap<>();
    private final Map<String, String> passwordResetCodes = new ConcurrentHashMap<>();

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
            // Log the specific exception details
            return "Error while Sending Mail: " + e.getMessage();
        }
    }

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
            // Log the specific exception details
            return "Error while sending mail: " + e.getMessage();
        }
    }

    @Override
    @Transactional
    public String generateAndStoreVerificationCode(String userEmail) {
        return generateAndStoreVerificationCode(userEmail, getDefaultExpirationTimeInMillis());
    }

    @Override
    @Transactional
    public String generateAndStoreVerificationCode(String userEmail, Long expirationTimeInMillis) {
        // Fetch the user from the repository based on userEmail
        User user = userRepo.findByEmail(userEmail);

        if (user != null) {
            String generatedCode = generateRandomCode();

            // Use a default expiration time if not provided
            if (expirationTimeInMillis == null) {
                expirationTimeInMillis = getDefaultExpirationTimeInMillis();
            }

            // Save verification code with expiration time to the database
            verificationCodeRepo.save(new VerificationCodeEntity(user, generatedCode, expirationTimeInMillis));

            // Store verification code in memory (if needed)
            generatedCodeStorage.put(userEmail, generatedCode);

            return generatedCode;
        } else {
            // Handle the case where the user is not found
            return "User not found";
        }
    }

    private long getDefaultExpirationTimeInMillis() {
        // Implement this method to provide a default expiration time
        // This could be based on some configuration or constant value
        return System.currentTimeMillis() + (5 * 60 * 1000); // Example: expiration time is 5 minutes from now
    }

    @Override
    public VerificationCodeEntity getStoredVerificationInfoForUser(String userEmail) {
        // Find the stored verification information for the given user email
        Optional<VerificationCodeEntity> verificationInfoOptional = verificationCodeRepo.findByUserEmail(userEmail);

        return verificationInfoOptional.orElse(null);
    }

    @Override
    @Transactional
    public boolean verifyCode(String userEmail, String enteredCode) {
        // Get the stored verification info for the user
        Optional<VerificationCodeEntity> verificationInfoOptional = verificationCodeRepo.findByUserEmail(userEmail);

        if (verificationInfoOptional.isPresent()) {
            VerificationCodeEntity verificationInfo = verificationInfoOptional.get();

            String storedCode = verificationInfo.getVerificationCode();
            long expirationTimeInMillis = verificationInfo.getExpirationTimeInMillis();

            // Log values for debugging
            System.out.println("Current Time: " + System.currentTimeMillis());
            System.out.println("Expiration Time: " + expirationTimeInMillis);
            System.out.println("Stored Code: " + storedCode);
            System.out.println("Entered Code: " + enteredCode);

            // Check if the code is expired
            if (System.currentTimeMillis() <= expirationTimeInMillis && enteredCode.equals(storedCode)) {
                // Code is valid, update the user's verification status
                authService.updateUserVerificationStatus(userEmail, true);
                return true;
            }
        }

        return false;
    }

    @Override
    public void sendForgotCodeViaEmail(String userEmail, String forgotCode) {
        // Implement the logic to send the forgot code via email
        // You can use the injected JavaMailSender or any other email sending mechanism
        // Include the user's email address, subject, and the generated forgot code in the email
        // Example:
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(userEmail);
        emailDetails.setSubject("Forgot Code");
        emailDetails.setMsgBody("Your forgot code is: " + forgotCode);

        sendSimpleMail(emailDetails);
    }

    @Override
    public boolean isVerificationCodeExpired(String email) {
        VerificationCodeEntity verificationCodeEntity = verificationCodeMap.get(email);
        if (verificationCodeEntity != null) {
            Instant expirationTime = verificationCodeEntity.getExpirationTime();
            return Instant.now().isAfter(expirationTime);
        }
        return true; // Assume expired if no verification code is found
    }

    @Override
    public String getStoredCodeForUser(String userEmail) {
        return generatedCodeStorage.getOrDefault(userEmail, "");
    }

    @Override
    public String getEnteredCodeForUser(String verificationCode) {
        return enteredCodeStorage.getOrDefault(verificationCode, "");
    }

    @Override
    @Transactional
    public String resendVerificationCode(String userEmail) {
        User user = userRepo.findByEmail(userEmail);

        if (user != null) {
            // Check if there's an existing verification code
            Optional<VerificationCodeEntity> existingVerificationCode = verificationCodeRepo.findByUserEmail(userEmail);

            if (existingVerificationCode.isPresent()) {
                // Use the existing verification code and update its expiration time
                VerificationCodeEntity verificationCodeEntity = existingVerificationCode.get();
                verificationCodeEntity.setExpirationTimeInMillis(getDefaultExpirationTimeInMillis());
                verificationCodeRepo.save(verificationCodeEntity);

                // You can send the code by email or any other communication method
                return verificationCodeEntity.getVerificationCode();
            } else {
                // Generate a new verification code and store it
                String generatedCode = generateRandomCode();
                long expirationTimeInMillis = getDefaultExpirationTimeInMillis();

                verificationCodeRepo.save(new VerificationCodeEntity(user, generatedCode, expirationTimeInMillis));
                generatedCodeStorage.put(userEmail, generatedCode);

                // You can send the code by email or any other communication method
                return generatedCode;
            }
        } else {
            return "User not found";
        }
    }

    @Override
    @Transactional
    public String generateVerificationCode() {
        // Implement the logic to generate a verification code
        return generateRandomCode();
    }

    @Override
    public void storeEnteredCode(String verificationCode, String enteredCode) {
        enteredCodeStorage.put(verificationCode, enteredCode);
    }

    @Override
    public String getStoredCode(String userEmail) {
        return generatedCodeStorage.getOrDefault(userEmail, "");
    }

    @Override
    public void saveVerificationCode(VerificationCodeEntity verificationCodeEntity) {
        verificationCodeRepo.save(verificationCodeEntity);
    }

    private String generateRandomCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    @Override
    public LocalDateTime getExpirationTime() {
        // Implement this method if you need to retrieve the expiration time
        // This could be based on some configuration or constant value
        return LocalDateTime.now().plusMinutes(5); // Example: expiration time is 5 minutes from now
    }

    @Override
    public void setExpirationTime(LocalDateTime expirationTime) {
        // Implement this method if you need to set the expiration time
        // This could be useful if you want to customize the expiration time dynamically
        // For example, you might want to set the expiration time based on certain conditions
        // For now, you can leave it empty if not needed
    }

    private String generateForgotCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    @Override
    public void initiateForgotPassword(String email) {
        // Check if the user with the provided email exists
        User user = userRepo.findByEmail(email);
        if (user == null) {
            // Handle the case where the user is not found
            throw new UserNotFoundException("User not found for email: " + email);
        }
    
        // Generate the forgot code
        String forgotCode = generateForgotCode();
    
        // Create the forgot code entity
        long expirationTimeInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        ForgotCodeEntity forgotCodeEntity = new ForgotCodeEntity(user, forgotCode, expirationTimeInMillis);
    
        // Store the forgot code in memory
        String userEmail = user.getEmail();
        passwordResetCodes.put(userEmail, forgotCode);
    
        // Save the forgot code to the database
        forgotCodeRepo.save(forgotCodeEntity);
    
        // Send the forgot code via email
        sendForgotCodeViaEmail(userEmail, forgotCode);
    }
    
    
    @Override
    @Transactional
    public String generateAndStoreForgotCode(String userEmail) {
        return generateAndStoreForgotCode(userEmail, getDefaultExpirationTimeInMillis());
    }

    @Override
    @Transactional
    public String generateAndStoreForgotCode(String userEmail, Long expirationTimeInMillis) {
        User user = userRepo.findByEmail(userEmail);

        if (user != null) {
            String generatedCode = generateRandomCode();

            if (expirationTimeInMillis == null) {
                expirationTimeInMillis = getDefaultExpirationTimeInMillis();
            }

            ForgotCodeEntity forgotCodeEntity = new ForgotCodeEntity(user, generatedCode, expirationTimeInMillis);
            forgotCodeRepo.save(forgotCodeEntity);

            return generatedCode;
        } else {
            return "User not found";
        }
    }

    @Override
    @Transactional
    public boolean isForgotCodeValid(String userEmail, String enteredCode) {
        // Retrieve the stored code from the map
        String storedCode = passwordResetCodes.get(userEmail);
    
        if (storedCode != null) {
            // Check if the entered code matches the stored code
            return enteredCode.equals(storedCode);
        }
    
        return false;
    }
    
    
   /*  @Override
    @Transactional
    public void resetPassword(String userEmail, String forgotCode, String newPassword) {
        // Find the user by email
        User user = userRepo.findByEmail(userEmail);
    
        if (user != null) {
            // Find the ForgotCodeEntity associated with the user ID and the provided forgot code
            Optional<ForgotCodeEntity> forgotCodeOptional = forgotCodeRepo.findByUserEmail(userEmail);
            if (forgotCodeOptional.isPresent()) {
                // Forgot code is valid, update the user's password
                user.setPassword(newPassword);
                userRepo.save(user);
    
                // Optionally, you may want to delete the used forgot code from the database
                forgotCodeRepo.delete(forgotCodeOptional.get());
            } else {
                // Handle the case where the forgot code is invalid
                throw new VerificationCodeException("Invalid forgot code");
            }
        } else {
            // Handle the case where the user is not found
            throw new UserNotFoundException("User not found for email: " + userEmail);
        }
    }*/
    
    @Override
    @Transactional
    public void updatePassword(String userEmail, String newPassword) {
        // Find the user by email
        User user = userRepo.findByEmail(userEmail);
    
        if (user != null) {
            // Update the user's password with the hashed password
            user.setPassword(newPassword);
            userRepo.save(user);
        } else {
            // Handle the case where the user is not found
            throw new UserNotFoundException("User not found for email: " + userEmail);
        }
    }

    @Override
    public void resetPassword(String userEmail, String verificationCode, String newPassword) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'resetPassword'");
    }
}
