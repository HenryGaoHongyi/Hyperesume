// Skills.js
import React, { useState } from 'react';
import { CreateNewSkill } from '../CreateNewSkill/CreateNewSkill';
import './Skills.css';
import deleteBtn from '../../../../Assets/icons/deleteBtn.png';
import addButton from '../../../../Assets/icons/addButton.png';

const Skills = ({ skills, setUserData }) => {
    const [showSkillForm, setShowSkillForm] = useState(false);

    const handleSkillUpdate = (updateFn) => {
        setUserData(prev => ({
            ...prev,
            skills: updateFn(prev.skills)
        }));
    };

    const handleDeleteSkill = (category, skillToDelete) => {
        handleSkillUpdate(currentSkills => ({
            ...currentSkills,
            [category]: currentSkills[category].filter(skill => skill !== skillToDelete)
        }));
    };

    const handleDeleteCategory = (categoryToDelete) => {
        handleSkillUpdate(currentSkills => {
            const { [categoryToDelete]: _, ...remainingSkills } = currentSkills;
            return remainingSkills;
        });
    };

    return (
        <div style={{ marginBottom: '24px' }}>
            <h2>Skills</h2>
            <div style={{ marginTop: '8px' }}>
                <ul>
                    {Object.entries(skills).map(([category, skillList], index) => (
                        <li key={index}>
                            <div className='skill' style={{ marginTop: '8px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <p className="category">{category}: </p>
                                        <button 
                                            onClick={() => handleDeleteCategory(category)}
                                            className="delete-btn"
                                            style={{ padding: '2px 6px' }}
                                        >
                                            <img src={deleteBtn} alt="Delete"/>
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                                        {skillList.map((skill, i) => (
                                            <div key={i} className="skill-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <span>{skill}</span>
                                                <button 
                                                    onClick={() => handleDeleteSkill(category, skill)}
                                                    className="cancelBtn"
                                                    style={{ padding: '2px 4px', fontSize:'20px' }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {showSkillForm && (
                    <CreateNewSkill
                        onSkillUpdate={handleSkillUpdate}
                        setShowSkillForm={setShowSkillForm}
                        existingCategories={Object.keys(skills)}
                    />
                )}
            </div>
            <div className='button-container'>
                <button className='add-items-btn' onClick={() => setShowSkillForm(true)}><img className='add-button' src={addButton} alt="Add"/>Add Skills</button>
            </div>
        </div>
    );
};

export default Skills;