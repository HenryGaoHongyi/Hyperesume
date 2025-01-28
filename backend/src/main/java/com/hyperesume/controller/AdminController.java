package com.hyperesume.controller;

import com.hyperesume.model.User;
import com.hyperesume.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping
    public String adminDashboard(Model model) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
        return "admin";
    }

    // Display the edit user form
    @GetMapping("/edit/{id}")
    public String showEditUserForm(@PathVariable Long id, Model model) {
        User user = userService.findUserById(id);
        if (user == null) {
            // Handle user not found scenario
            return "redirect:/admin?error=UserNotFound";
        }
        model.addAttribute("user", user);
        return "edit-user"; // Return the edit-user.html template
    }

    // Process the edit user form
    @PostMapping("/edit/{id}")
    public String updateUser(@PathVariable Long id, @ModelAttribute User user) {
        // Set the user ID to ensure the correct user is updated
        user.setId(id);
        userService.updateUser(user);
        return "redirect:/admin?success=UserUpdated";
    }

    // Handle delete requests
    @PostMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id, Principal principal) {
        User currentUser = userService.findByUsername(principal.getName());
        if (currentUser.getId().equals(id)) {
            // Prevent self-deletion
            return "redirect:/admin?error=CannotDeleteSelf";
        }
        userService.deleteUserById(id);
        return "redirect:/admin?success=UserDeleted";
    }
}
