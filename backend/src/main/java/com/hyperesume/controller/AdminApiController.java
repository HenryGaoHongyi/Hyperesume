package com.hyperesume.controller;

import com.hyperesume.model.User;
import com.hyperesume.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminApiController {

    @Autowired
    private UserService userService;

    /**
     * GET /api/admin/users
     * Returns a JSON list of all users.
     */
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * DELETE /api/admin/users/{id}
     * Deletes a user by ID. Returns a success message or error.
     */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Principal principal) {
        User currentUser = userService.findByUsername(principal.getName());
        if (currentUser != null && currentUser.getId().equals(id)) {
            // Prevent deleting the current logged-in admin
            return ResponseEntity.badRequest().body("CannotDeleteSelf");
        }

        userService.deleteUserById(id);
        return ResponseEntity.ok("UserDeleted");
    }

    /**
     * PUT /api/admin/users/{id}
     * Updates a user. Expects a JSON payload with updated user fields.
     */
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        userService.updateUser(user);
        return ResponseEntity.ok("UserUpdated");
    }

    /**
     * GET /api/admin/users/{id}
     * Returns a single user by ID for editing or viewing details.
     */
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = userService.findUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
}
