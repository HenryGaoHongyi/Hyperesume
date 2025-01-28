package com.hyperesume.service;

import com.hyperesume.model.SkillCategory;
import com.hyperesume.repository.SkillCategoryRepository;
import com.hyperesume.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillCategoryService {

    @Autowired
    private SkillCategoryRepository skillCategoryRepository;

    @Autowired
    private SkillRepository skillRepository;

    public List<SkillCategory> findAll() {
        return skillCategoryRepository.findAll();
    }

    public List<SkillCategory> findAllWithSkills() {
        List<SkillCategory> categories = skillCategoryRepository.findAll();
        for (SkillCategory category : categories) {
            category.setSkills(skillRepository.findByCategoryId(category.getId()));
        }
        return categories;
    }

    public SkillCategory findById(Long id) {
        return skillCategoryRepository.findById(id).orElse(null);
    }

    public SkillCategory save(SkillCategory skillCategory) {
        return skillCategoryRepository.save(skillCategory);
    }

    public void deleteById(Long id) {
        skillCategoryRepository.deleteById(id);
    }
}
