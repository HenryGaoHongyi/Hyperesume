// Template1.js
import React, { useState, useMemo, useRef  } from 'react';
import './template1.css';
import Education from '../../TemplateComponents/Education/Education/Education';
import Experience from '../../TemplateComponents/Experience/Experience/Experience';
import Skills from '../../TemplateComponents/Skills/Skills/Skills';
import Projects from '../../TemplateComponents/Projects/Projects/Projects';
import Certifications from '../../TemplateComponents/Certifications/Certifications/Certifications';
import PreviewMode from './PreviewMode/PreviewMode';

const Template1 = () => {
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

    const resumeSections = useMemo(() => [
        { title: 'Education', data: userData.education },
        { title: 'Experience', data: userData.experience },
        { title: 'Skills', data: userData.skills },
        { title: 'Projects', data: userData.projects },
        { title: 'Certifications', data: userData.certifications }
    ], [
        userData.education,
        userData.experience,
        userData.skills,
        userData.projects,
        userData.certifications
    ]);

    const handlePrint = () => {
        const printContent = resumeRef.current;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

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
                    <button
                        onClick={handlePrint}
                        className="saveBtn"
                    >
                        Print Resume
                    </button>
                )}
            </div>

            <div className="resume-container" ref={resumeRef}>
                {isPreviewMode ? (
                    <PreviewMode 
                        userData={userData}
                    />
                ) : (
                    <div className="resume-template">
                        <div className='template1-header'>
                            <h1>{userData.name}</h1>
                            <p>{userData.email} &nbsp;|&nbsp; {userData.phone} &nbsp;|&nbsp; {userData.address}</p>
                        </div>

                        <Education 
                            education={userData.education}
                            setUserData={setUserData}
                        />
                        <Skills 
                            skills={userData.skills}
                            setUserData={setUserData}
                        />
                        <Experience 
                            experience={userData.experience}
                            setUserData={setUserData}
                        />
                        <Projects 
                            projects={userData.projects}
                            setUserData={setUserData}
                        />
                        <Certifications 
                            certifications={userData.certifications}
                            setUserData={setUserData}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Template1;