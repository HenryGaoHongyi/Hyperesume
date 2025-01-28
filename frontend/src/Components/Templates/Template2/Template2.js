import React, { useState, useRef } from 'react';
import Education from '../../TemplateComponents/Education/Education/Education';
import Experience from '../../TemplateComponents/Experience/Experience/Experience';
import Projects from '../../TemplateComponents/Projects/Projects/Projects';
import Certifications from '../../TemplateComponents/Certifications/Certifications/Certifications';
import Skills from '../../TemplateComponents/Skills/Skills/Skills';
import PreviewMode from './PreviewMode/PreviewMode';
import './template2.css';

const Template2 = () => {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const resumeRef = useRef(null);

    const [userData, setUserData] = useState({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '(617) 123-1234',
        address: 'Boston, MA',
        education: [{
            school: 'Northeastern University, Boston, MA',
            degree: 'Master of Science in Software Engineering Systems',
            graduationDate: 'Sept 2022 (expected)'
        }],
        experience: [
            {
                company: 'Microsoft',
                role: 'Software Engineer',
                location: 'Shanghai',
                startDate: 'Jul 2022',
                endDate: 'Jan 2024',
                responsibilities: [
                    'Designed and implemented scalable microservices architecture, reducing system downtime by 40% and improving developer productivity by 25%',
                    'Collaborated with cross-functional teams to develop and integrate new features, increasing user engagement by 20%',
                    'Optimized backend algorithms, improving data processing speed by 65% and reducing cloud storage costs by 37%'
                ]
            },
            {
                company: 'Google',
                role: 'Software Developer',
                location: 'Mountain View, CA',
                startDate: 'Jun 2020',
                endDate: 'Dec 2023',
                responsibilities: [
                    'Developed and maintained high-performance APIs, handling over 1 million daily requests with 99.9% uptime',
                    'Led the migration of a legacy system to a modern cloud infrastructure, reducing operational costs by 30%',
                    'Implemented security protocols that enhanced data protection and compliance with industry standards'
                ]
            }
        ],
        skills: {
            frontend: ['React', 'CSS', 'JavaScript'],
            backend: ['Node.js', 'Express'],
            databases: ['MySQL', 'PostgreSQL'],
            tools: ['Git', 'Docker', 'VS Code', 'Figma', 'Adobe Suite']
        },
        projects: [
            {
                name: 'Real-Time Chat Application',
                description: 'Built a full-stack chat application using Node.js, WebSocket, and React, supporting thousands of concurrent users.',
                date: 'July 2019'
            },
            {
                name: 'E-Commerce Platform',
                description: 'Designed and built a scalable e-commerce platform using Django and React, enabling seamless online shopping experiences.',
                date: 'March 2021'
            },
            {
                name: 'Weather Forecast App',
                description: 'Developed a weather forecast application using Python and Flask, integrating APIs to provide real-time weather data.',
                date: 'January 2020'
            }
        ],
        certifications: [
            {
                name: 'Microsoft Azure Developer Associate',
                date: 'July 2019'
            },
            {
                name: 'Salesforce Developer - I',
                date: 'August 2021'
            },
            {
                name: 'Certified Kubernetes Administrator',
                date: 'October 2023'
            }
        ]
    });

    const handlePrint = () => {
        const printContent = resumeRef.current;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    const flattenedSkills = [...new Set(
        Object.values(userData.skills).flat()
    )];

    return (
        <div className="template-container">
            <div className="template-actions">
                <button
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className="saveBtn"
                >
                    {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
                </button>
                {isPreviewMode && (
                    <button onClick={handlePrint} className="saveBtn">
                        Print Resume
                    </button>
                )}
            </div>

            <div className="resume-container" ref={resumeRef}>
                {isPreviewMode ? (
                    <PreviewMode userData={userData} />
                ) : (
                    <div className="resume-template template2">
                        <header className="template2-header" style={{marginTop: "30px"}}>
                            <div className="name-title">
                                <h1 className="name">{userData.name}</h1>
                                <p className="title-text">SOFTWARE ENGINEER</p>
                            </div>
                            <div className="contact-info">
                                <div className="contact-item">{userData.phone}</div>
                                <div className="contact-item">{userData.email}</div>
                                <div className="contact-item">{userData.address}</div>
                                <div className="contact-item">{userData.linkedin}</div>
                            </div>
                        </header>

                        <div className="main-content">
                            <div className="left-column">
                                <Education 
                                    education={userData.education}
                                    setUserData={setUserData}
                                />
                                <Skills 
                                    skills={userData.skills}
                                    setUserData={setUserData}
                                />
                                <Certifications
                                    certifications={userData.certifications}
                                    setUserData={setUserData}
                                />
                            </div>

                            <div className="right-column">
                                <Experience 
                                    experience={userData.experience}
                                    setUserData={setUserData}
                                />
                                <Projects 
                                    projects={userData.projects}
                                    setUserData={setUserData}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Template2;