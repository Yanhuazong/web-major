import React from 'react';
import { useDrop } from 'react-dnd';
import '../styles/CategoryDropZone.css';

const CategoryDropZone = ({ category, description, icon, courses, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COURSE',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="category-dropzone"
      style={{ backgroundColor: isOver ? '#f0f0f0' : 'white' }}
    >
      <h3>{icon} {category}</h3>
      <p>{description}</p>
      {courses.map((course, index) => (
        <p key={index} className="dropped-course">
          {course.title}
        </p>
      ))}
    </div>
  );
};

export default CategoryDropZone;
