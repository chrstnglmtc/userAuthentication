package com.authentication.userAuthentication.Controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.authentication.userAuthentication.Dto.UserDto;
import com.authentication.userAuthentication.Dto.Request.JwtDto;
import com.authentication.userAuthentication.Dto.Request.SignInDto;
import com.authentication.userAuthentication.Dto.Request.SignUpDto;
import com.authentication.userAuthentication.Dto.Request.UpdateUserDto;
import com.authentication.userAuthentication.Entity.EmailDetails;
import com.authentication.userAuthentication.Entity.User;
import com.authentication.userAuthentication.Exceptions.InvalidJwtException;
import com.authentication.userAuthentication.Repo.UserRepo;
import com.authentication.userAuthentication.Service.AuthService;
import com.authentication.userAuthentication.Service.EmailService;
import com.authentication.userAuthentication.Service.TokenProvider;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService service;

    @Autowired
    private TokenProvider tokenService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EmailService emailService;

// <-----------WORKING REGISTRATION ENDPOINT----------->
@PostMapping("/signup")
public ResponseEntity<JwtDto> signUp(@RequestBody @Valid SignUpDto data) {
    try {
        // Perform user registration and get the user details
        String accessToken = service.signUp(data);

        // Generate and store the verification code
        long expirationTime = System.currentTimeMillis() + (30 * 1000); // 30 seconds
        String verificationCode = emailService.generateAndStoreVerificationCode(data.getEmail(), expirationTime);

        // Customize the email content or subject if needed
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(data.getEmail());
        emailDetails.setGeneratedCode(verificationCode);
        emailDetails.setSubject("Verification Code");
        emailDetails.setContent("Your verification code is: " + verificationCode);

        // Send the verification code via email
        emailService.sendSimpleMail(emailDetails);

        // Return the access token in the response
        return ResponseEntity.ok(new JwtDto(accessToken));
    } catch (InvalidJwtException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}


// <-----------WORKING LOGIN ENDPOINT W/ SESSION----------->
@PostMapping("/signin")
public ResponseEntity<JwtDto> signIn(@RequestBody @Valid SignInDto data) {
    try {
        String accessToken = service.signIn(data.email(), data.password());
        User user = service.getUserByEmail(data.email());

        if (user != null) {
            JwtDto jwtDto = new JwtDto(
                accessToken,
                String.valueOf(user.getUser_id()),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
            );

            return ResponseEntity.ok(jwtDto);
        } else {
            // Handle the case where the user is not found
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    } catch (InvalidJwtException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
// <-----------GET USER ENDPOINT----------->
    @GetMapping("/user")
    public ResponseEntity<User> getUserData() {
        // Get the authenticated user's email from the SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        // Retrieve user data based on email
        User user = userRepo.findByEmail(userEmail);

        if (user != null) {
            // Return user data
            return ResponseEntity.ok(user);
        } else {
            // Handle the case where user data is not found
            return ResponseEntity.notFound().build();
        }
    }

// <-----------WORKING LIST USERS ENDPOINT----------->
    @GetMapping("/users")
    public ResponseEntity<List<User>> listUsers() {
        List<User> users = userRepo.findAll();
        return ResponseEntity.ok(users);
    }

// <-----------GET USER ENDPOINT----------->
    @GetMapping("/users/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        Optional<User> optionalUser = userRepo.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            UserDto userDto = new UserDto();
            BeanUtils.copyProperties(user, userDto);
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

// <-----------NEW UPDATE ENDPOINT----------->
    @PutMapping("/update/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody @Valid UpdateUserDto updateData) {
        try {
            // Retrieve the user by userId
            User existingUser = userRepo.findById(userId).orElse(null);

            if (existingUser != null) {
                // Update user information with the data from the request
                existingUser.setFirstName(updateData.getFirstName());
                existingUser.setLastName(updateData.getLastName());
                existingUser.setUserName(updateData.getUserName());
                // Add more fields as needed

                // Save the updated user
                User updatedUser = userRepo.save(existingUser);

                return ResponseEntity.ok(updatedUser);
            } else {
                // Handle the case where the user is not found
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle any exceptions (e.g., validation errors)
            return ResponseEntity.badRequest().build();
        }
    }
// <-----------WORKING LOGOUT ENDPOINT W/ SESSION----------->    
  @DeleteMapping("/logout")
  public ResponseEntity<String> logout(HttpServletRequest request) {
      // Extract the token from the request
      String token = tokenService.extractTokenFromRequest(request);
      // Check if the token is valid before invalidating
      if (token != null) {
          // Invalidate the token (add it to a blacklist or revocation list)
          tokenService.invalidateToken(token);
          return ResponseEntity.status(HttpStatus.OK).body("Logout successful");
      } else {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
      }
  }

// <-----------UPLOAD PROFILE PICTURE ENDPOINT----------->
@PostMapping("/upload-pp")
public ResponseEntity<String> uploadProfilePicture(@RequestParam("userId") Long userId,
                                                  @RequestParam("file") MultipartFile file) {
    try {
        // Retrieve the user by userId
        User user = userRepo.findById(userId).orElse(null);

        if (user != null) {
            // Save the profile picture
            user.setProfilePicture(file.getBytes());
            userRepo.save(user);

            // Log the profile picture data
            System.out.println("Profile Picture Data: " + Arrays.toString(user.getProfilePicture()));

            return ResponseEntity.ok("Profile picture uploaded successfully");
        } else {
            // Handle the case where the user is not found
            return ResponseEntity.notFound().build();
        }
    } catch (IOException e) {
        // Handle IOException (e.g., failed to read profile picture bytes)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture");
    }
}

    
}