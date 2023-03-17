import { useState, useEffect } from 'react';

const ScoreBoard = ({ scoreDisplay , timeLeft , gameResult , handlePlayAgainClick }) => {


    
    return (

          <div className="score-board">

              <div>Score: {scoreDisplay}</div>

              <div>Time left: {timeLeft}</div>

              {timeLeft === 0 && (

              <div>
                      {gameResult}

                      <button className='start-game' onClick={handlePlayAgainClick}>Play again</button>
              </div>
                      )}

          </div>

    )};
    
    
    export default ScoreBoard;