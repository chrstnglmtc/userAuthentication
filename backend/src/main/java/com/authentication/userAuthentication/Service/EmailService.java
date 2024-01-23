package com.authentication.userAuthentication.Service;

import com.authentication.userAuthentication.Entity.EmailDetails;

public interface EmailService {
    String sendSimpleMail(EmailDetails details);

    String sendMailWithAttachment(EmailDetails details);
}