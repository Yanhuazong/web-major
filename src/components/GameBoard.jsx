import React from 'react';
// import './GameBoard.css';

const GameBoard = ({ grid, blockPosition }) => {
  return (
    <div className="game-board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`cell ${
                rowIndex === blockPosition.y && cellIndex === blockPosition.x
                  ? 'filled'
                  : cell ? 'locked' : ''
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
