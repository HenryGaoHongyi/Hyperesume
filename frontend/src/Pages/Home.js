import React from 'react';
import HomeImg from '../Assets/home-img.png';
import Navbar from '../Components/Navbar/Navbar';
import './CSS/Home.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FileText, Clock, Magic, Download, Star, Users } from 'lucide-react';
import Footer from '../Components/Footer/Footer';
import AnimatedCounter from '../Components/AnimatedCounter/AnimatedCounter';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const handleGetStarted = () => {
    navigate(isAuthenticated ? '/templates' : '/login');
  };

  const features = [
    {
      icon: <FileText size={24} />,
      title: "Professional Templates",
      description: "Choose from our carefully crafted collection of professional resume templates."
    },
    {
      icon: <Clock size={24} />,
      title: "Quick & Easy",
      description: "Build your perfect resume in minutes with our intuitive interface."
    },
    {
      icon: <Download size={24} />,
      title: "Easy Export",
      description: "Download your resume in PDF format, ready for submission."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "Hyperesume helped me land my dream job! The templates are professional and the interface is so easy to use."
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      content: "I love how quickly I can update my resume. The AI suggestions are incredibly helpful for improving my content."
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      content: "The modern designs and customization options allowed me to create a resume that truly represents my personal brand."
    }
  ];

  return (
    <div className='home-container'>
      <Navbar/>
      
      {/* Hero Section */}
      <div className='landing-container'>
        <div className='home-text-container'>
          <h1>Build your Perfect Resume in Minutes!</h1>
          <p>Hyperesume is a powerful resume builder designed to help job seekers create professional, personalized resumes effortlessly. 
            With easy-to-use templates, live editing, and seamless PDF export, Hyperesume allows users to showcase their skills and 
            experiences in a format that stands out.</p>
          <button onClick={handleGetStarted}>
            {isAuthenticated ? "Browse Templates" : "Join us now"}&nbsp;&gt;&gt;
          </button>
        </div>
        <div className='home-image-container'>
          <img src={HomeImg} alt="Resume"/>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-item">
          <Star className="stat-icon" />
          <h3><AnimatedCounter end={10000} duration={2000} /></h3>
          <p>Resumes Created</p>
        </div>
        <div className="stat-item">
          <Users className="stat-icon" />
          <h3><AnimatedCounter end={5000} duration={2000} /></h3>
          <p>Happy Users</p>
        </div>
        <div className="stat-item">
          <FileText className="stat-icon" />
          <h3><AnimatedCounter end={50} duration={1500} /></h3>
          <p>Templates</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Hyperesume?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Build Your Perfect Resume?</h2>
        <p>Join thousands of successful job seekers who have already created winning resumes with Hyperesume.</p>
        <button onClick={handleGetStarted}>
          {isAuthenticated ? "Browse Templates" : "Get Started Free"}&nbsp;&gt;&gt;
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;