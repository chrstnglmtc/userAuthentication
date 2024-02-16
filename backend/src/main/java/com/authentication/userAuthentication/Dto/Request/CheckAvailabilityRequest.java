package com.authentication.userAuthentication.Dto.Request;

public class CheckAvailabilityRequest {
    private String username;
    private String email;

    // Getter and Setter

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Constructors
    public CheckAvailabilityRequest(String username) {
        this.username = username;
    }

    public CheckAvailabilityRequest(String username, String email) {
        this.username = username;
        this.email = email;
    }
}
