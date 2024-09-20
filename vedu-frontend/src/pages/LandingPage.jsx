import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo2.png";
import video1 from "../assets/video3.mp4";
import video2 from "../assets/video4.mp4";
import { features, testimonials } from "../constants";
import { CheckCircle2 } from "lucide-react";
import codeImg from "../assets/code.jpg";
import {
  checklistItems,
  resourcesLinks,
  platformLinks,
  communityLinks,
  navItems,
} from "../constants";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleSignInClick = () => {
    navigate("/login");
  }

  const handleRegister = () => {
    navigate("/register");
  }

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo-container">
              <img className="logo" src={logo} alt="Logo" />
              <span className="logo-text">VEDU</span>{" "}
            </div>
            <ul className="nav-links">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <a href="#" className="btn-signin" onClick={handleSignInClick}>
                Sign In
              </a>
              <a href="#" className="btn-create"  onClick={handleRegister}>
                Register
              </a>
            </div>
            <div className="menu-toggle">
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="mobile-menu">
              <ul>
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
              <div className="mobile-actions">
                <a href="#" className="btn-signin">
                  Sign In
                </a>
                <a href="#" className="btn-create">
                  Create an account
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container main-content">
        <div className="intro-section">
          <h1 className="intro-title">
            Virtual Classroom with <span className="highlighted">AI</span>
          </h1>
          <p className="intro-text">
            Engage in real-time collaboration, live chat, and AI-powered
            assistance with seamless video and screen sharing tools. Our
            platform empowers instructors and students with interactive features
            for enhanced learning.
          </p>
          <div className="intro-buttons">
            <a href="#" className="btn-start" onClick={handleSignInClick}>
              Get Started
            </a>
          </div>
          <div className="video-section">
            <video autoPlay loop muted className="video">
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <video autoPlay loop muted className="video">
              <source src={video2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="features-section" id="Features">
          <span className="badge">Feature</span>
          <h2 className="features-title">
            Transform{" "}
            <span className="highlighted">your learning experience</span>
          </h2>
          <div className="features-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h5 className="feature-title">{feature.text}</h5>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="workflow-section" id="Workflow">
          <h2 className="workflow-title">
            Empower your{" "}
            <span className="highlighted">collaborative sessions</span>
          </h2>
          <div className="workflow-content">
            <div className="workflow-image">
              <img src={codeImg} alt="Collaborative Compiler" />
            </div>
            <div className="workflow-checklist">
              {checklistItems.map((item, index) => (
                <div key={index} className="checklist-item">
                  <div className="checklist-icon">
                    <CheckCircle2 />
                  </div>
                  <div className="checklist-content">
                    <h5 className="checklist-title">{item.title}</h5>
                    <p className="checklist-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="testimonials-section" id="Testimonials">
          <h2 className="testimonials-title">What Users Are Saying</h2>
          <div className="testimonials-list">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-item">
                <p>{testimonial.text}</p>
                <div className="testimonial-user">
                  <img className="user-image" src={testimonial.image} alt="" />
                  <div>
                    <h6>{testimonial.user}</h6>
                    <span className="user-company">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="footer">
          <div className="footer-links">
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                {resourcesLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <h3>Platform</h3>
              <ul>
                {platformLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <h3>Community</h3>
              <ul>
                {communityLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
