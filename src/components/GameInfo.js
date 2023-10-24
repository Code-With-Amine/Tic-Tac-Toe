import React from 'react'
import { useScoresContext } from '../provider/ScoresProvider';

function GameInfo() {
  const { CpuScore,  userScore, gameLevel,  setGameLevel} = useScoresContext();
    const date = new Date();
    const currDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();

  return (
    <div className='GameIfo'>
        <span>Date: {currDate}</span>
        <span>Score: {`${CpuScore} - ${userScore }`} </span> 
        <select value={gameLevel} onChange={(e) => setGameLevel(e.target.value)}>
            <option value="1">LEVEL 1</option>
            <option value="2">LEVEL 2</option>
        </select>
    </div>
  )
}

export default GameInfo