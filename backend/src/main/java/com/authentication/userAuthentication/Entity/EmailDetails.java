package com.authentication.userAuthentication.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetails {
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
    private String verificationCode;
    private String generatedCode;

    public String getContent() {
        return msgBody;
    }

    public void setContent(String content) {
        this.msgBody = content;
    }
}
