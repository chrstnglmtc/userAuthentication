package com.authentication.userAuthentication.Dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    
    @NotEmpty
    private String firstName;
    
    @NotEmpty
    private String lastName;
    
    @NotEmpty(message = "Email should not be empty")
    @Email
    private String email;
    
    @NotEmpty(message = "Password should not be empty")
    private String password;
    
    private String username;
    
    private String role = "STUDENT";

    private byte[] profilePicture;

    // Other fields and methods...

    // Add getter for role
    public String getRole() {
        return role;
    }

    // Add getter and setter for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}