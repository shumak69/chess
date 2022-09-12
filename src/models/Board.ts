import { Rook } from "./figures/Rook";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";

export class Board {
  cells: Cell[][] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // black cell
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // white cell
        }
      }
      this.cells.push(row);
    }
  }

  public hightlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard;
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }
  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }
  private addQuens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }
  private addBishops() {
    for (let i = 0; i < 2; i++) {
      new Bishop(Colors.BLACK, this.getCell(i * 3 + 2, 0));
      new Bishop(Colors.WHITE, this.getCell(i * 3 + 2, 7));
    }
  }
  private addKnights() {
    for (let i = 0; i < 2; i++) {
      new Knight(Colors.BLACK, this.getCell(i * 5 + 1, 0));
      new Knight(Colors.WHITE, this.getCell(i * 5 + 1, 7));
    }
  }
  private addRooks() {
    for (let i = 0; i < 2; i++) {
      new Rook(Colors.BLACK, this.getCell(i * 7, 0));
      new Rook(Colors.WHITE, this.getCell(i * 7, 7));
    }
  }

  public addFigures() {
    this.addPawns();
    this.addKings();
    this.addQuens();
    this.addBishops();
    this.addKnights();
    this.addRooks();
  }
}
