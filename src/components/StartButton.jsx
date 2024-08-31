import React from 'react';

const StartButton = ({ onStart }) => {
  return (
    <button onClick={onStart} className="start-button">
      Start / Restart Game
    </button>
  );
};

export default StartButton;
