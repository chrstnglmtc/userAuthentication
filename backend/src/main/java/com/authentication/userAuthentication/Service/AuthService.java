package com.authentication.userAuthentication.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.authentication.userAuthentication.Dto.Request.SignUpDto;
import com.authentication.userAuthentication.Entity.User;
import com.authentication.userAuthentication.Entity.Enums.Role;
import com.authentication.userAuthentication.Exceptions.InvalidJwtException;
import com.authentication.userAuthentication.Repo.UserRepo;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TokenProvider tokenProvider;

    @Override
    public UserDetails loadUserByUsername(String username) {
        var user = userRepo.findByEmail(username);
        return user;
    }

    public String signUp(SignUpDto data) throws InvalidJwtException {
        if (userRepo.findByEmail(data.email()) != null) {
            throw new InvalidJwtException("Email already exists");
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.email(), data.userName(), encryptedPassword, data.firstName(), data.lastName(), Role.STUDENT);
        userRepo.save(newUser);

        // Generate and return access token after successful sign-up
        return tokenProvider.generateAccessToken(newUser);
    }

    public String signIn(String email, String password) throws InvalidJwtException {
        var user = userRepo.findByEmail(email);

        if (user == null || !new BCryptPasswordEncoder().matches(password, user.getPassword())) {
            throw new InvalidJwtException("Invalid email or password");
        }

        // Generate and return access token after successful sign-in
        return tokenProvider.generateAccessToken(user);
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public void updateUserVerificationStatus(String email, boolean isVerified) {
        User user = userRepo.findByEmail(email);
        if (user != null) {
            user.setIsVerified(isVerified);
            userRepo.save(user);
        }
    }
}