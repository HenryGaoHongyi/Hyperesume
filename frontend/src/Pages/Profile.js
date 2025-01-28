import React, { useState, useMemo, useRef  } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Education from '../Components/TemplateComponents/Education/Education/Education';
import Experience from '../Components/TemplateComponents/Experience/Experience/Experience';
import Skills from '../Components/TemplateComponents/Skills/Skills/Skills';
import Projects from '../Components/TemplateComponents/Projects/Projects/Projects';
import Certifications from '../Components/TemplateComponents/Certifications/Certifications/Certifications';
import './CSS/Profile.css';
import Footer from '../Components/Footer/Footer';

const Profile = () => {
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

const [isSaving, setIsSaving] = useState(false);
const [saveStatus, setSaveStatus] = useState(null); // null, 'success', or 'error'

const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
        // API call to save the profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSaveStatus('success');
        // Reset success message after 3 seconds
        setTimeout(() => {
            setSaveStatus(null);
        }, 3000);
    } catch (error) {
        setSaveStatus('error');
        // Reset error message after 3 seconds
        setTimeout(() => {
            setSaveStatus(null);
        }, 3000);
    } finally {
        setIsSaving(false);
    }
};

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

const handleProfileChange = (e, field) => {
  setUserData(prev => ({
      ...prev,
      [field]: e.target.value
  }));
};

return (
  <>
  <Navbar/>
  <h1 className='h1-header-style'>User Profile</h1>
  <div className="profile-container">
      <div className="profile-header-actions">
          <button 
              className={`save-profile-button ${isSaving ? 'saving' : ''}`}
              onClick={handleSaveProfile}
              disabled={isSaving}
          >
              {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
          {saveStatus && (
              <div className={`save-status ${saveStatus}`}>
                  {saveStatus === 'success' ? 
                      'Profile saved successfully!' : 
                      'Error saving profile. Please try again.'}
              </div>
          )}
          
      </div>
      <div className="basic-info-section">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                value={userData.name}
                                onChange={(e) => handleProfileChange(e, 'name')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                value={userData.email}
                                onChange={(e) => handleProfileChange(e, 'email')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                value={userData.phone}
                                onChange={(e) => handleProfileChange(e, 'phone')}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                value={userData.address}
                                onChange={(e) => handleProfileChange(e, 'address')}
                            />
                        </div>
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
      <Footer/>
      </>
  );
};

export default Profile;