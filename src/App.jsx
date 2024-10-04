import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import CoursesPage from './pages/CoursesPage';
import StudentProjectsPage from './pages/StudentProjectsPage';
import AIUsagePage from './pages/AIUsagePage';
import DataPage from './pages/DataPage';
import Sidebar from './components/Sidebar';
import PageNavigation from './components/PageNavigation';
import './styles/App.css';

function App() {
  const routes = ['/', '/courses', '/projects', '/ai-usage', '/data'];
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/projects" element={<StudentProjectsPage />} />
            <Route path="/ai-usage" element={<AIUsagePage />} />
            <Route path="/data" element={<DataPage />} />
          </Routes>
        </div>
        <PageNavigation routes={routes} />
      </div>
    </Router>
  );
}

export default App;
