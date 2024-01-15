package com.authentication.userAuthentication.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")  // Allow requests from any origin
                .allowedMethods("*")  // Allow all HTTP methods
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true)  // Disable credentials (e.g., cookies, authorization headers)
                .maxAge(3600);  // Set max age for preflight requests caching
    }

}


// //import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// //import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class CorsConfig implements WebMvcConfigurer  {

//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**")
//                 .allowedOrigins("http://localhost:3000")
//                 .allowedMethods("GET");
//     }
//     // @Bean
//     // public WebMvcConfigurer corsConfigurer() {
        
//     //     return new WebMvcConfigurer() {
//     //         @Override
//     //         public void addCorsMappings(CorsRegistry registry) {
//     //             registry
//     //                 .addMapping("/api/v1**")
//     //                 .allowedMethods(CorsConfiguration.ALL)
//     //                 .allowedHeaders(CorsConfiguration.ALL)
//     //                 .allowCredentials(true)
//     //                 .allowedOrigins(CorsConfiguration.ALL);
                    
//     //         }
//     //     };
//     // }

// }