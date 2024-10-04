import React from 'react';
import { useDrag } from 'react-dnd';
import '../styles/CourseItem.css';

const CourseItem = ({ course }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COURSE',
    item: { id: course.id, title: course.title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="course-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {course.title}
    </div>
  );
};

export default CourseItem;
