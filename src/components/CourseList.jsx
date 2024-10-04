import React from 'react';
import CourseItem from './CourseItem';

const courses = [
  { id: 1, title: 'User Experience Design Studio I: Fundamentals', type: 'Design' },
  { id: 2, title: 'Geometric Modeling for Visualization and Visualization', type: 'Design' },
  { id: 3, title: 'Internet Foundations Technologies And Development', type: 'Programming' },
  { id: 4, title: 'Web Programming, Development And Data Integration', type: 'Programming' },
  { id: 5, title: 'Advanced Web Programming, Development And Data Integration', type: 'Database' },
  { id: 6, title: 'Introduction To Data Visualization', type: 'Other' },
  { id: 7, title: 'Principles Of Interactive And Dynamic Media', type: 'Design' },
  { id: 8, title: 'Computer Graphics Programming I', type: 'Programming' },
  { id: 9, title: 'Computer Graphics Professional Practices I', type: 'Programming' },
  { id: 10, title: 'Computer Graphics Professional Practices II', type: 'Programming' },
  { id: 11, title: 'Contemporary Problems In Applied Computer Graphics I', type: 'Programming' },
];

const CourseList = () => {
  return (
    <div className="course-list">
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
