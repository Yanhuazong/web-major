import React, { useState } from 'react';
import '../styles/StudentProjectsPage.css';

const liveProjects = [
  {
    id: 1,
    title: "Casteel Company Website",
    iframeSrc: "https://cgtweb2.tech.purdue.edu/courses/cgt356/rjglotz/BackUp/ABETAccreditation/Project2/good/Project2/index.php",
  },
  {
    id: 2,
    title: "Tetris Game",
    iframeSrc: "https://cgtweb2.tech.purdue.edu/courses/cgt353/rjglotz/WorkingSolutions/P2/Project2.html",
  },
];

const StudentProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  return (
    <div className="projects-page animated-headline">
      <h1>Student Projects</h1>
      <p className="intro-text-project">
        Our courses are project-based, designed to give students hands-on
        experience with real-world applications. 
      </p>
    <div className="project-wrap">
        {/* Live projects grid */}
        {liveProjects.map((project) => (
          <div
            key={project.id}
            className="project-card live-project-card"
            onClick={() => setSelectedProject(project)}
          >
            <h3>{project.title}</h3>
          </div>
        ))}
    </div>
      {selectedProject && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-close" onClick={closeLightbox}>
              &times;
            </span>
            <iframe
              src={selectedProject.iframeSrc}
              title={selectedProject.title}
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProjectsPage;
