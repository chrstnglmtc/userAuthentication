package com.authentication.userAuthentication.Entity;

import com.authentication.userAuthentication.Entity.Enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.EnumSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String userName;

    @Column(nullable = false)
    private String password;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Set<Role> role;

        public void setRole(String role) {
        // Convert the String to a Role enum and add it to the Set
        this.role = EnumSet.of(Role.valueOf(role));
    }
}


// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;

// @Entity
// @Table(name="user")

// public class User {

//     @Id
//     @Column(name="userId", length = 45)
//     @GeneratedValue(strategy =  GenerationType.AUTO)
//     private Long userId;

//     @Column(name="firstName", length = 255)
//     private String firstName;

//     @Column(name="lastName", length = 255)
//     private String lastName;

//     @Column(name="userName", length = 255)
//     private String userName;

//     @Column(name="email", length = 255)
//     private String email;

//     @Column(name = "password", length = 255)
//     private String password;

//     @Column(name = "role", length = 255)
//     private String role;

//     @Column(name = "verifyEmailToken", length = 255)
//     private String verifyEmailToken;

//     @Column(name = "image", length = 255)
//     private String image;

//     public User() {
//         this.userId = null; // or initialize it to some default value
//         this.firstName = null;
//         this.lastName = null;
//         this.userName = null;
//         this.email = null;
//         this.password = null;
//         this.role = null;
//         this.verifyEmailToken = null;
//         this.image = null;
//     }
    


//     public Long getUserId() {
//         return this.userId;
//     }

//     public void setUserId(Long userId) {
//         this.userId = userId;
//     }

//     public String getFirstName() {
//         return this.firstName;
//     }

//     public void setFirstName(String firstName) {
//         this.firstName = firstName;
//     }

//     public String getLastName() {
//         return this.lastName;
//     }

//     public void setLastName(String lastName) {
//         this.lastName = lastName;
//     }

//     public String getUserName() {
//         return this.userName;
//     }

//     public void setUserName(String userName) {
//         this.userName = userName;
//     }

//     public String getEmail() {
//         return this.email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     public String getPassword() {
//         return this.password;
//     }

//     public void setPassword(String password) {
//         this.password = password;
//     }

//     public String getRole() {
//         return this.role;
//     }

//     public void setRole(String role) {
//         this.role = role;
//     }

//     public String getVerifyEmailToken() {
//         return this.verifyEmailToken;
//     }

//     public void setVerifyEmailToken(String verifyEmailToken) {
//         this.verifyEmailToken = verifyEmailToken;
//     }

//     public String getImage() {
//         return this.image;
//     }

//     public void setImage(String image) {
//         this.image = image;
//     }


//     @Override
//     public String toString() {
//         return "{" +
//             " userId='" + getUserId() + "'" +
//             ", firstName='" + getFirstName() + "'" +
//             ", lastName='" + getLastName() + "'" +
//             ", userName='" + getUserName() + "'" +
//             ", email='" + getEmail() + "'" +
//             ", password='" + getPassword() + "'" +
//             ", role='" + getRole() + "'" +
//             ", verifyEmailToken='" + getVerifyEmailToken() + "'" +
//             ", image='" + getImage() + "'" +
//             "}";
//     }


// }
