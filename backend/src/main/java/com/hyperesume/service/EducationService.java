package com.hyperesume.service;

import com.hyperesume.model.Education;
import com.hyperesume.model.User;
import com.hyperesume.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private UserService userService;

    public List<Education> findByLoggedInUser() {
        Long userId = getLoggedInUserId();
        return educationRepository.findByUser_Id(userId);
    }

    public Education save(Education education) {
        Long userId = getLoggedInUserId();
        education.setUserId(userId);
        return educationRepository.save(education);
    }

    private Long getLoggedInUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userService.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found for username: " + username);
        }

        return user.getId();
    }

    public Education update(Long id, Education education) {
        Education existingEducation = educationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found"));
        existingEducation.setSchool(education.getSchool());
        existingEducation.setDegree(education.getDegree());
        existingEducation.setGraduationDate(education.getGraduationDate());
        return educationRepository.save(existingEducation);
    }

    public void delete(Long id) {
        Education existingEducation = educationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found"));
        educationRepository.delete(existingEducation);
    }
}
