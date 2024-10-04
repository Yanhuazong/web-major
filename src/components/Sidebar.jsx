import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <header className="page-header">
        <img src="../../../imgs/Polytech_H-Full-RGB.svg" alt="Logo" className="logo" />
      </header>
      <ul>
        <li>
          <Link to="/" className="sidebar-item">
            <span className="icon">🏠</span>
            <span className="text">Intro</span>
          </Link>
        </li>
        <li>
          <Link to="/courses" className="sidebar-item">
            <span className="icon">📚</span>
            <span className="text">Courses</span>
          </Link>
        </li>
        <li>
          <Link to="/projects" className="sidebar-item">
            <span className="icon">💻</span>
            <span className="text">Student Projects</span>
          </Link>
        </li>
        <li>
          <Link to="/ai-usage" className="sidebar-item">
            <span className="icon">🤖</span>
            <span className="text">AI Usage</span>
          </Link>
        </li>
        <li>
          <Link to="/data" className="sidebar-item">
            <span className="icon">📊</span>
            <span className="text">Data</span>
          </Link>
        </li>
      </ul>

    </div>
  );
};

export default Sidebar;
