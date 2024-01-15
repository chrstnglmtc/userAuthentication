package com.authentication.userAuthentication.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SecurityConfig {


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
}



//BROKEN CODE BELOW

// package com.authentication.userAuthentication.Config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Lazy;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import com.authentication.userAuthentication.Filter.JwtAuthenticationFilter;

// import static org.springframework.security.config.Customizer.withDefaults;

// import org.springframework.beans.factory.annotation.Autowired;


// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity
// public class SecurityConfig {

//     private final UserDetailsService userDetailsService;

//     @Autowired
//     public SecurityConfig(UserDetailsService userDetailsService) {
//         this.userDetailsService = userDetailsService;
//     }

//     @Bean
//     public BCryptPasswordEncoder bCryptPasswordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Lazy
//     @Bean
//     public JwtAuthenticationFilter jwtAuthenticationFilter(AuthenticationProvider authenticationProvider) {
//         return new JwtAuthenticationFilter(authenticationProvider);
//     }

//     @Bean
//     public AuthenticationProvider authenticationProvider() {
//         DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//         provider.setUserDetailsService(userDetailsService);
//         provider.setPasswordEncoder(bCryptPasswordEncoder());
//         return provider;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//                 .csrf(csrf -> csrf.disable())
//                 .cors(withDefaults())
//                 .addFilterBefore(jwtAuthenticationFilter(authenticationProvider()), UsernamePasswordAuthenticationFilter.class)
//                 .authorizeRequests(authorize -> authorize
//                                 .requestMatchers("/register", "/auth").permitAll()
//                                 .anyRequest().authenticated()
//                 )
//                 .sessionManagement(session -> session
//                                 .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                 )
//                 .authenticationProvider(authenticationProvider());

//         return http.build();
//     }
    
// }
