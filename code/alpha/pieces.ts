/* use strict */

//Supporters
const alphabet = "abcdefgh";
class Piece {
  position: string;
  moved: boolean;
  color: string;
  constructor(position: string, color: string, moved = false) {
    this.position = position;
    this.moved = moved;
    this.color = color;
  }
  get pos() {
    return this.position;
  }
  get move() {
    return this.moved;
  }
  get colour() {
    return this.color;
  }
}
export class Pawn extends Piece {
  validateMove(move: string) {
    //TODO: implement promotion
    const fromX = alphabet.indexOf(this.position[0]);
    const fromY = parseInt(this.position[1]);
    const toX = alphabet.indexOf(move[0]);
    const toY = parseInt(move[1]);

    const distX = Math.abs(toX - fromX);
    const distY = Math.abs(toY - fromY);

    return (
      (distX == 0 && distY == 1) ||
      (move[2] == "x" && distX == 1 && distY == 1) ||
      (this.moved === false && distX === 0 && distY == 2)
    );
  }
}
export class Knight extends Piece {
  validateMove(move: string) {
    const fromX = alphabet.indexOf(this.position[0]);
    const fromY = parseInt(this.position[1]);
    const toX = alphabet.indexOf(move[0]);
    const toY = parseInt(move[1]);

    const distX = Math.abs(toX - fromX);
    const distY = Math.abs(toY - fromY);

    return (distX == 2 && distY == 1) || (distX == 1 && distY == 2);
  }
}
export class Bishop extends Piece {
  validateMove(move: string) {
    const fromX = alphabet.indexOf(this.position[0]);
    const fromY = parseInt(this.position[1]);
    const toX = alphabet.indexOf(move[0]);
    const toY = parseInt(move[1]);

    const distX = Math.abs(toX - fromX);
    const distY = Math.abs(toY - fromY);

    return distX == distY && distX < 8 && distY < 8;
  }
}
export class Rook extends Piece {
  validateMove(move: string) {
    const fromX = alphabet.indexOf(this.position[0]);
    const fromY = parseInt(this.position[1]);
    const toX = alphabet.indexOf(move[0]);
    const toY = parseInt(move[1]);

    const distX = Math.abs(toX - fromX);
    const distY = Math.abs(toY - fromY);

    return (distX < 8 && distY == 0) || (distX == 0 && distY < 8);
  }
}

export class Queen extends Piece {
  validateMove(move: string) {
    const fromX = alphabet.indexOf(this.position[0]);
    const fromY = parseInt(this.position[1]);
    const toX = alphabet.indexOf(move[0]);
    const toY = parseInt(move[1]);

    const distX = Math.abs(toX - fromX);
    const distY = Math.abs(toY - fromY);

    return (
      (distX === distY && distX < 8 && distY < 8) ||
      (distX == 0 && distY < 8) ||
      (distX < 8 && distY === 0)
    );
  }
}
export class King extends Piece {
  validateMove(move: string) {
    const fromX = alphabet.indexOf(this.position[0]);
    const fromY = parseInt(this.position[1]);
    const toX = alphabet.indexOf(move[0]);
    const toY = parseInt(move[1]);

    const distX = Math.abs(toX - fromX);
    const distY = Math.abs(toY - fromY);

    return (
      (distX == 1 && distY == 1) ||
      (distX == 1 && distY == 0) ||
      (distX == 0 && distY == 1)
    );
  }
}
