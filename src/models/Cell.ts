import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
  available: boolean; // could move
  id: number;

  constructor(
    public board: Board,
    readonly x: number,
    readonly y: number,
    readonly color: Colors,
    public figure: Figure | null
  ) {
    this.available = false;
    this.id = Math.random();
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    return target.figure !== null;
  }

  isEmptyVertical(target: Cell): boolean {
    // если вертикаль другая
    if (this.x !== target.x) {
      return false;
    }
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y); //по модулю
    // если не диагональ
    if (absX !== absY) {
      return false;
    }
    const dy = this.y < target.y ? 1 : -1; // направление от текущей точки
    const dx = this.x < target.x ? 1 : -1; // направление от текущей точки
    for (let i = 1; i < absX; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this; // кольцевая зависимость
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      this.figure.moveFigure(target); //for pawn
      // target.figure = this.figure;
      // target.figure.cell = target;
      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
