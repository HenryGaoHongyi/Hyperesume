import React from 'react';
import './Footer.css';
import { Linkedin, Github, Twitter, Mail, Phone } from 'lucide-react';

const Footer = ({ handleSignOut }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Navigation */}
        <div className="footer-section">
          <h3>Navigation</h3>
          <nav className="footer-nav">
            <a href="/" className="footer-link">Home</a>
            <a href="/profile" className="footer-link">Profile</a>
            <a href="/templates" className="footer-link">Templates</a>
            <a href="/signout" className="footer-link" onClick={handleSignOut}>Sign out</a>
          </nav>
        </div>

        {/* Features Section */}
        <div className="footer-section">
          <h3>Features</h3>
          <nav className="footer-nav">
            <a href="/templates" className="footer-link" onClick={(e) => e.preventDefault()}>Resume Templates</a>
            <a href="/templates" className="footer-link" onClick={(e) => e.preventDefault()}>Resume Builder</a>
            <a href="/templates" className="footer-link" onClick={(e) => e.preventDefault()}>Resume Examples</a>
          </nav>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={16} />
              <a href="mailto:support@hyperesume.com" className="footer-link">support@hyperesume.com</a>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <span>1-123-456-7890</span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Hyperesume. All rights reserved.</p>
          <div className="legal-links">
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="/terms" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;