package com.hyperesume.service;

import com.hyperesume.model.Project;
import com.hyperesume.model.User;
import com.hyperesume.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    public List<Project> findByLoggedInUser() {
        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
        return projectRepository.findByUserId(userId);
    }

    public Project save(Project project) {
        Long userId = getLoggedInUserId();
        project.setUserId(userId);
        return projectRepository.save(project);
    }

    private Long getLoggedInUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userService.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found for username: " + username);
        }

        return user.getId();
    }

    public Project update(Long id, Project project) {
        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        existingProject.setName(project.getName());
        existingProject.setDate(project.getDate());
        existingProject.setDescription(project.getDescription());
        return projectRepository.save(existingProject);
    }

    public void delete(Long id) {
        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        projectRepository.delete(existingProject);
    }
}
