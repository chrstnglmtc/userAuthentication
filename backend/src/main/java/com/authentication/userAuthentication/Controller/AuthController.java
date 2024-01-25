package com.authentication.userAuthentication.Controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.authentication.userAuthentication.Dto.Request.JwtDto;
import com.authentication.userAuthentication.Dto.Request.SignInDto;
import com.authentication.userAuthentication.Dto.Request.SignUpDto;
import com.authentication.userAuthentication.Entity.User;
import com.authentication.userAuthentication.Exceptions.InvalidJwtException;
import com.authentication.userAuthentication.Repo.UserRepo;
import com.authentication.userAuthentication.Service.AuthService;
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
// <-----------WORKING REGISTRATION ENDPOINT----------->
    @PostMapping("/signup")
    public ResponseEntity<JwtDto> signUp(@RequestBody @Valid SignUpDto data) {
        try {
            String accessToken = service.signUp(data);
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

        // Retrieve the user directly from AuthService
        User user = service.getUserByEmail(data.email());

        if (user != null) {
            JwtDto jwtDto = new JwtDto(
                accessToken,
                String.valueOf(user.getUser_id()), // Assuming user_id is a Long or any other numeric type
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


// <-----------WORKING LIST USERS ENDPOINT----------->
    @GetMapping("/users")
    public ResponseEntity<List<User>> listUsers() {
        List<User> users = userRepo.findAll();
        return ResponseEntity.ok(users);
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
    
}