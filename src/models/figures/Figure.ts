import { Colors } from "../Colors";
import logo from "../../assets/black-bishop.png";
import { Cell } from "../Cell";

export enum FigureNames {
  FIGURE = "Figure",
  KING = "King",
  KNIGHT = "Knight",
  PAWN = "Pawn",
  QUEEN = "Queen",
  ROOK = "Rook",
  BISHOP = "Bishop",
}
export abstract class Figure {
  logo: typeof logo | null;
  name: FigureNames;
  id: number;
  constructor(public color: Colors, public cell: Cell) {
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) return false;
    if (target.figure?.name === FigureNames.KING) return false;
    return true;
  }
  moveFigure(target: Cell) {}
}
