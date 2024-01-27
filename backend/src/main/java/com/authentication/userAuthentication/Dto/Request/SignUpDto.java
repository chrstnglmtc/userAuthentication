package com.authentication.userAuthentication.Dto.Request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.authentication.userAuthentication.Entity.Enums.Role;

public record SignUpDto(
    @Email String email,
    @NotBlank @Size(min = 8) String password,
    @NotBlank String firstName,
    @NotBlank String lastName,
    @NotBlank String userName,
    Role role
) {
    // Add a getter for email
    public String getEmail() {
        return email;
    }
}