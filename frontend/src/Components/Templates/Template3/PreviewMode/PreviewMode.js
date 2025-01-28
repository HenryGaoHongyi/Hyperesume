import React from 'react';
import './PreviewMode.css';

const PreviewMode = ({ userData }) => {
    const flattenedSkills = [...new Set(Object.values(userData.skills).flat())];

    return (
        <div className="resume-template template3">
            <header className="template3-header">
                <div className="header-content">
                    <h1 className="name">{userData.name}</h1>
                    <div className="contact-line">
                        {userData.phone} | {userData.email} | {userData.address}
                    </div>
                </div>
            </header>

            <main className="template3-content">
                <section className="education-section">
                    <h2>Education</h2>
                    {userData.education.map((edu, index) => (
                        <div key={index} className="education-item">
                            <div className="edu-header">
                                <p className="school">{edu.school}</p>
                                <p className="graduation-date">{edu.graduationDate}</p>
                            </div>
                            <p className="degree">{edu.degree}</p>
                        </div>
                    ))}
                </section>

                <section className="experience-section">
                    <h2>Professional Experience</h2>
                    {userData.experience.map((exp, index) => (
                        <div key={index} className="experience-item">
                            <div className="exp-header">
                                <div className="role-company">
                                    <span className="role">{exp.role}</span>
                                    {exp.company && <span className="company">, {exp.company}</span>}
                                </div>
                                <div className="exp-date-location">
                                    {exp.location} | {exp.startDate} - {exp.endDate}
                                </div>
                            </div>
                            <ul className="responsibilities">
                                {exp.responsibilities.map((resp, i) => (
                                    <li key={i}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section className="technical-section">
                    <h2>Technical Skills</h2>
                    <div className="skills-grid">
                        {Object.entries(userData.skills).map(([category, skills]) => (
                            <div key={category} className="skill-category">
                                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}:</h3>
                                <p>{skills.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="projects-section">
                    <h2>Academic Projects</h2>
                    {userData.projects.map((project, index) => (
                        <div key={index} className="project-item">
                            <div className="project-header">
                                <span className="project-name">{project.name}</span>
                                <span className="project-date">{project.date}</span>
                            </div>
                            <p className="project-description">{project.description}</p>
                        </div>
                    ))}
                </section>

                <section className="certifications-section">
                    <h2>Certifications</h2>
                    {userData.certifications.map((cert, index) => (
                        <div key={index} className="certification-item">
                            <span className="cert-name">{cert.name}</span>
                            <span className="cert-date">{cert.date}</span>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default PreviewMode;