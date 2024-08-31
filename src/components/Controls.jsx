import React from 'react';

const Controls = ({ moveLeft, moveRight, moveDown }) => {
  return (
    <div className="controls">
      <button onClick={moveLeft}>&larr;</button>
      <button onClick={moveDown}>&darr;</button>
      <button onClick={moveRight}>&rarr;</button>
    </div>
  );
};

export default Controls;
