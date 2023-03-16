const ScoreBoard = ({ score }) => {
    return (
      <div className="score-board">
       <div>{score}</div> 
       <div>HighScore : </div> 
      </div>
    )
  }
  
  export default ScoreBoard