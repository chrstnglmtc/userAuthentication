// package com.authentication.userAuthentication.Filter;

// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// import com.authentication.userAuthentication.Security.JwtAuthenticationToken;

// import java.io.IOException;

// public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

//     private final AuthenticationProvider authenticationProvider;

//     public JwtAuthenticationFilter(AuthenticationProvider authenticationProvider) {
//         this.authenticationProvider = authenticationProvider;
//         setFilterProcessesUrl("/login");  // Specify the login endpoint URL
//     }

//     @Override
//     public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
//         String token = extractToken(request);
//         JwtAuthenticationToken jwtAuthenticationToken = new JwtAuthenticationToken(token);
//         return authenticationProvider.authenticate(jwtAuthenticationToken);
//     }

//     private String extractToken(HttpServletRequest request) {
//         // Implement your logic to extract the token from the request (e.g., from headers)
//         // Return the extracted token
//         String authorizationHeader = request.getHeader("Authorization");

//         if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//             return authorizationHeader.substring(7); // Extract the token excluding "Bearer "
//         }
//         return null;
//     }

//     @Override
//     protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
//                                             FilterChain chain, Authentication authResult) throws IOException, ServletException {
//         super.successfulAuthentication(request, response, chain, authResult);
//         chain.doFilter(request, response);
//     }
// }
