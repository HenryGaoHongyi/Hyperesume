import React, { useState } from 'react';
import { CreateNewProject } from '../CreateNewProject/CreateNewProject';
import AutoWidthInput from '../../../AutoWidthInput/AutoWidthInput';
import deleteBtn from '../../../../Assets/icons/deleteBtn.png';
import addButton from '../../../../Assets/icons/addButton.png';

const Projects = ({ projects, setUserData }) => {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [currentlyEditing, setCurrentlyEditing] = useState(null);
    const [editingData, setEditingData] = useState({});

    const handleProjectUpdate = (updateFn) => {
        setUserData(prev => ({
            ...prev,
            projects: updateFn(prev.projects)
        }));
    };

    const handleDeleteProject = (e, indexToDelete) => {
        e.stopPropagation();
        handleProjectUpdate(currentProjects => 
            currentProjects.filter((_, index) => index !== indexToDelete)
        );
    };

    const handleEdit = (index, project) => {
        setCurrentlyEditing(index);
        setEditingData(project);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = () => {
        const trimmedData = {
            name: editingData.name.trim(),
            date: editingData.date.trim(),
            description: editingData.description.trim()
        };

        if (!trimmedData.name || !trimmedData.date || !trimmedData.description) {
            alert('Please fill in all fields');
            return;
        }

        handleProjectUpdate(currentProjects =>
            currentProjects.map((project, index) =>
                index === currentlyEditing ? trimmedData : project
            )
        );
        setCurrentlyEditing(null);
        setEditingData({});
    };

    const handleCancelEdit = () => {
        setCurrentlyEditing(null);
        setEditingData({});
    };

    return (
        <div style={{ marginBottom: '24px' }}>
            <h2>Projects</h2>
            {projects.map((project, index) => (
                <div className='each-item' key={index} style={{ marginTop: '8px' }}>
                    {currentlyEditing === index ? (
                        <div className="edit-project-form">
                            <div className='project-name-date'>
                                <AutoWidthInput
                                    type="text"
                                    name="name"
                                    value={editingData.name}
                                    onChange={handleEditInputChange}
                                    placeholder="Project Name"
                                    className="input-styling"
                                />
                                <AutoWidthInput
                                    type="text"
                                    name="date"
                                    value={editingData.date}
                                    onChange={handleEditInputChange}
                                    placeholder="Date"
                                    className="input-styling"
                                />
                            </div>
                            <AutoWidthInput
                                type="text"
                                name="description"
                                value={editingData.description}
                                onChange={handleEditInputChange}
                                placeholder="Project Description"
                                className="input-styling"
                            />
                            <div className="form-buttons">
                                <button className='saveBtn' onClick={handleSaveEdit}>Save</button>
                                <button className='cancelBtn' onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ flex: 1 }} onClick={() => handleEdit(index, project)}>
                            <div className='project-name-date'>
                                <p className="project-name" style={{padding: "0", marginBottom:"5px"}}>
                                    {project.name}
                                    <button 
                                        onClick={(e) => handleDeleteProject(e, index)}
                                        className="delete-btn"
                                    >
                                        <img src={deleteBtn} alt="Delete"/>
                                    </button>
                                </p>
                                <p style={{padding: "0", marginBottom:"5px", fontSize: "0.8rem"}} className='project-date'>
                                    {project.date}
                                </p>
                            </div>
                            <p style={{padding: "0", marginTop:"0"}}>{project.description}</p>
                        </div>
                    )}
                </div>
            ))}
            {showProjectForm && (
                <CreateNewProject
                    onProjectUpdate={handleProjectUpdate}
                    setShowProjectForm={setShowProjectForm}
                />
            )}
            <div className='button-container'>
                {!showProjectForm && (
                    <button className='add-items-btn' onClick={() => setShowProjectForm(true)} style={{marginTop: "10px"}}>
                        <img className='add-button' src={addButton} alt="Add"/>
                        Add Project
                    </button>
                )}
            </div>
        </div>
    );
};

export default Projects;