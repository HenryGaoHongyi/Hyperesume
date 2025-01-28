import React, { useState, useEffect } from 'react';
import Template1 from '../Components/Templates/Template1/Template1';
import Template2 from '../Components/Templates/Template2/Template2';
import Template3 from '../Components/Templates/Template3/Template3';
import Template4 from '../Components/Templates/Template4/Template4'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { useParams } from 'react-router-dom';
import './CSS/ResumeBuilder.css';

const ResumeBuilder = () => {
  const { templateId } = useParams();
  return (
    <div className="resume-builder-container">
      <Navbar />
        <h1 className='h1-header-style'>Resume Builder</h1>
        {templateId==="1" && <Template1/>}
        {templateId==="2" && <Template2/>}
        {templateId==="3" && <Template3/>}
        {templateId==="4" && <Template4/>}
        <Footer/>
      </div>
  );
};

export default ResumeBuilder;