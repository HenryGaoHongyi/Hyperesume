import React, { useState } from 'react';
import { CreateNewEducation } from '../CreateNewEducation/CreateNewEducation';
import AutoWidthInput from '../../../AutoWidthInput/AutoWidthInput';
import './Education.css';
import deleteBtn from '../../../../Assets/icons/deleteBtn.png';
import addButton from '../../../../Assets/icons/addButton.png';

const Education = ({ education, setUserData }) => {
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [currentlyEditing, setCurrentlyEditing] = useState(null);
    const [editingData, setEditingData] = useState({});

    const handleEducationUpdate = (updateFn) => {
        setUserData((prev) => ({
            ...prev,
            education: updateFn(prev.education),
        }));
    };

    const handleDeleteEducation = (indexToDelete) => {
        handleEducationUpdate((currentEducation) =>
            currentEducation.filter((_, index) => index !== indexToDelete)
        );
    };

    const handleEdit = (index, edu) => {
        setCurrentlyEditing(index);
        setEditingData(edu);
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
            school: editingData.school.trim(),
            degree: editingData.degree.trim(),
            graduationDate: editingData.graduationDate.trim(),
        };

        if (!trimmedData.school || !trimmedData.degree || !trimmedData.graduationDate) {
            alert('Please fill in all fields');
            return;
        }

        handleEducationUpdate((currentEducation) =>
            currentEducation.map((edu, index) =>
                index === currentlyEditing ? trimmedData : edu
            )
        );
        setCurrentlyEditing(null);
        setEditingData({});
    };

    const handleCancelEdit = () => {
        setCurrentlyEditing(null);
        setEditingData({});
    };

    const handleAddEducation = (newEducation) => {
        handleEducationUpdate((currentEducation) => [
            ...currentEducation,
            newEducation,
        ]);
        setShowEducationForm(false);
    };

    return (
        <div style={{ marginBottom: '24px' }}>
            <h2>Education</h2>
            <div style={{ marginTop: '8px' }}>
                <div>
                    {education.map((edu, index) => (
                        <div className="each-item" key={index} style={{marginBottom: "10px"}}>
                            {currentlyEditing === index ? (
                                <div className="edit-education-form">
                                    <div className="school-grad">
                                        <AutoWidthInput
                                            className="input-styling"
                                            type="text"
                                            name="school"
                                            value={editingData.school}
                                            onChange={handleEditInputChange}
                                            placeholder="School, Location"
                                        />
                                        <AutoWidthInput
                                            className="input-styling"
                                            type="text"
                                            name="graduationDate"
                                            value={editingData.graduationDate}
                                            onChange={handleEditInputChange}
                                            placeholder="Graduation Date"
                                        />
                                    </div>
                                    <AutoWidthInput
                                        className="input-styling"
                                        type="text"
                                        name="degree"
                                        value={editingData.degree}
                                        onChange={handleEditInputChange}
                                        placeholder="Degree"
                                    />
                                    <div className="form-buttons">
                                        <button className="saveBtn" onClick={handleSaveEdit}>
                                            Save
                                        </button>
                                        <button className="cancelBtn" onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div onClick={() => handleEdit(index, edu)}>
                                    <div className="school-grad">
                                        <div className="school">
                                            {edu.school}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteEducation(index);
                                                }}
                                                className="delete-btn"
                                            >
                                                <img src={deleteBtn} alt="Delete" />
                                            </button>
                                        </div>
                                        <div className="edu-grad-date">
                                            {edu.graduationDate}
                                        </div>
                                    </div>
                                    <div className="edu-degree">{edu.degree}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {showEducationForm && (
                    <CreateNewEducation
                        onSave={handleAddEducation}
                        onCancel={() => setShowEducationForm(false)}
                    />
                )}
            </div>
            <br/>
            <div className="button-container">
                {!showEducationForm && (
                    <button
                        className="add-items-btn"
                        onClick={() => setShowEducationForm(true)}
                    >
                        <img className="add-button" src={addButton} alt="Add" />
                        Add Education
                    </button>
                )}
            </div>
        </div>
    );
};

export default Education;