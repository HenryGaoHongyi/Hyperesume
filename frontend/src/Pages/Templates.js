import React, {useState} from 'react';
import Navbar from '../Components/Navbar/Navbar';
import template1 from '../Assets/templates/template1.png';
import template2 from '../Assets/templates/template2.png';
import template3 from '../Assets/templates/template3.png';
import template4 from '../Assets/templates/template4.png';
import { useNavigate } from 'react-router-dom';
import './CSS/Templates.css';
import ResumeBuilder from '../Pages/ResumeBuilder';

const templatesData = [
  {
    id:1,
    image: template1,
    templateName: "Template 1"
  },
  {
    id:2,
    image: template2,
    templateName: "Template 2"
  },
  {
    id:3,
    image: template3,
    templateName: "Template 3"
  },
  {
    id:4,
    image: template4,
    templateName: "Template 4"
  },
]

const Templates = () => {

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const handleTemplateClick = (templateId) => {
    navigate(`/resume-builder/${templateId}`);
  };


  return (
    <div className='outer-container'>
        <Navbar/>
        <h1 className='h1-header-style'>Browse Templates</h1>
        <br/><br/>
        <div className='templates-container'>
          {
            templatesData.map(template => {
              return (
                <div className='image-container' key={template.id} onClick={() => handleTemplateClick(template.id)}>
                  <img className="template-image" src={template.image} alt={template.templateName}/>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Templates;