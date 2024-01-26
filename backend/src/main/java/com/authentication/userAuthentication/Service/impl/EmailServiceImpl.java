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

    private final Map<String, String> generatedCodeStorage = new HashMap<>();
    private final Map<String, String> enteredCodeStorage = new HashMap<>();

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

    @Override
    public String generateAndStoreVerificationCode(String userEmail) {
        String generatedCode = generateRandomCode();
        storeVerificationCodeForUser(userEmail, generatedCode);
        generatedCodeStorage.put(userEmail, generatedCode);
        return generatedCode;
    }

    @Override
    public boolean verifyCode(String generatedCode, String enteredCode) {
        String storedCode = getStoredCode(generatedCode);
        return enteredCode.equals(storedCode);
    }

    @Override
    public String getStoredCodeForUser(String generatedCode) {
        return generatedCodeStorage.getOrDefault(generatedCode, "");
    }

    @Override
    public String getEnteredCodeForUser(String verificationCode) {
        return enteredCodeStorage.getOrDefault(verificationCode, "");
    }

    private void storeVerificationCodeForUser(String userEmail, String generatedCode) {
        generatedCodeStorage.put(userEmail, generatedCode);
    }

    private String getStoredCode(String userEmail) {
        return generatedCodeStorage.getOrDefault(userEmail, "");
    }

    private String generateRandomCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    @Override
    public void storeEnteredCode(String verificationCode, String enteredCode) {
        enteredCodeStorage.put(verificationCode, enteredCode);
    }
}
