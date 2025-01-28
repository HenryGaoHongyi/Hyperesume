import React, { useState } from 'react';
import './Experience.css';
import { CreateNewExperience } from '../CreateNewExperience/CreateNewExperience';
import AutoWidthInput from '../../../AutoWidthInput/AutoWidthInput';
import deleteBtn from '../../../../Assets/icons/deleteBtn.png';
import addBtn from '../../../../Assets/icons/addButton.png';

const Experience = ({ experience, setUserData }) => {
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const [currentlyEditing, setCurrentlyEditing] = useState(null);
    const [editingData, setEditingData] = useState({});

    const handleExperienceUpdate = (updateFn) => {
        setUserData(prev => ({
            ...prev,
            experience: updateFn(prev.experience)
        }));
    };

    const handleDeleteExperience = (e, indexToDelete) => {
        e.stopPropagation();
        handleExperienceUpdate(currentExperience => 
            currentExperience.filter((_, index) => index !== indexToDelete)
        );
    };

    const handleEdit = (index, exp) => {
        setCurrentlyEditing(index);
        setEditingData(exp);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleResponsibilityChange = (index, value) => {
        setEditingData(prev => ({
            ...prev,
            responsibilities: prev.responsibilities.map((resp, i) => 
                i === index ? value : resp
            )
        }));
    };

    const addResponsibility = () => {
        setEditingData(prev => ({
            ...prev,
            responsibilities: [...prev.responsibilities, '']
        }));
    };

    const removeResponsibility = (index) => {
        setEditingData(prev => ({
            ...prev,
            responsibilities: prev.responsibilities.filter((_, i) => i !== index)
        }));
    };

    const handleSaveEdit = () => {
        if (!editingData.company || !editingData.role || !editingData.location || 
            !editingData.startDate || !editingData.endDate || 
            editingData.responsibilities.some(resp => !resp.trim())) {
            alert('Please fill in all fields');
            return;
        }

        handleExperienceUpdate(currentExperience =>
            currentExperience.map((exp, index) =>
                index === currentlyEditing ? editingData : exp
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
            <h2>Experience</h2>
            <div style={{ marginTop: '8px' }}>
                {experience.map((exp, index) => (
                    <div className='each-item' key={index} style={{ marginTop: '8px' }}>
                        {currentlyEditing === index ? (
                            <div className="edit-experience-form">
                                <div style={{ flex: 1, marginBottom: "7px" }}>
                                    <AutoWidthInput
                                        type="text"
                                        name="company"
                                        value={editingData.company}
                                        onChange={handleEditInputChange}
                                        placeholder="Company"
                                    />
                                    <AutoWidthInput
                                        type="text"
                                        name="role"
                                        value={editingData.role}
                                        onChange={handleEditInputChange}
                                        placeholder="Role"
                                    />
                                </div>
                                
                                <AutoWidthInput
                                    type="text"
                                    name="location"
                                    value={editingData.location}
                                    onChange={handleEditInputChange}
                                    placeholder="Location"
                                />
                                <AutoWidthInput
                                    type="text"
                                    name="startDate"
                                    value={editingData.startDate}
                                    onChange={handleEditInputChange}
                                    placeholder="Start Date"
                                />
                                <AutoWidthInput
                                    type="text"
                                    name="endDate"
                                    value={editingData.endDate}
                                    onChange={handleEditInputChange}
                                    placeholder="End Date"
                                />
                                
                                <div className="responsibilities-section">
                                    {editingData.responsibilities.map((resp, respIndex) => (
                                        <div key={respIndex} className="responsibility-input" style={{marginTop: "16px"}}>
                                            <input
                                                type="text"
                                                value={resp}
                                                onChange={(e) => handleResponsibilityChange(respIndex, e.target.value)}
                                                placeholder="Enter a responsibility"
                                            />
                                            {editingData.responsibilities.length > 1 && (
                                                <button 
                                                    onClick={() => removeResponsibility(respIndex)}
                                                    className='delete-btn'
                                                >
                                                    <img src={deleteBtn} alt="delete"/>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button className='cancelBtn' onClick={addResponsibility}>
                                        Add another Responsibility
                                    </button>
                                </div>

                                <div className="form-buttons">
                                    <button className='saveBtn' onClick={handleSaveEdit}>Save</button>
                                    <button className='cancelBtn' onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div onClick={() => handleEdit(index, exp)} style={{ flex: 1 }}>
                                <p className="exp-role-company">
                                    {exp.role}, {exp.company}
                                    <button 
                                        onClick={(e) => handleDeleteExperience(e, index)}
                                        className="delete-btn"
                                    >
                                        <img src={deleteBtn} alt="delete"/>
                                    </button>
                                </p>
                                <p className='exp-location-date'>
                                    {exp.location} &nbsp;|&nbsp;{exp.startDate} - {exp.endDate}
                                </p>
                                <ul className="list-disc">
                                    {exp.responsibilities.map((responsibility, i) => (
                                        <li key={i}>{responsibility}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
                {showExperienceForm && (
                    <CreateNewExperience
                        onExperienceUpdate={handleExperienceUpdate}
                        setShowExperienceForm={setShowExperienceForm}
                    />
                )}
            </div>
            <br/>
            <div className='button-container'>
                {!showExperienceForm && (
                    <button className='add-items-btn' onClick={() => setShowExperienceForm(true)}>
                        <img src={addBtn} className='add-button' alt="Add"/>
                        Add Experience
                    </button>
                )}
            </div>
        </div>
    );
};

export default Experience;