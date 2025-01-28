// src/main/java/com/hyperesume/controller/UserApiController.java

package com.hyperesume.controller;

import com.hyperesume.model.User;
import com.hyperesume.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserApiController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        String username = authentication.getName();
        User user = userService.findByUsername(username);
        if (user != null) {
            user.setPassword(null); // Exclude password
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
