// package com.authentication.userAuthentication.Service;

// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.authentication.userAuthentication.Dto.UserDto;

// @Service
// public class CustomUserDetailsService implements UserDetailsService {

//     private final UserService userService;  // Assuming you have a UserService

//     public CustomUserDetailsService(UserService userService) {
//         this.userService = userService;
//     }

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         // Load user details by username (in this case, by email)
//         UserDto userDto = userService.findUserByEmail(username);

//         if (userDto == null) {
//             throw new UsernameNotFoundException("User not found with username: " + username);
//         }

//         // Create a UserDetails object based on your UserDto
//         return org.springframework.security.core.userdetails.User.builder()
//                 .username(userDto.getEmail())
//                 .password(userDto.getPassword()) // Make sure the password is hashed
//                 .roles(userDto.getRole())
//                 .build();
//     }
// }
