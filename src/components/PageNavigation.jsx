import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/PageNavigation.css';

const PageNavigation = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentIndex = routes.indexOf(location.pathname);

  const handleNextPage = () => {
    if (currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    }
  };

  const handlePrevPage = () => {
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    }
  };

  return (
    <div className="page-navigation">
      {currentIndex > 0 && (
        <button className="nav-button left" onClick={handlePrevPage}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      {currentIndex < routes.length - 1 && (
        <button className="nav-button right" onClick={handleNextPage}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
};

export default PageNavigation;
