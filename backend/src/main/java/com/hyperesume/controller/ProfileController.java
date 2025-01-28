package com.hyperesume.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.hyperesume.model.Profile;
import com.hyperesume.service.ProfileService;
import com.hyperesume.service.UserService;
import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;

import java.util.Optional;

@Controller
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public String showProfile(Model model, @AuthenticationPrincipal UserDetails userDetails) {
        // Fetch the logged-in user by username
        Long userId = userService.findByUsername(userDetails.getUsername()).getId();

        // Fetch the profile by userId
        Optional<Profile> optionalProfile = profileService.getProfileByUserId(userId);

        // If profile does not exist, create a new one
        Profile profile = optionalProfile.orElseGet(() -> {
            Profile newProfile = new Profile();
            newProfile.setUserId(userId); // Set the userId for the new profile
            return newProfile;
        });

        // Add the profile to the model
        model.addAttribute("profile", profile);
        return "profile";
    }

    @PostMapping("/profile")
    public String saveProfile(@Valid Profile profile, BindingResult result, @AuthenticationPrincipal UserDetails userDetails) {
        if (result.hasErrors()) {
            return "profile";
        }

        // Fetch the logged-in user's ID
        Long userId = userService.findByUsername(userDetails.getUsername()).getId();

        // Set the userId in the profile
        profile.setUserId(userId);

        // Save the profile
        profileService.saveProfile(profile);

        // Redirect to the profile page
        return "redirect:/profile";
    }
}