import React, { useState, useEffect } from 'react';
import './CreateNewEducation.css';
import AutoWidthInput from '../../../AutoWidthInput/AutoWidthInput';

export const CreateNewEducation = ({ initialData = {}, onSave, onCancel }) => {
    const [educationData, setEducationData] = useState({
        school: '',
        degree: '',
        graduationDate: '',
    });

    // Populate the form when initialData changes
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setEducationData({
                school: initialData.school || '',
                degree: initialData.degree || '',
                graduationDate: initialData.graduationDate || '',
            });
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEducationData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = (e) => {
        e.preventDefault(); // Prevent form submission
        
        // Trim values before validation
        const trimmedData = {
            school: educationData.school.trim(),
            degree: educationData.degree.trim(),
            graduationDate: educationData.graduationDate.trim(),
        };

        if (!trimmedData.school || !trimmedData.degree || !trimmedData.graduationDate) {
            alert('Please fill in all fields');
            return;
        }

        onSave(trimmedData);
        
        // Reset form if not editing (initialData is empty)
        if (!initialData || Object.keys(initialData).length === 0) {
            setEducationData({
                school: '',
                degree: '',
                graduationDate: '',
            });
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        // Reset form if not editing
        if (!initialData || Object.keys(initialData).length === 0) {
            setEducationData({
                school: '',
                degree: '',
                graduationDate: '',
            });
        }
        onCancel();
    };

    return (
        <div className="new-education-form each-item">
            <div className='school-grad'>
                <AutoWidthInput
                    className="input-styling"
                    type="text"
                    name="school"
                    value={educationData.school}
                    onChange={handleInputChange}
                    placeholder="School, Location"
                />
                <AutoWidthInput
                    className="input-styling"
                    type="text"
                    name="graduationDate"
                    value={educationData.graduationDate}
                    onChange={handleInputChange}
                    placeholder="Graduation Date"
                />
            </div>

            <AutoWidthInput
                className="input-styling"
                type="text"
                name="degree"
                value={educationData.degree}
                onChange={handleInputChange}
                placeholder="Degree"
            />

            <div className="form-buttons">
                <button className='saveBtn' onClick={handleSave}>Save</button>
                <button className='cancelBtn' onClick={handleCancel}>Cancel</button>
            </div>
            <br/>
        </div>
    );
};