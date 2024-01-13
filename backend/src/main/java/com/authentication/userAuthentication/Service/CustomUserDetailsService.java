package com.authentication.userAuthentication.Service;

import com.authentication.userAuthentication.Dto.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserService userService;

    // Setter method for UserService
    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Load user details from your UserService
        UserDto userDto = userService.getUserByUsername(username);
        if (userDto == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // You may need to adapt this based on your UserDto structure
        return org.springframework.security.core.userdetails.User.builder()
                .username(userDto.getUserName())
                .password(userDto.getPassword())
                .roles(userDto.getRole())
                .build();
    }
}
