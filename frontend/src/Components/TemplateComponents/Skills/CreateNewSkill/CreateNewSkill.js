// CreateNewSkill.js
import React, { useState } from 'react';
import deleteBtn from '../../../../Assets/icons/deleteBtn.png';

export const CreateNewSkill = ({ onSkillUpdate, setShowSkillForm, existingCategories }) => {
    const [skillData, setSkillData] = useState({
        category: '',
        skills: ['']  // Start with one empty skill
    });
    
    const [useExistingCategory, setUseExistingCategory] = useState(true);

    const handleCategoryChange = (e) => {
        setSkillData(prev => ({
            ...prev,
            category: e.target.value
        }));
    };

    const handleSkillChange = (index, value) => {
        setSkillData(prev => ({
            ...prev,
            skills: prev.skills.map((skill, i) => 
                i === index ? value : skill
            )
        }));
    };

    const addSkill = () => {
        setSkillData(prev => ({
            ...prev,
            skills: [...prev.skills, '']
        }));
    };

    const removeSkill = (index) => {
        setSkillData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };
  
    const handleSave = () => {
        if (!skillData.category || skillData.skills.some(skill => !skill.trim())) {
            alert('Please fill in all fields');
            return;
        }
        onSkillUpdate(currentSkills => ({
            ...currentSkills,
            [skillData.category]: [
                ...(currentSkills[skillData.category] || []),
                ...skillData.skills
            ]
        }));
        setShowSkillForm(false);
    };
  
    return (
        <div className="new-skill-form">
            <div className="category-selection" style={{fontSize: "0.8rem"}}>
                <label>
                    <input
                        type="radio"
                        checked={useExistingCategory}
                        onChange={() => setUseExistingCategory(true)}
                    /> Use existing category
                </label>
                <label>
                    <input
                        type="radio"
                        checked={!useExistingCategory}
                        onChange={() => setUseExistingCategory(false)}
                    /> Create new category
                </label>
            </div>

            {useExistingCategory ? (
                <select
                    value={skillData.category}
                    onChange={handleCategoryChange}
                    className="category-select"
                >
                    <option value="">Select Category</option>
                    {existingCategories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    value={skillData.category}
                    onChange={handleCategoryChange}
                    placeholder="New Category"
                    className="category-input"
                />
            )}
            
            <div className="skills-section">
                {skillData.skills.map((skill, index) => (
                    <div key={index} className="skill-input">
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleSkillChange(index, e.target.value)}
                            placeholder={`Skill ${index + 1}`}
                        />
                        {skillData.skills.length > 1 && (
                            <button 
                            onClick={() => removeSkill(index)}
                            className="delete-btn">
                                    <img src={deleteBtn} alt="Delete"/>
                                </button>
                        )}
                    </div>
                ))}
                <button onClick={addSkill} className="cancelBtn">Add Skill</button>
            </div>

            <div className="form-buttons">
                <button className='saveBtn' onClick={handleSave}>Save</button>
                <button className="cancelBtn" onClick={() => setShowSkillForm(false)}>Cancel</button>
            </div>
        </div>
    );
};