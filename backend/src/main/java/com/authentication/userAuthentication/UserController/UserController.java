package com.authentication.userAuthentication.UserController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.authentication.userAuthentication.Dto.UserDto;
import com.authentication.userAuthentication.Dto.Request.LoginDto;
import com.authentication.userAuthentication.Dto.Request.RegisterDto;
import com.authentication.userAuthentication.Dto.Response.LoginMessage;
import com.authentication.userAuthentication.Repo.UserRepo;
import com.authentication.userAuthentication.Service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RequestMapping("/api/v1")
@RestController
@CrossOrigin("http://localhost:3000")


public class UserController {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


// <-----------WORKING REGISTRATION ENDPOINT----------->

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDto registerDto) {
        userService.registerUser(registerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

// <-----------WORKING LIST USERS ENDPOINT----------->

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        try {
            List<UserDto> users = userService.getAllUsers();
    
            if (!users.isEmpty()) {
                return ResponseEntity.ok(users);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions appropriately
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

// <-----------WORKING LOGIN ENDPOINT, NO SESSION----------->

@PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
    LoginMessage loginMessage = userService.loginUser(loginDto);

    if (loginMessage.isSuccess()) {
        return ResponseEntity.ok(loginMessage);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginMessage);
    }
}

// <-----------WORKING LOGOUT ENDPOINT, NO SESSION----------->

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok("Logout successful");
    }

// <-----------WORKING GET USER ENDPOINT----------->    

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        try {
            UserDto userDto = userService.findUserById(userId);

            if (userDto != null) {
                return ResponseEntity.ok(userDto);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions appropriately
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

// <-----------WORKING EMAIL ENDPOINT----------->  

    @PutMapping("/update/{email}")
    public ResponseEntity<?> updateUserByEmail(@PathVariable String email, @RequestBody UserDto updateUserDto) {
        try {
            // Continue with updating the user
            UserDto existingUser = userService.findUserByEmail(email);
            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            // Update the user's information
            existingUser.setFirstName(updateUserDto.getFirstName());
            existingUser.setLastName(updateUserDto.getLastName());
            existingUser.setUserName(updateUserDto.getUserName());
            existingUser.setEmail(updateUserDto.getEmail());

            // Hash the new password before updating
            String newPassword = updateUserDto.getPassword();
            if (newPassword != null && !newPassword.isEmpty()) {
                String hashedPassword = passwordEncoder.encode(newPassword);
                existingUser.setPassword(hashedPassword);
            }

            // Call the service to update the user in the database
            userService.updateUser(existingUser);

            return ResponseEntity.ok("User information updated successfully");
        } catch (Exception e) {
            // Handle exceptions appropriately
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
// // <-----------UPDATE USER BY ID----------->  

//     @PutMapping("/update")
//     public ResponseEntity<?> updateUser(@RequestBody UserDto updateUserDto) {
//         // Check if the user ID is null
//         Long userId = updateUserDto.getUserId();
//         if (userId == null) {
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID cannot be null");
//         }
    
//         // Continue with updating the user
//         UserDto existingUser = userService.findUserById(userId);
//         if (existingUser == null) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//         }
        
//         // Update the user's information
//         existingUser.setFirstName(updateUserDto.getFirstName());
//         existingUser.setLastName(updateUserDto.getLastName());
//         existingUser.setUserName(updateUserDto.getUserName());
//         existingUser.setEmail(updateUserDto.getEmail());
//         existingUser.setPassword(updateUserDto.getPassword()); // You might want to handle password updates more securely
    
//         // Call the service to update the user in the database
//         userService.updateUser(existingUser);
    
//         return ResponseEntity.ok("User information updated successfully");
//     }

