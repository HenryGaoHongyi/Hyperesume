import React from 'react';

const PreviewMode = ({ userData, totalHeight }) => {
    return (
        <div className="resume-template" style={{ width: '8.27in', height: `${totalHeight}in` }}>
            {/* Header */}
            <div className='template1-header' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h1>{userData.name}</h1>
                <p>{userData.email} &nbsp;|&nbsp; {userData.phone} &nbsp;|&nbsp; {userData.address}</p>
            </div>

            {/* Education */}
            <div style={{ marginBottom: '24px' }}>
                <h2>Education</h2>
                <div style={{ marginTop: '8px' }}>
                    {userData.education.map((edu, index) => (
                        <div className='each-item' key={index} style={{ marginTop: '8px' }}>
                            <div className='school-grad' style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '16px'
                            }}>
                                <p className="school" style={{ 
                                    margin: 0,
                                    fontWeight: '600'
                                }}>{edu.school}</p>
                                <p style={{ 
                                    margin: 0,
                                    color: '#666',
                                    fontSize: "0.8rem"
                                }}>{edu.graduationDate}</p>
                            </div>
                            <p className='edu-degree' style={{ 
                                margin: '4px 0 0 0',
                                color: '#333'
                            }}>{edu.degree}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: '24px' }}>
                <h2>Skills</h2>
                <ul style={{ 
                    listStyle: 'none',
                    padding: 0,
                    margin: '8px 0 0 0'
                }}>
                    {Object.entries(userData.skills).map(([category, skills], index) => (
                        <li key={index}>
                            <div className='skill' style={{ 
                                display: 'flex',
                                gap: '8px',
                                marginTop: index > 0 ? '8px' : 0
                            }}>
                                <p className="category" style={{ margin: 0 }}>{category}:</p>
                                <p style={{ margin: 0 }}>{skills.join(', ')}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Experience */}
            <div style={{ marginBottom: '24px' }}>
                <h2>Experience</h2>
                {userData.experience.map((exp, index) => (
                    <div className='each-item' key={index} style={{ marginTop: '8px' }}>
                        <p className="exp-role-company" style={{ 
                            margin: 0,
                            fontWeight: '600'
                        }}>{exp.role}, {exp.company}</p>
                        <p className='exp-location-date' style={{ 
                            margin: '4px 0',
                            color: '#666'
                        }}>{exp.location} &nbsp;|&nbsp;{exp.startDate} - {exp.endDate}</p>
                        <ul className="list-disc" style={{ 
                            marginTop: '8px',
                            paddingLeft: '20px'
                        }}>
                            {exp.responsibilities.map((responsibility, i) => (
                                <li key={i} style={{ marginBottom: '4px' }}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Projects */}
            <div style={{ marginBottom: '24px' }}>
                <h2>Projects</h2>
                {userData.projects.map((project, index) => (
                    <div className='each-item' key={index} style={{ marginTop: '8px' }}>
                        <div className='project-name-date' style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '16px'
                        }}>
                            <p className="project-name" style={{ 
                                margin: 0,
                                fontWeight: '600'
                            }}>{project.name}</p>
                            <p className='project-date' style={{ 
                                margin: 0,
                                color: '#666',
                                fontSize: "0.8rem"
                            }}>{project.date}</p>
                        </div>
                        <p style={{ margin: '4px 0 0 0' }}>{project.description}</p>
                    </div>
                ))}
            </div>

            {/* Certifications */}
            <div style={{ marginBottom: '24px' }}>
                <h2>Certifications</h2>
                {userData.certifications.map((cert, index) => (
                    <div className='certs each-item' key={index} style={{ 
                        marginTop: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <p className="cert-name" style={{ 
                            margin: 0,
                            fontWeight: '500'
                        }}>{cert.name}</p>
                        <p style={{ 
                            margin: 0,
                            color: '#666',
                            fontSize: "0.8rem"
                        }}>{cert.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreviewMode;