import React, { useState } from 'react';
import AutoWidthInput from '../../../AutoWidthInput/AutoWidthInput';

export const CreateNewProject = ({ onProjectUpdate, setShowProjectForm }) => {
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prev => ({
            ...prev,
            [name]: value
        }));
    };
  
    const handleSave = () => {
        if (!projectData.name || !projectData.description || !projectData.date) {
            alert('Please fill in all fields');
            return;
        }
        onProjectUpdate(currentProjects => [...currentProjects, projectData]);
        setShowProjectForm(false);
    };
  
    return (
        <div className="new-project-form each-item">
            <div className='project-name-date' style={{marginBottom: "10px"}}>
            <AutoWidthInput
                type="text"
                name="name"
                value={projectData.name}
                onChange={handleInputChange}
                placeholder="Project Name"
            />
            <AutoWidthInput
                type="text"
                name="date"
                value={projectData.date}
                onChange={handleInputChange}
                placeholder="Date (e.g., July 2023)"
            />
            </div>
            <AutoWidthInput
                name="description"
                value={projectData.description}
                onChange={handleInputChange}
                placeholder="Project Description"
                rows="3"
            />
            
            <div className="form-buttons" style={{marginBottom: "15px"}}>
                <button className='saveBtn' onClick={handleSave}>Save</button>
                <button className='cancelBtn' onClick={() => setShowProjectForm(false)}>Cancel</button>
            </div>
        </div>
    );
};