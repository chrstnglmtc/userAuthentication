package com.authentication.userAuthentication.Service.impl;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.authentication.userAuthentication.Dto.LoginDto;
import com.authentication.userAuthentication.Dto.UserDto;
import com.authentication.userAuthentication.Entity.User;
import com.authentication.userAuthentication.Repo.UserRepo;
import com.authentication.userAuthentication.Response.LoginMessage;
import com.authentication.userAuthentication.Service.UserService;


@Service
public class UserIMPL implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserDto userDto) {
        // Hash the password before saving it
        String hashedPassword = passwordEncoder.encode(userDto.getPassword());
        // Generate a verification token (you can use your own logic for this)
        String verificationToken = generateVerificationToken();
        // Create a new User instance with the provided fields
        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUserName(userDto.getUserName());
        user.setEmail(userDto.getEmail());
        user.setPassword(hashedPassword);  // Set the hashed password
        user.setRole(userDto.getRole());
        user.setVerifyEmailToken(verificationToken);
        user.setImage(userDto.getImage());

        // Save the user
        userRepo.save(user);

        // Return the username
        return user.getUserName();
    }

    private String generateVerificationToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] tokenBytes = new byte[32];
        secureRandom.nextBytes(tokenBytes);

        // Encode the random bytes to a Base64 string
        return Base64.getEncoder().encodeToString(tokenBytes);
    }

    UserDto userDto;
    @Override
    public LoginMessage loginUser(LoginDto loginDto) {
        Optional<User> user = userRepo.findByEmail(loginDto.getEmail());
        
        if (user.isPresent()) {
            // Compare the provided password with the hashed password in the database
            if (passwordEncoder.matches(loginDto.getPassword(), user.get().getPassword())) {
                return new LoginMessage("Login Success", true);
            } else {
                return new LoginMessage("Login Failed: Incorrect password", false);
            }
        } else {
            return new LoginMessage("Email does not exist", false);
        }
    }
}
