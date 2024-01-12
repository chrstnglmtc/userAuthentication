package com.authentication.userAuthentication.Dto;

public class UserDto {

    private Long userId;
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String password;
    private String role;
    private String verifyEmailToken;
    private String image;

    @Override
    public String toString() {
        return "{" +
            " userId='" + getUserId() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", userName='" + getUserName() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", role='" + getRole() + "'" +
            ", verifyEmailToken='" + getVerifyEmailToken() + "'" +
            ", image='" + getImage() + "'" +
            "}";
    }

    public Long getUserId() {
        return userId;
    }


    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public String getFirstName() {
        return firstName;
    }


    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getLastName() {
        return lastName;
    }


    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getUserName() {
        return userName;
    }


    public void setUserName(String userName) {
        this.userName = userName;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }


    public String getVerifyEmailToken() {
        return verifyEmailToken;
    }


    public void setVerifyEmailToken(String verifyEmailToken) {
        this.verifyEmailToken = verifyEmailToken;
    }


    public String getImage() {
        return image;
    }


    public void setImage(String image) {
        this.image = image;
    }


    public UserDto(Long userId, String firstName, String lastName, String userName, String email, String password,
            String role, String verifyEmailToken, String image) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.verifyEmailToken = verifyEmailToken;
        this.image = image;
    }
    

    public UserDto() {
    }

}
