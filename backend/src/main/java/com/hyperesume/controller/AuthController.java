package com.hyperesume.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.hyperesume.model.User;
import com.hyperesume.service.UserService;
import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;
import java.util.Map;
import java.util.HashMap;

@Controller
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam("confirmPassword") String confirmPassword,
            @Valid @ModelAttribute("user") User user,
            BindingResult result,
            Model model) {
        if (result.hasErrors()) {
            return "register";
        }

        // Check if passwords match
        if (!user.getPassword().equals(confirmPassword)) {
            model.addAttribute("passwordMismatch", "Passwords do not match");
            return "register";
        }

        // Set default role if not provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_USER");
        }

        // Check if username already exists
        if (userService.findByUsername(user.getUsername()) != null) {
            result.rejectValue("username", null, "Username already exists");
            return "register";
        }

        userService.saveUser(user);
        return "redirect:/login";
    }

    @GetMapping("/dynamicRedirect")
    public String dynamicRedirect(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {
            return "redirect:/admin"; // Admin dashboard
        } else if (userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_USER"))) {
            return "redirect:/profile"; // User profile
        }
        return "redirect:/login"; // Default fallback
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    /**
     * @author Arundhati Bandopadhyaya
     * @email bandopadhyaya.a@northeastern.edu
     * @param User user object with registration details
     * @return ResponseEntity containing success/error message
     * @since 2024-11-21
     */

//    MOVED TO AuthApiController.java
//    @PostMapping("/api/register")
//    @ResponseBody
//    public ResponseEntity<?> registerUserAPI(@RequestBody User user) {
//        if (userService.findByUsername(user.getUsername()) != null) {
//            return ResponseEntity.badRequest().body("Username already exists");
//        }
//
//        // Just call the service, do not encode here
//        try {
//            userService.saveUser(user);
//            return ResponseEntity.ok("User registered successfully");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.badRequest().body("User registration failed: " + e.getMessage());
//        }
//    }

    /**
     * @author Arundhati Bandopadhyaya
     * @email bandopadhyaya.a@northeastern.edu
     * @param user User object containing login credentials
     * @return ResponseEntity with success/error message
     * @since 2024-11-21
     */

//    MOVED TO AuthApiController.java

}