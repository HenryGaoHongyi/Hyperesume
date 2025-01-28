import React from 'react';

const PreviewMode = ({ userData }) => {
    return (
        <div className="resume-template template4">
            <br/><br/>
            <header className="template4-header">
                <div className="name-title-template4">
                    <h1 className="name">{userData.name}</h1>
                    <p className="title">Software Engineer</p>
                </div>
                <div className="contact-info">
                    <span>{userData.phone}</span>
                    <span>{userData.email}</span>
                    <span>{userData.address}</span>
                </div>
            </header>

            <main className="template4-content">
                <section className="experience-section">
                    <h2>Experience</h2>
                    {userData.experience.map((exp, index) => (
                        <div key={index} className="experience-item">
                            <div className="exp-header">
                                <div className="exp-title">
                                    <h3>{exp.role}</h3>
                                    <p className="company-location">
                                        <span className="company">{exp.company}&nbsp;|&nbsp;</span>
                                        <span className="location">{exp.location}</span>
                                    </p>
                                </div>
                                <p className="dates">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <ul className="responsibilities">
                                {exp.responsibilities.map((resp, i) => (
                                    <li key={i}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section className="education-section">
                    <h2>Education</h2>
                    {userData.education.map((edu, index) => (
                        <div key={index} className="education-item">
                            <div className="edu-header-template4">
                                <p className='degree'>{edu.degree}</p>
                                <p className="graduation-date">{edu.graduationDate}</p>
                            </div>
                            <p className="school-template4">{edu.school}</p>
                        </div>
                    ))}
                </section>

                <div className="two-column-section">
                    <section className="skills-section template4-skills">
                        <h2>Skills</h2>
                        <div className="skills-list">
                            {Object.entries(userData.skills).map(([category, skills]) => (
                                <div key={category} className="skill-category template4-skills">
                                    <h3>{category}</h3>
                                    <p>{skills.join(', ')}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="certifications-section">
                        <h2>Certifications</h2>
                        {userData.certifications.map((cert, index) => (
                            <div key={index} className="certification-item template4-certs">
                                <span className="cert-name">{cert.name}</span>
                                <span className="cert-date">{cert.date}</span>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default PreviewMode;