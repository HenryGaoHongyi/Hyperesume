package com.hyperesume.controller;

import com.hyperesume.model.Education;
import com.hyperesume.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    @Autowired
    private EducationService educationService;

    @GetMapping("/get")
    public List<Education> getEducations() {
        return educationService.findByLoggedInUser();
    }

    @PostMapping("/create")
    public Education createEducation(@RequestBody Education education) {
        return educationService.save(education);
    }

    @PutMapping("/edit/{id}")
    public Education editEducation(@PathVariable Long id, @RequestBody Education education) {
        return educationService.update(id, education);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEducation(@PathVariable Long id) {
        educationService.delete(id);
    }
}
