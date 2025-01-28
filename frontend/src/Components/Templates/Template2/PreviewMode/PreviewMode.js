import React from 'react';
import './PreviewMode.css';

const PreviewMode = ({ userData }) => {
    // Flatten skills object into a single array of unique skills
    const flattenedSkills = [...new Set(
        Object.values(userData.skills).flat()
    )];

    return (
        <div className="resume-template template2">
            {/* Header Section */}
            <header className="template2-header" style={{marginTop: "30px"}}>
                <div className="name-title">
                    <h1 className="name">{userData.name}</h1>
                    <p className="title-text">SOFTWARE ENGINEER</p>
                </div>
                <div className="contact-info">
                    <div className="contact-item">{userData.phone}</div>
                    <div className="contact-item">{userData.email}</div>
                    <div className="contact-item">{userData.address}</div>
                    {userData.linkedin && <div className="contact-item">{userData.linkedin}</div>}
                </div>
            </header>

            <div className="main-content">
                {/* Left Column */}
                <div className="left-column">
                    {/* Education Section */}
                    <section className="education-section">
                        <h2>EDUCATION</h2>
                        {userData.education.map((edu, index) => (
                            <div key={index} className="education-item">
                                <p className="school" style={{fontWeight: "600"}}>{edu.school}</p>
                                <p className="degree">{edu.degree}</p>
                                <p className="graduation-date">{edu.graduationDate}</p>
                            </div>
                        ))}
                    </section>

                    {/* Skills Section */}
                    <section className="skills-section">
                        <h2>SKILLS</h2>
                        <ul className="skills-list template2-skills">
                            {flattenedSkills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Certifications Section */}
                    <section className="certifications-section">
                        <h2>CERTIFICATIONS</h2>
                        {userData.certifications.map((cert, index) => (
                            <div key={index} className="certification-item">
                                <p className="cert-name">{cert.name}</p>
                                <p className="cert-date">{cert.date}</p>
                            </div>
                        ))}
                    </section>
                </div>

                {/* Right Column */}
                <div className="right-column">
                    {/* Experience Section */}
                    <section className="experience-section">
                        <h2>EXPERIENCE</h2>
                        {userData.experience.map((exp, index) => (
                            <div key={index} className="experience-item">
                                <div className="exp-header">
                                    <p   style={{fontWeight: "600"}} className="role-company">
                                        <span className="role">{exp.role}</span>{exp.company && `, ${exp.company}`}
                                    </p>
                                    <p className="exp-location-date">
                                        {exp.location} | {exp.startDate} - {exp.endDate}
                                    </p>
                                </div>
                                <ul className="responsibilities list-disc">
                                    {exp.responsibilities.map((resp, i) => (
                                        <li key={i}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>

                    {/* Projects Section */}
                    <section className="projects-section">
                        <h2>PROJECTS</h2>
                        {userData.projects.map((project, index) => (
                            <div key={index} className="project-item">
                                <div className="project-header">
                                    <p  style={{fontWeight: "600"}} className="project-name">{project.name}</p>
                                    <p className="project-date">{project.date}</p>
                                </div>
                                <p className="project-description">{project.description}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PreviewMode;