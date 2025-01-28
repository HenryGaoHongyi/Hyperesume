import React, { useState } from 'react';
import AutoWidthInput from '../../../AutoWidthInput/AutoWidthInput';
import deleteBtn from '../../../../Assets/icons/deleteBtn.png';
export const CreateNewExperience = ({ onExperienceUpdate, setShowExperienceForm }) => {
    const [experienceData, setExperienceData] = useState({
        company: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        responsibilities: ['']  // Start with one empty responsibility
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExperienceData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleResponsibilityChange = (index, value) => {
        setExperienceData(prev => ({
            ...prev,
            responsibilities: prev.responsibilities.map((resp, i) => 
                i === index ? value : resp
            )
        }));
    };

    const addResponsibility = () => {
        setExperienceData(prev => ({
            ...prev,
            responsibilities: [...prev.responsibilities, '']
        }));
    };

    const removeResponsibility = (index) => {
        setExperienceData(prev => ({
            ...prev,
            responsibilities: prev.responsibilities.filter((_, i) => i !== index)
        }));
    };
  
    const handleSave = () => {
        if (!experienceData.company || !experienceData.role || !experienceData.location || 
            !experienceData.startDate || !experienceData.endDate || 
            experienceData.responsibilities.some(resp => !resp.trim())) {
            alert('Please fill in all fields');
            return;
        }
        onExperienceUpdate(currentExperience => [...currentExperience, experienceData]);
        setShowExperienceForm(false);
    };
  
    return (
        <div className="new-experience-form each-item" >
            <div style={{ flex: 1, marginBottom: "7px" }}>
            <AutoWidthInput
                type="text"
                name="company"
                value={experienceData.company}
                onChange={handleInputChange}
                placeholder="Company"
            />
            <AutoWidthInput
                type="text"
                name="role"
                value={experienceData.role}
                onChange={handleInputChange}
                placeholder="Role"
            />
            </div>
            
            <AutoWidthInput
                type="text"
                name="location"
                value={experienceData.location}
                onChange={handleInputChange}
                placeholder="Location"
                
            />
            <AutoWidthInput
                type="text"
                name="startDate"
                value={experienceData.startDate}
                onChange={handleInputChange}
                placeholder="Start Date"
            />
            <AutoWidthInput
                type="text"
                name="endDate"
                value={experienceData.endDate}
                onChange={handleInputChange}
                placeholder="End Date"
            />
            
            <div className="responsibilities-section">
                {experienceData.responsibilities.map((resp, index) => (
                    <div key={index} className="responsibility-input" style={{marginTop: "16px"}}>
                        <input
                            type="text"
                            value={resp}
                            onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                            placeholder="Enter a responsibility"
                        />
                        {experienceData.responsibilities.length > 1 && (
                            <button 
                                onClick={() => removeResponsibility(index)}
                                className='delete-btn'
                            >
                                <img src={deleteBtn} alt="delete"/>
                            </button>
                        )}
                    </div>
                ))}
                <button className='cancelBtn' onClick={addResponsibility}>Add another Responsibility</button>
            </div>

            <div className="form-buttons">
                <button className='saveBtn' onClick={handleSave}>Save</button>
                <button className='cancelBtn' onClick={() => setShowExperienceForm(false)}>Cancel</button>
            </div>
        </div>
    );
};