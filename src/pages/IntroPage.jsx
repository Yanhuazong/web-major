import React from "react";
import "../styles/IntroPage.css";

const websiteImages = [
  "/img-1.png",
  "/img-2.png",
  "/img-7.png",
  "/img-4.png",  
  "/img-8.png",
  "/img-6.png",
  "/img-3.png",
  "/img-5.png",
];

const IntroPage = () => {
  const handleImageClick = (e) => {
    e.target.classList.toggle("scaled");
  };

  return (
    <div className="intro">
      <div className="intro-text">
        <h1 className="animated-headline"><span>Computer Graphics Technology</span>Web Development and Design</h1>
        <p className="animated-headline">Explore the Future of Web Technologies with Purdue University</p>
      </div>
      <div className="intro-gallery">
        <h2>Common Websites and Apps</h2>
        <div className="gallery">
          {websiteImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Website ${index + 1}`}
              className="gallery-image"
              onClick={handleImageClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
