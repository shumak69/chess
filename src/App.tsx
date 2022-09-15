import "./App.css";
import BoardComponent from "./components/BoardComponent";
import { Board } from "./models/Board";
import { useState, useEffect } from "react";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures figures={board.lostBlackFigures} title="black" />
        <LostFigures figures={board.lostWhiteFigures} title="white" />
      </div>
    </div>
  );
}

export default App;
