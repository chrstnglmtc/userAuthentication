package com.authentication.userAuthentication.Dto.Request;

import com.authentication.userAuthentication.Entity.Enums.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


public record SignUpDto(
        @Email String email,
        @NotBlank @Size(min = 8) String password,
        @NotBlank String firstName,
        @NotBlank String lastName,
        @NotBlank String userName,
        @NotBlank @Pattern(regexp = "09\\d{9}") String phoneNumber,
        Role role
) {
    // Add a getter for email
    public String getEmail() {
        return email;
    }

    public String getUserName() {
        return userName;
    }

    public Role getRole() {
        return role;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}