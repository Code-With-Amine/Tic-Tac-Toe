import React, { useEffect, useState } from "react";
import GameOver from "./GameOver";
import { useScoresContext } from "../provider/ScoresProvider";

function Game() {
  const { setUserScore, setCpuScore, gameLevel } = useScoresContext();

  const initPlayGround = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [playGround, setPlayGround] = useState(initPlayGround);
  const [isGameOver, setIsGameOver] = useState(false);
  const [whoWon, setWhoWon] = useState(null);
  const [currPlayer, setCurrPlayer] = useState("X");

  function PlayAgain() {
    setPlayGround(initPlayGround);
    setIsGameOver(false);
  }

  function RandMove(){
    const availableCells = []; // storing the empty cells
    for (let i = 0; i < playGround.length; i++) {
      for (let j = 0; j < playGround[i].length; j++) {
        if (playGround[i][j] === "") {
          availableCells.push([i, j]);
        }
      }
    }
    if (availableCells.length > 0) {
      // if there are any avialabel cells
      const randomCell =
        availableCells[Math.floor(Math.random() * availableCells.length)];
      const [rowIndex, colIndex] = randomCell;
      const copyPlayGround = [...playGround];
      copyPlayGround[rowIndex][colIndex] = "O";
      setCurrPlayer("X");
      setPlayGround(copyPlayGround);
    }

  }
  function SmartMove() {
    const copyPlayGround = [...playGround];
    let isMoved = false;
  
    for (let row = 0; row < copyPlayGround.length; row++) {
      for (let col = 0; col < copyPlayGround.length; col++) {
        if (copyPlayGround[row][col] === 'X' || copyPlayGround[row][col] === 'O') {
          if (col + 1 < copyPlayGround[row].length && copyPlayGround[row][col + 1] === '') {
            copyPlayGround[row][col + 1] = 'O';
            isMoved = true;
            break;
          } else if (col - 1 >= 0 && copyPlayGround[row][col - 1] === '') {
            copyPlayGround[row][col - 1] = 'O';
            isMoved = true;
            break;
          } else if (row + 1 < copyPlayGround.length && copyPlayGround[row + 1][col] === '') {
            copyPlayGround[row + 1][col] = 'O';
            isMoved = true;
            break;
          } else if (row + 1 < copyPlayGround.length && col + 1 < copyPlayGround[row].length && copyPlayGround[row + 1][col + 1] === '') {
            copyPlayGround[row + 1][col + 1] = 'O';
            isMoved = true;
            break;
          } else if (row + 1 < copyPlayGround.length && col - 1 >= 0 && copyPlayGround[row + 1][col - 1] === '') {
            copyPlayGround[row + 1][col - 1] = 'O';
            isMoved = true;
            break;
          }
        }
      }
      if (isMoved) break;
    }
  
    if (!isMoved) {
      RandMove();
    }
  
    setCurrPlayer('X');
    setPlayGround(copyPlayGround);
  }
  

  function CpuPlay() {
    if (gameLevel == 1) {
      RandMove();
    } 
    else {
      SmartMove();
    }
  }

  function UserPlay(rowIndex, colIndex) {
    if (!isGameOver && playGround[rowIndex][colIndex] === "") {
      const copyPlayGround = [...playGround];
      copyPlayGround[rowIndex][colIndex] = "X";
      setCurrPlayer("O");
      setPlayGround(copyPlayGround);
    } else {
      alert("The game is over.");
    }
  }

  function GameEnded(board) {
    setIsGameOver(true);
    setWhoWon(`${board} won, congrats`);
    setCurrPlayer(board);
    currPlayer === "O"
      ? setCpuScore((prev) => prev + 1)
      : setUserScore((prev) => prev + 1);
  }

  function CheckGameOver() {
    if (!isGameOver) {
      // check a winner in the rows horizantally
      for (let i = 0; i < playGround.length; i++) {
        if (
          playGround[i][0] !== "" &&
          playGround[i][0] === playGround[i][1] &&
          playGround[i][0] === playGround[i][2]
        ) {
          GameEnded(playGround[i][0]);
          return;
        }
      }

      // check for a winner in the rows vertically
      for (let j = 0; j < playGround[0].length; j++) {
        if (
          playGround[0][j] !== "" &&
          playGround[0][j] === playGround[1][j] &&
          playGround[0][j] === playGround[2][j]
        ) {
          GameEnded(playGround[0][j]);
          return;
        }
      }
      // check for a winner in the diagonals
      if (
        playGround[0][0] !== "" &&
        playGround[0][0] === playGround[1][1] &&
        playGround[0][0] === playGround[2][2]
      ) {
        GameEnded(playGround[0][0]);
        return;
      }

      if (
        playGround[0][2] !== "" &&
        playGround[0][2] === playGround[1][1] &&
        playGround[0][2] === playGround[2][0]
      ) {
        GameEnded(playGround[0][2]);
        return;
      }
    }
  }

  useEffect(() => {
    CheckGameOver();
    if (!isGameOver && currPlayer === "O") {
      setTimeout(CpuPlay, 700);
    }
  }, [isGameOver, currPlayer]);

  return (
    <div className="">
      {playGround.map((row, rowIndex) => (
        <div className="row-container" key={rowIndex}>
          {row.map((place, colIndex) => (
            <div
              onClick={() => UserPlay(rowIndex, colIndex)}
              className="place"
              key={`${rowIndex}-${colIndex}`}
            >
              {place}
            </div>
          ))}
        </div>
      ))}
      {isGameOver && <GameOver winnerMess={whoWon} />}
      <button className="playAginBtn" onClick={PlayAgain}>
        Play Again
      </button>
    </div>
  );
}

export default Game;
