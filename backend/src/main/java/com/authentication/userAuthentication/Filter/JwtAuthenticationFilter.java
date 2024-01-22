// package com.authentication.userAuthentication.Filter;

// import java.io.IOException;

// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import com.authentication.userAuthentication.Service.JwtService;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import lombok.RequiredArgsConstructor;

// @Component
// @RequiredArgsConstructor
// public class JwtAuthenticationFilter extends OncePerRequestFilter {
//     private final UserDetailsService userDetailsService;
//     private final JwtService jwtService;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//             throws ServletException, IOException {

//         final String userEmail;
//         String token = null;

//         if (request.getCookies() != null) {
//             for (Cookie cookie : request.getCookies()) {
//                 if (cookie.getName().equals("accessToken")) {
//                     token = cookie.getValue();
//                 }
//             }
//         }


//         if (token == null) {
//             filterChain.doFilter(request, response);
//             return;
//         }

//         userEmail = jwtService.extractUsername(token);

//         if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//             UserDetails user = this.userDetailsService.loadUserByUsername(userEmail);
//             if (jwtService.isTokenValid(token, user)) {
//                 UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user,null,
//                         user.getAuthorities());
//                 authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                 SecurityContextHolder.getContext().setAuthentication(authToken);
//             }
//             filterChain.doFilter(request, response);
//         }

//     }
// }













//OLD CONFIGURATION

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
