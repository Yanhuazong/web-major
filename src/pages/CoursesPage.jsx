import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CourseList from "../components/CourseList";
import CategoryDropZone from "../components/CategoryDropZone";
import "../styles/CoursesPage.css";
import { desc } from "framer-motion/client";
// Icons (example FontAwesome imports)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush, faCode, faDatabase } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [categories, setCategories] = useState({
    Design: {
      courses: [],
      description: "Learn design principles, user experience, and prototyping.",
      icon: <FontAwesomeIcon icon={faPaintBrush} />,
    },
    Programming: {
      courses: [],
      description: "Develop interactive user interfaces, secure backends, and work with APIs.",
      icon: <FontAwesomeIcon icon={faCode} />,
    },
    Database: {
      courses: [],
      description: "Learn how to manage and query databases like MySQL.",
      icon: <FontAwesomeIcon icon={faDatabase} />,
    },
  });

  const handleDrop = (course, category) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [category]: {
        ...prevCategories[category],
        courses: [...prevCategories[category].courses, course],
      },
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="courses-page animated-headline">
        <h1>Our Courses</h1>

        <div className="categories-container">
          <div className="dropzones">
            {Object.keys(categories).map((category) => (
              <CategoryDropZone
              key={category}
              category={category}
              description={categories[category].description} // Pass description
              icon={categories[category].icon} // Pass icon
              courses={categories[category].courses}
              onDrop={(course) => handleDrop(course, category)}
              />
            ))}
          </div>
        </div>
        <div className="courses-container">
          <CourseList />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
