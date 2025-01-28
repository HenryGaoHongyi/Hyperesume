import React, { useState } from 'react';
import { CreateNewCertification } from '../CreateNewCertification/CreateNewCertification';
import AutoWidthInput from '../../../AutoWidthInput/AutoWidthInput';
import deleteBtn from '../../../../Assets/icons/deleteBtn.png';
import addButton from '../../../../Assets/icons/addButton.png';

const Certifications = ({ certifications, setUserData }) => {
    const [showCertificationForm, setShowCertificationForm] = useState(false);
    const [currentlyEditing, setCurrentlyEditing] = useState(null);
    const [editingData, setEditingData] = useState({});

    const handleCertificationUpdate = (updateFn) => {
        setUserData(prev => ({
            ...prev,
            certifications: updateFn(prev.certifications)
        }));
    };

    const handleDeleteCertification = (e, indexToDelete) => {
        e.stopPropagation();
        handleCertificationUpdate(currentCertifications => 
            currentCertifications.filter((_, index) => index !== indexToDelete)
        );
    };

    const handleEdit = (index, cert) => {
        setCurrentlyEditing(index);
        setEditingData(cert);
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
            date: editingData.date.trim()
        };

        if (!trimmedData.name || !trimmedData.date) {
            alert('Please fill in all fields');
            return;
        }

        handleCertificationUpdate(currentCertifications =>
            currentCertifications.map((cert, index) =>
                index === currentlyEditing ? trimmedData : cert
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
            <h2>Certifications</h2>
            {certifications.map((cert, index) => (
                <div className='certs each-item' key={index} style={{ marginTop: '8px' }}>
                    {currentlyEditing === index ? (
                        <div className="edit-certification-form">
                            <div className='cert-details' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <AutoWidthInput
                                    type="text"
                                    name="name"
                                    value={editingData.name}
                                    onChange={handleEditInputChange}
                                    placeholder="Certification Name"
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
                            <div className="form-buttons">
                                <button className='saveBtn' onClick={handleSaveEdit}>Save</button>
                                <button className='cancelBtn' onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ flex: 1 }} onClick={() => handleEdit(index, cert)}>
                            <div className='cert-details' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p className="cert-name" style={{padding: "0", margin:"5px"}}>
                                    {cert.name}
                                    <button 
                                        onClick={(e) => handleDeleteCertification(e, index)}
                                        className="delete-btn"
                                    >
                                        <img src={deleteBtn} alt="Delete"/>
                                    </button>
                                </p>
                                <p style={{padding: "0", margin:"5px", fontSize: "0.8rem"}}>
                                    {cert.date}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {showCertificationForm && (
                <CreateNewCertification
                    onCertificationUpdate={handleCertificationUpdate}
                    setShowCertificationForm={setShowCertificationForm}
                />
            )}
            <div className='button-container' style={{marginTop: "10px"}}>
                {!showCertificationForm && (
                    <button className='add-items-btn' onClick={() => setShowCertificationForm(true)}>
                        <img className='add-button' src={addButton} alt="Add"/>
                        Add Certification
                    </button>
                )}
            </div>
        </div>
    );
};

export default Certifications;