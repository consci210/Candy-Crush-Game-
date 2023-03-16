import { useState , useEffect } from "react"

const width = 8 
const candyColors =[
  "blue",
  "green" ,
  "orange" ,
  "purple" ,
  "red" ,
  "yellow" ,
]

const App = () => {
 
  const [currentColorArrangement , setCurrentColorArrangement ] = useState([])
  
  useEffect(() => {
    const createBoard = () => {

      const randomColorArrangement = []
      for (let i= 0 ; i < width*width ; i++){
        const randomNumber = Math.floor(Math.random()*candyColors.length)
        const randomColor = candyColors[randomNumber]
        randomColorArrangement.push(randomColor)
      }
      setCurrentColorArrangement(randomColorArrangement)
  }

    createBoard();
   
  }, [])

  console.log(currentColorArrangement)

  return (
      <div>
        
      </div>
  );
}

export default App;
