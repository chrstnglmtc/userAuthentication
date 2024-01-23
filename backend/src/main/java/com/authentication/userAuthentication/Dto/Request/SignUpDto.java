package com.authentication.userAuthentication.Dto.Request;

import com.authentication.userAuthentication.Entity.Enums.Role;

public record SignUpDto(
    String email,
    String password,
    String firstName,
    String lastName,
    String userName,
    Role role
) {
}