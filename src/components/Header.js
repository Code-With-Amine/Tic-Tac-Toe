import React from 'react';
import GameInfo from './GameInfo';

function Header() {
  return (
    <div className='GameHeader'>
    <h1>Tic Tac Toe</h1>
    <GameInfo />
    </div>
  )
}

export default Header