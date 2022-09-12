import React, { useState } from 'react'
import Square from './components/Square'
import './App.css'

const App = () => {
  
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [marker, setMarker] = useState("X")
  const [turn, setTurn] = useState(1)
  const [winner, setWinner] = useState(null)
  const newBox = [...squares]
  
  const areAllEqual = (box, first, second, third) => {
    if ((box[first] === box[second]) && 
        (box[first] === box[third]) &&
        (box[first] !== null)) {
      return true
    }
    return false
  }

  const checkForWinner = (box) => {
    let winner = null
    
    // Check if row values are the same player
    let rowStarts = [0, 3, 6]
    rowStarts.forEach(rowStart => {
      if (areAllEqual(box, rowStart, rowStart + 1, rowStart + 2)) {
        winner = box[rowStart]
      }
    })

    // Check if column values are the same player
    let columnStarts = [0, 1, 2]
    columnStarts.forEach(columnStart => {
      if (areAllEqual(box, columnStart, columnStart + 3, columnStart + 6)) {
        winner = box[columnStart]
      }
    })

    // Check if diagonals are the same player
    if (areAllEqual(box, 2, 4, 6)) {
      winner = box[2]
    }

    if (areAllEqual(box, 0, 4, 8)) {
      winner = box[0]
    }

    return winner
  }

  // click on a square to mark it
  // Player 1 and 2 can make a mark alternately
  const handleClickPlay = (index) => {
    let tempWinner = null

    if (winner) {
      alert(winner + ' wins!')
      return
    }

    if (turn > 9) {
      alert('game over')
      return
    }

    setTurn(turn + 1)

    if (newBox[index] === "X" || newBox[index] === "O"){
      alert("Try another box")
    } else if (marker === "X") {       
      newBox[index] = "X"
      setMarker("O")
    } else if (marker === "O"){
      newBox[index] = "O"
      setMarker("X")
    } 

    setSquares(newBox)

    tempWinner = checkForWinner(newBox)
    setWinner(tempWinner)

    if (tempWinner != null) {
      alert(tempWinner + ' wins!')
    }

    if (turn == 9) {
      alert('game over')
    }

  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
{/* // Creates a column of 9 squares */}      
      <div className= "board">

      {squares.map((value,index) => {
        return(
      
      <Square value={value} index={index} handleClickPlay={handleClickPlay} key={index}/>
        )})}
      </div>  

   </>
   )
}


export default App