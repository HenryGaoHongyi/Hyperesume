package com.hyperesume.controller;

import com.hyperesume.model.Skill;
import com.hyperesume.model.SkillCategory;
import com.hyperesume.service.SkillService;
import com.hyperesume.service.SkillCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @Autowired
    private SkillCategoryService skillCategoryService;

    @GetMapping("/get")
    public List<SkillCategory> getSkills() {
        return skillCategoryService.findAllWithSkills();
    }

    @PostMapping("/createCategory")
    public SkillCategory createCategory(@RequestBody SkillCategory skillCategory) {
        return skillCategoryService.save(skillCategory);
    }

    @PostMapping("/createASkill/{categoryId}")
    public Skill createSkill(@PathVariable Long categoryId, @RequestBody Skill skill) {
        return skillService.createSkill(categoryId, skill);
    }

    @DeleteMapping("/deleteCategory/{categoryId}")
    public void deleteCategory(@PathVariable Long categoryId) {
        skillCategoryService.deleteById(categoryId);
    }

    @DeleteMapping("/deleteASkill/{categoryId}/{skillId}")
    public void deleteSkill(@PathVariable Long categoryId, @PathVariable Long skillId) {
        skillService.deleteSkill(categoryId, skillId);
    }
}
