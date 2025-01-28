import React, { useState } from 'react';
import AutoWidthInput from '../../../AutoWidthInput/AutoWidthInput';

export const CreateNewCertification = ({ onCertificationUpdate, setShowCertificationForm }) => {
    const [certificationData, setCertificationData] = useState({
        name: '',
        date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCertificationData(prev => ({
            ...prev,
            [name]: value
        }));
    };
  
    const handleSave = () => {
        if (!certificationData.name || !certificationData.date) {
            alert('Please fill in all fields');
            return;
        }
        onCertificationUpdate(currentCertifications => [...currentCertifications, certificationData]);
        setShowCertificationForm(false);
    };
  
    return (
        <div className="new-certification-form each-item">
            <br/>
            <div className='cert-details' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <AutoWidthInput
                type="text"
                name="name"
                value={certificationData.name}
                onChange={handleInputChange}
                placeholder="Certification Name"
            />
            <AutoWidthInput
                type="text"
                name="date"
                value={certificationData.date}
                onChange={handleInputChange}
                placeholder="Date (e.g., August 2023)"
            />
            </div>
            <div className="form-buttons">
                <button className='saveBtn' onClick={handleSave}>Save</button>
                <button className='cancelBtn'  onClick={() => setShowCertificationForm(false)}>Cancel</button>
            </div>
        </div>
    );
};