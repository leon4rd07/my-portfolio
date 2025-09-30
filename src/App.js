import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

import profilePic from "./assets/profile.jpg";
import spaceDefense from "./assets/space-defense.jpg";
import compVis from "./assets/compvis.jpg";
import yayStock from "./assets/yaystock.jpg";
import deepL from "./assets/deepLearning.png";

import "./App.css";

const projectsData = [
  {
    id: 1,
    title: "Space Defense – Interactive Computer Graphics Project",
    description:
      "This project is an interactive 3D space defense simulation built using Node.js and HTML with WebGL/Three.js for real-time rendering. The player controls a space station and must defend against incoming asteroids by maneuvering and shooting them before collision.",
    image: spaceDefense,
    technologies: ["HTML", "Node.js", "CSS", "Three.js"],
    liveUrl: "https://your-ecommerce-demo.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    featured: true,
  },
  {
    id: 2,
    title: "Face Detection and Image Processing with OpenCV",
    description:
      "This project uses Python and OpenCV to perform real-time image processing and face detection with Haar cascades. It applies privacy filters like blurring and showcases techniques such as median blur, adaptive thresholding, and edge detection (Sobel, Prewitt, Laplacian).",
    image: compVis,
    technologies: ["Python", "OpenCV"],
    liveUrl: "https://your-taskapp-demo.com",
    githubUrl: "https://github.com/yourusername/task-management",
    featured: true,
  },
  {
    id: 3,
    title: "YayStock – Inventory Management System",
    description:
      "YayStock is a Java-based inventory management application developed with JavaFX in Eclipse. The project started by analyzing real-world stock management challenges faced by small businesses, followed by creating a business analysis report and Figma mockup to design a user-friendly interface. The final application supports features like stock tracking, warehouse and store management, transaction recording, and low-stock alerts.",
    image: yayStock,
    technologies: ["Java", "JavaFX", "MySQL"],
    liveUrl: "https://your-weather-demo.com",
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    featured: false,
  },
  {
    id: 4,
    title: "Deep Learning Qualification Case",
    description:
      "Successfully developed three advanced deep learning models as part of a qualification project. A Deep Convolutional Neural Network (DCNN) was built and trained on an image dataset with preprocessing and multi-layer architecture for classification tasks. A Variational Autoencoder was implemented to reconstruct images and analyze reconstruction loss. Finally, a Self-Supervised Learning model was designed from scratch on a text dataset without relying on prebuilt models, achieving high accuracy.",
    image: deepL,
    technologies: ["Python", "Keras", "TensorFlow", "NumPy",],
    liveUrl: "https://your-portfolio.com",
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: false,
  },
];

// Personal Information - Update with your details
const personalInfo = {
  name: "Leonardo Nathaniel Lembono",
  bio: "Enthusiastic college student with a strong foundation in coding and problem-solving. Experienced in multiple programming languages and frameworks, I enjoy collaborating on projects that blend creativity, technology, and real-world impact.",
  email: "hpleonardonl@gmail.com",
  github: "github.com/leon4rd07",
  linkedin: "linkedin.com/in/leonardonl",
};

// Dark Mode Toggle Component
const DarkModeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="dark-mode-toggle"
      aria-label="Toggle dark mode"
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </div>
      </div>
    </button>
  );
};

// Project Card Component
const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {project.featured && <div className="featured-badge">Featured</div>}

      <div className="project-image">
        <img
          src={project.image}
          alt={project.title}
          className={isHovered ? "hovered" : ""}
        />
        <div className="project-overlay">
          <div className="project-gradient"></div>
        </div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <Github size={16} />
            <span>Code</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from user's preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === "true");
    } else {
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle scroll for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-text">Portfolio</span>
            </div>

            <div className="nav-desktop">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${
                    activeSection === item.id ? "active" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <DarkModeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
            </div>

            <div className="nav-mobile-controls">
              <DarkModeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
              <button
                className="nav-mobile-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="nav-mobile">
            <div className="nav-mobile-content">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="nav-mobile-link"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <img src={profilePic} alt="Profile" className="avatar-img" />
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="hero-name">{personalInfo.name}</span>
          </h1>

          <p className="hero-bio">{personalInfo.bio}</p>

          <div className="hero-actions">
            <button
              onClick={() => scrollToSection("projects")}
              className="btn btn-primary btn-large"
            >
              View My Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn btn-outline btn-large"
            >
              Get In Touch
            </button>
          </div>

          <div className="hero-social">
            <a href={`mailto:${personalInfo.email}`} className="social-link">
              <Mail size={24} />
            </a>
            <a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Github size={24} />
            </a>
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Linkedin size={24} />
            </a>
          </div>

          <ChevronDown
            className="hero-scroll"
            onClick={() => scrollToSection("projects")}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">My Projects</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Here are some of the projects I've worked on. Each one represents
              a different challenge and learning experience.
            </p>
          </div>

          <div className="projects-grid">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="projects-footer">
            <p className="footer-text">Want to see more of my work?</p>
            <a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <Github size={20} />
              <span>View All Projects on GitHub</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Let's Connect</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Interested in working together? I'd love to hear from you.
            </p>
          </div>

          <div className="contact-grid">
            <a href={`mailto:${personalInfo.email}`} className="contact-card">
              <Mail size={40} className="contact-icon" />
              <h3 className="contact-title">Email</h3>
              <p className="contact-text">{personalInfo.email}</p>
            </a>

            <a
              href={`https://${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <Github size={40} className="contact-icon" />
              <h3 className="contact-title">GitHub</h3>
              <p className="contact-text">{personalInfo.github}</p>
            </a>

            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <Linkedin size={40} className="contact-icon" />
              <h3 className="contact-title">LinkedIn</h3>
              <p className="contact-text">{personalInfo.linkedin}</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            © 2025 {personalInfo.name}. Built with React and CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
