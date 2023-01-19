import React, { useState } from "react";
import Cell from "./Cell";
import NewGame from "./NewGame";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board(props) {
  const [nrows, setNrows] = useState(6);
  const [ncols, setNcols] = useState(6);
  const [chance, setChance] = useState(0.25);
  const [board, setBoard] = useState(createBoard(nrows, ncols, chance));

  function newGame(rowsNCols, chanceLightsOn) {
    setNcols((c) => (c = rowsNCols));
    setNrows((r) => (r = rowsNCols));
    setChance((c) => (c = chanceLightsOn));
    setBoard(createBoard(rowsNCols, rowsNCols, chanceLightsOn));
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(rows, cols, chanceLightsOn) {
    let initialBoard = [];
    for (let i = 0; i < rows; i++) {
      let row = Array.from({ length: cols }, () => {
        // if testing return easily won, predictable board
        return props.test ? false : Math.random() < chanceLightsOn;
      });
      initialBoard.push(row);
    }
    // if testing return easily won, predictable board
    if (props.test) {
      initialBoard[0][0] = true;
      initialBoard[0][1] = true;
      initialBoard[1][0] = true;
      return initialBoard;
    }
    if (initialBoard.every((row) => row.every((c) => c === false))) {
      return createBoard(rows, cols, chanceLightsOn);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every((row) => row.every((c) => c === false));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      const boardCopy = oldBoard.map((row) => [...row]);
      // const boardCopy = structuredClone(oldBoard);

      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  let body;
  if (hasWon()) {
    body = <p className="fs-1">You Win!</p>;
  } else {
    // make table board
    let tblBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            testId={coord}
            isLit={board[y][x]}
            bigBoard={nrows + ncols == 18}
            flipCellsAroundMe={() => flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    body = (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }
  return (
    <>
      {body}
      <NewGame newGame={newGame} />
    </>
  );
}

export default Board;
