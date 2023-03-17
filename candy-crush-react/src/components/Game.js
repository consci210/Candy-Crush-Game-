import React from 'react'
import {useEffect, useState} from 'react'
import ScoreBoard from './ScoreBoard'
import blueCandy from '../images/blue-candy.png'
import greenCandy from '../images/green-candy.png'
import orangeCandy from '../images/orange-candy.png'
import purpleCandy from '../images/purple-candy.png'
import redCandy from '../images/red-candy.png'
import yellowCandy from '../images/yellow-candy.png'
import blank from '../images/blank.png'

const width = 8

const candyColors = [
    blueCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
    greenCandy
]

const Game = () => {



    const [timeLeft, setTimeLeft] = useState(30);
    const [gameResult, setGameResult] = useState(null);
    const [currentColorArrangement, setCurrentColorArrangement] = useState([])
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)



    // Checks for win when timer stops . 
    useEffect(() => {

        if (timeLeft === 0) {

            if (scoreDisplay >= 50) {
                    setGameResult('You won!');

            } else {
                    setGameResult('You lost!');
            }
        }},  [timeLeft, scoreDisplay]);

    
    // Countdown timer 
    useEffect(() => {
        const interval = setInterval(() => {

        if (timeLeft > 0) {

            setTimeLeft(timeLeft - 1);

        } else {
            // if timer === 0 then it stops . To avoid negative time values 
            clearInterval(interval);
        }
        }, 1000);

            return () => clearInterval(interval);

        }, [timeLeft]);

    
    // Resets score and timer 
    const handlePlayAgainClick = () => {
        setScoreDisplay(0) ;
        setTimeLeft(30);
        setGameResult(null);
        };

    //Functions to check for valid matches 

    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                columnOfFour.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    }

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                rowOfFour.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i]
            const isBlank = currentColorArrangement[i] === blank

            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 3)
                columnOfThree.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    }

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isBlank = currentColorArrangement[i] === blank

            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 3)
                rowOfThree.forEach(square => currentColorArrangement[square] = blank)
                return true
            }
        }
    }

    // moves squares on top to the blank spaces below them

    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === blank) {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }

            if ((currentColorArrangement[i + width]) === blank) {
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = blank
            }
        }
    }

    // handle drag events 

    const dragStart = (e) => {
        if (e.target && e.target.getAttribute('data-id')) {
          setSquareBeingDragged(e.target);
        } else {
          console.error('Invalid drag start event');
        }
      };
      
      const dragDrop = (e) => {
        if (e.target && e.target.getAttribute('data-id')) {
          setSquareBeingReplaced(e.target);
        } else {
          console.error('Invalid drag drop event');
        }
      };
      
      const dragEnd = () => {
        if (squareBeingDragged && squareBeingReplaced) {
          const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
          const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));
          const validMoves = [squareBeingDraggedId - 1,squareBeingDraggedId - width, squareBeingDraggedId + 1,squareBeingDraggedId + width ];
          const validMove = validMoves.includes(squareBeingReplacedId);
      
         
          if( validMove) {
                currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src');
                currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src');

                const isAColumnOfFour = checkForColumnOfFour();
                const isARowOfFour = checkForRowOfFour();
                const isAColumnOfThree = checkForColumnOfThree();
                const isARowOfThree = checkForRowOfThree();

            if (!(squareBeingReplacedId && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree))){
                currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
                currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
                setCurrentColorArrangement([...currentColorArrangement]);
                setSquareBeingDragged(null);
                setSquareBeingReplaced(null);
          }

        } else {
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src');
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src');
            setCurrentColorArrangement([...currentColorArrangement]);
          }
        } else {
          console.error('Invalid drag end event');
        }
      };
      

    // creates new board with random arrangement 

    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor)
        }
        setCurrentColorArrangement(randomColorArrangement)
    }

    // since it shall happen on load time we apply useEffect 

    useEffect(() => {
        createBoard()
    }, [])

    // calls the match checker functions every 0.1 second 

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour()
            checkForRowOfFour()
            checkForColumnOfThree()
            checkForRowOfThree()
            moveIntoSquareBelow()
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])



  return (

    <div className="app">
            <ScoreBoard 
            scoreDisplay={scoreDisplay}
            timeLeft={timeLeft}
            gameResult={gameResult}
            handlePlayAgainClick = {handlePlayAgainClick}
            />
            
            <div className="game">
                {currentColorArrangement.map((candyColor, index) => (
                    <img
                        key={index}
                        src={candyColor}
                        alt={candyColor}
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                    />
                ))}
            </div>
        </div>
   
  
    )

}

export default Game