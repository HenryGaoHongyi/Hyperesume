package com.hyperesume.service;

import com.hyperesume.model.Experience;
import com.hyperesume.model.User;
import com.hyperesume.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private UserService userService;

    public List<Experience> findByLoggedInUser() {
        Long userId = getLoggedInUserId();
        return experienceRepository.findByUser_Id(userId);
    }

    private Long getLoggedInUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userService.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found for username: " + username);
        }

        return user.getId();
    }


    public Experience save(Experience experience) {
        Long userId = getLoggedInUserId();
        experience.setUserId(userId);
        return experienceRepository.save(experience);
    }

    public Experience update(Long id, Experience experience) {
        Experience existingExperience = experienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Experience not found"));
        existingExperience.setCompany(experience.getCompany());
        existingExperience.setRole(experience.getRole());
        existingExperience.setLocation(experience.getLocation());
        existingExperience.setStartDate(experience.getStartDate());
        existingExperience.setEndDate(experience.getEndDate());
        existingExperience.setResponsibilities(experience.getResponsibilities());
        return experienceRepository.save(existingExperience);
    }

    public void delete(Long id) {
        Experience existingExperience = experienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Experience not found"));
        experienceRepository.delete(existingExperience);
    }

    // New method to save an experience
    public Experience saveExperience(Experience experience) {
        return save(experience);
    }

    // New method to get an experience by ID
    public Experience getExperienceById(Long id) {
        return experienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Experience not found"));
    }

    // New method to delete an experience
    public void deleteExperience(Long id) {
        delete(id);
    }
}
