package com.hyperesume.controller;

import com.hyperesume.model.Project;
import com.hyperesume.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/get")
    public List<Project> getProjects() {
        return projectService.findByLoggedInUser();
    }

    @PostMapping("/create")
    public Project createProject(@RequestBody Project project) {
        return projectService.save(project);
    }

    @PutMapping("/edit/{id}")
    public Project editProject(@PathVariable Long id, @RequestBody Project project) {
        return projectService.update(id, project);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectService.delete(id);
    }
}
