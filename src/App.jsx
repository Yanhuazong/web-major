import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard.jsx';
import Controls from './components/Controls.jsx';
import StartButton from './components/StartButton.jsx';
import './styles/App.css';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

const App = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0))
  );
  const [blockPosition, setBlockPosition] = useState({ x: 4, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // New state to track game start/restart

  const startGame = () => {
    setGrid(Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0)));
    setBlockPosition({ x: 4, y: 0 });
    setGameOver(false);
    setScore(0);
    setGameStarted(true); // Set game as started
  };

  const moveLeft = () => {
    if (blockPosition.x > 0 && grid[blockPosition.y][blockPosition.x - 1] === 0) {
      setBlockPosition(prevPosition => ({
        ...prevPosition,
        x: prevPosition.x - 1,
      }));
    }
  };

  const moveRight = () => {
    if (blockPosition.x < GRID_WIDTH - 1 && grid[blockPosition.y][blockPosition.x + 1] === 0) {
      setBlockPosition(prevPosition => ({
        ...prevPosition,
        x: prevPosition.x + 1,
      }));
    }
  };

  const moveDown = () => {
    const newPosition = { ...blockPosition, y: blockPosition.y + 1 };

    if (newPosition.y >= GRID_HEIGHT || grid[newPosition.y][newPosition.x] !== 0) {
      lockBlock();
      generateNewBlock();
    } else {
      setBlockPosition(newPosition);
    }
  };

  const lockBlock = () => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        if (rowIndex === blockPosition.y && cellIndex === blockPosition.x) {
          return 1; // Mark the cell as filled
        }
        return cell;
      })
    );
    setGrid(newGrid);
    checkForCompleteRows();
  };

  const checkForCompleteRows = () => {
    const newGrid = grid.filter(row => row.some(cell => cell === 0));
    const rowsCleared = GRID_HEIGHT - newGrid.length;

    if (rowsCleared > 0) {
      const newRows = Array.from({ length: rowsCleared }, () => Array(GRID_WIDTH).fill(0));
      setGrid([...newRows, ...newGrid]);
      setScore(score + rowsCleared * 10);
    }
  };

  const generateNewBlock = () => {
    const newPosition = { x: 4, y: 0 };

    if (grid[newPosition.y][newPosition.x] !== 0) {
      setGameOver(true);
      setGameStarted(false); // End the game
    } else {
      setBlockPosition(newPosition);
    }
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        moveDown();
      }, 100);

      return () => clearInterval(interval);
    }
  }, [blockPosition, gameStarted, gameOver]);

  return (
    <div className="app">
      <h1>Simplified Tetris</h1>
      <StartButton onStart={startGame} />
      {gameOver ? (
        <div className='game-over'>Game Over! Your score: {score}</div>
      ) : (
        gameStarted && (
          <>
            <GameBoard grid={grid} blockPosition={blockPosition} />
            <Controls moveLeft={moveLeft} moveRight={moveRight} moveDown={moveDown} />
            <div className="score">Score: {score}</div>
          </>
        )
      )}
    </div>
  );
};

export default App;
