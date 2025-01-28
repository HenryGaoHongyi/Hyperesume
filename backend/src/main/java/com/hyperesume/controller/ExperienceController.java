package com.hyperesume.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.hyperesume.model.Experience;
import com.hyperesume.service.ExperienceService;
import com.hyperesume.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;

@Controller
@RequestMapping("/experience")
public class ExperienceController {

    @Autowired
    private ExperienceService experienceService;

    @Autowired
    private UserService userService;

    @GetMapping("/add")
    public String showAddExperienceForm(Model model) {
        model.addAttribute("experience", new Experience());
        return "add-experience";
    }

    @PostMapping("/add")
    public String addExperience(@Valid Experience experience, BindingResult result, @AuthenticationPrincipal UserDetails userDetails) {
        if (result.hasErrors()) {
            return "add-experience";
        }

        // Get user ID from logged-in user details
        Long userId = userService.findByUsername(userDetails.getUsername()).getId();
        experience.setUserId(userId); // Set the userId for the experience

        experienceService.saveExperience(experience);
        return "redirect:/profile"; // Redirect to the profile page
    }

    @GetMapping("/edit/{id}")
    public String showEditExperienceForm(@PathVariable Long id, Model model) {
        Experience experience = experienceService.getExperienceById(id);
        model.addAttribute("experience", experience);
        return "edit-experience";
    }

    @PostMapping("/edit/{id}")
    public String editExperience(@PathVariable Long id, @Valid Experience experience, BindingResult result) {
        if (result.hasErrors()) {
            return "edit-experience";
        }
        experience.setId(id);
        experienceService.saveExperience(experience);
        return "redirect:/profile";
    }

    @GetMapping("/delete/{id}")
    public String deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return "redirect:/profile";
    }
}