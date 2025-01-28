package com.hyperesume.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.hyperesume.model.User;
import com.hyperesume.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthApiController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @PostMapping("/login")
//    @ResponseBody
//    public ResponseEntity<?> loginUser(@RequestBody User user) {
//        User existingUser = userService.findByUsername(user.getUsername());
//
//        if (existingUser == null) {
//            return ResponseEntity.badRequest().body("User not found");
//        }
//
//        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
//            return ResponseEntity.badRequest().body("Invalid Password");
//        }
//
//        UsernamePasswordAuthenticationToken authRequest =
//                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
//
//        Authentication authentication = authenticationManager.authenticate(authRequest);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        System.out.println("Authenticated user: "
//                + SecurityContextHolder.getContext().getAuthentication().getName()
//                + "Authority: " + SecurityContextHolder.getContext().getAuthentication().getAuthorities()
//        );
//
////        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
////        System.out.println("Authenticated user: " + auth.getName());
////        auth.getAuthorities().forEach(a -> System.out.println("Authority: " + a.getAuthority()));
//
//
//        Map<String, Object> userData = new HashMap<>();
//        userData.put("id", existingUser.getId());
//        userData.put("username", existingUser.getUsername());
//        userData.put("role", existingUser.getRole());
//
//        return ResponseEntity.ok(userData);
//    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest, HttpServletRequest request) {
        try {
            // Create authentication token
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());

            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(authToken);

            // Set the authentication in the security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Create a session and store the security context
            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            // Retrieve the authenticated user
            User user = (User) authentication.getPrincipal();
            user.setPassword(null); // Remove password from response

            return ResponseEntity.ok(user);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<?> registerUserAPI(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        System.out.println("User details: " + user.getUsername() + ", " + user.getRole());

        // Just call the service, do not encode here
        try {
            userService.saveUser(user);
            System.out.println("UserService.saveUser completed successfully.");
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception while saving user: " + e.getMessage());
            return ResponseEntity.badRequest().body("User registration failed: " + e.getMessage());
        }

    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String username = authentication.getName();
        User user = userService.findByUsername(username);
        if (user == null || !user.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        List<User> users = userService.getAllUsers();
        users.forEach(u -> u.setPassword(null));  // Exclude passwords

        return ResponseEntity.ok(users);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }
    //wtf

}
