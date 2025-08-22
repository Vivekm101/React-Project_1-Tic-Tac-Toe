import Player from "./Component/Player"
import GameBoard from "./Component/GameBoard"
import { useState } from "react"
import Log from "./Component/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./Component/GameOver";

function deriveActivePlayer(gameTurns){

  let currentPlayer='X';
      
      if(gameTurns.length > 0 && gameTurns[0].Player === 'X'){
        currentPlayer = 'O';
      }

      return currentPlayer;
}

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
//  const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

    for(const turn of gameTurns){
        const {square, Player} = turn;
        const {row, col} = square;

        gameBoard[row] [col] = Player;
    }
  
    let winner = null;

    for (const combination of WINNING_COMBINATIONS ){

      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondtSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol &&
      firstSquareSymbol === secondtSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ){
        winner = firstSquareSymbol;
    }
    
    }

    

  function handleSelectSquare(rowIndex,colIndex){
 //   setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) =>{

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {square: { row: rowIndex, col: colIndex }, Player: currentPlayer},
        ...prevTurns,
      ];
      return updatedTurns;

    });
  }

  return (
    <>
      <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActivePlayer={activePlayer === 'X'} />
        <Player initialName="Player 2" symbol="O" isActivePlayer={activePlayer === 'O'}/>
        </ol>
        {winner && <GameOver winner={winner}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
      </main>
    </>
  )
}

export default App
