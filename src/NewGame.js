import React, { useState } from "react";

function NewGame({ newGame }) {
  const [boardSize, setboardSize] = useState(6);
  const [chance, setChance] = useState(0.25);

  const handleClick = () => {
    newGame(boardSize, chance);
  };
  const boardSizeChange = (val) => {
    setboardSize(+val);
  };

  const chanceChange = (val) => {
    setChance(+val);
  };
  return (
    <div className="mt-4 controls">
        <button className="btn btn-warning me-3" onClick={handleClick}>
          New Game
        </button>
            <label htmlFor="board">
              Board Size:
            </label>
            <select
              className="form-select-lg mx-3"
              name="board"
              onChange={(e) => boardSizeChange(e.target.value)}
            >
              <option value="6">6x6</option>
              <option value="3">3x3</option>
              <option value="9">9x9</option>
            </select>

            <label htmlFor="chance">
              Chance lights on:
            </label>
            <select
              className="form-select-lg ms-3"
              name="chance"
              onChange={(e) => chanceChange(e.target.value)}
            >
              <option value=".25">25%</option>
              <option value=".5">50%</option>
              <option value=".75">75%</option>
            </select>
    </div>
  );
}

export default NewGame;
