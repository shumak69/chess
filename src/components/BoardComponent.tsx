import { Board } from "../models/Board";
import { Fragment, useState, useEffect } from "react";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

function BoardComponent({ board, setBoard, swapPlayer, currentPlayer }: BoardProps) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  function selectFigure(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else if (selectedCell === cell) {
      console.log(selectedCell, cell);
      setSelectedCell(null);
    } else if (cell.figure) {
      if (cell.figure.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    hightlightCells();
  }, [selectedCell]);

  function hightlightCells() {
    board.hightlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: 20, fontSize: 20 }}>
        Текущий игрок {currentPlayer?.color}
      </h3>
      <div className="board">
        {board.cells.map((row, index) => (
          <Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                selectFigure={selectFigure}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default BoardComponent;
