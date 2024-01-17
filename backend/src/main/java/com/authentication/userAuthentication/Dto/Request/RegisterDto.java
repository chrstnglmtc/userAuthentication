package com.authentication.userAuthentication.Dto.Request;

import com.authentication.userAuthentication.Entity.Enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class RegisterDto {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
    // private String firstName;
    // private String lastName;
    // private String userName;
    // private String email;
    // private String password;

    // public String getFirstName() {
    //     return firstName;
    // }
    // public void setFirstName(String firstName) {
    //     this.firstName = firstName;
    // }
    // public String getLastName() {
    //     return lastName;
    // }
    // public void setLastName(String lastName) {
    //     this.lastName = lastName;
    // }
    // public String getUserName() {
    //     return userName;
    // }
    // public void setUserName(String userName) {
    //     this.userName = userName;
    // }
    // public String getEmail() {
    //     return email;
    // }
    // public void setEmail(String email) {
    //     this.email = email;
    // }
    // public String getPassword() {
    //     return password;
    // }
    // public void setPassword(String password) {
    //     this.password = password;
    // }

    // public RegisterDto(String firstName, String lastName, String userName, String email, String password) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.userName = userName;
    //     this.email = email;
    //     this.password = password;
    // }
}