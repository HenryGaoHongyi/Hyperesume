package com.hyperesume.service;

import com.hyperesume.model.Skill;
import com.hyperesume.model.SkillCategory;
import com.hyperesume.repository.SkillCategoryRepository;
import com.hyperesume.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private SkillCategoryRepository skillCategoryRepository;

    public Skill createSkill(Long categoryId, Skill skill) {
        SkillCategory category = skillCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        skill.setCategory(category);
        return skillRepository.save(skill);
    }

    public void deleteSkill(Long categoryId, Long skillId) {
        SkillCategory category = skillCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));
        if (!skill.getCategory().equals(category)) {
            throw new RuntimeException("Skill does not belong to the given category");
        }
        skillRepository.delete(skill);
    }
}
