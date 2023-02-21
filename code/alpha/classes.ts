/* use strict */

//Supporters
const alphabet = "abcdefgh";

/* Chess Notation Guidelines
 * The first letter always refers to a piece or a pawn with the following capitalized letters:
 * Pawn = P
 * Knight = N (K refers to the king.)
 * Bishop = B
 * Rook = R
 * Queen = Q
 * King = K
 *
 * TODO: If 2 pieces of the same kind can move to the same square, we add the file or rank of that piece.
 *
 * The second letter, uncapitalized, refers to the file it is in, from a to h.
 *
 * The 3rd letter, which is a number refers to the rank, from 1 to 8.
 *
 * For a capture, append x after the first letter. (Last letter with this notation)
 *
 * For a check, append + to the notation,
 *
 * For a checkmate, append # to the notation.
 *
 * TODO
 *
 * Kingside Castling is O-O.
 *
 * Queenside Castling is O-O-O
 *
 */
interface Position {
  position: board;
  materialImbalance: number;
  centerSquares: any[];
}
export class BoardBoiler implements Position {
    position: board;
  materialImbalance: number;
  centerSquares: any[];
  constructor(position: board = baseBoard, materialImbalance: number = 0) {
    this.position = position;
    this.materialImbalance = materialImbalance;
    this.centerSquares = [
      this.position.d[4 - 1],
      this.position.e[4 - 1],
      this.position.d[4 - 1],
      this.position.e[4 - 1],
    ];
  }

  getMovementDirection(
    oldX: number,
    oldY: number,
    newX: number,
    newY: number
  ): number {
    let direction: number;
    direction = 0;
    if (Math.abs(newX - oldX) === Math.abs(newY - oldY)) {
      switch (true) {
        case newX - oldX > 0 && newY - oldY > 0: //top right
          direction = 1;
          break;
        case newX - oldX < 0 && newY - oldY > 0: // top left
          direction = 2;
          break;
        case newX - oldX > 0 && newY - oldY < 0: // bottom rignt
          direction = 3;
          break;
        case newX - oldX < 0 && newY - oldY < 0: // bottom left
          direction = 4;
          break;
      }
    }

    if (Math.abs(newX - oldX) > 0 && Math.abs(newY - oldY) == 0) {
      switch (true) {
        case newX - oldX > 0: //right
          direction = 5;
          break;
        case newX - oldX < 0: //left
          direction = 6;
          break;
      }
    }

    if (Math.abs(newX - oldX) == 0 && Math.abs(newY - oldY) > 0) {
      switch (true) {
        case newY - oldY > 0: //up
          direction = 7;
          break;
        case newY - oldY < 0: //down
          direction = 8;
          break;
      }
    }
    return direction;
  }

  checkCollisions(
    direction: number,
    oldX: any,
    oldY: any,
    newX: any,
    newY: any,
    colour: any
  ) {
    let directionFunc: Function = () => {};
    switch (direction) {
      case 1: //top right
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x + i, y: y + i };
        };
        break;
      case 2: //top left
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x - i, y: y + i };
        };
        break;
      case 3: //bottom right
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x + i, y: y - i };
        };
        break;
      case 4: //bottom left
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x - i, y: y - i };
        };
        break;
      case 5: //right
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x + i, y: y };
        };
        break;
      case 6: //left
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x - i, y: y };
        };
        break;
      case 7: //up
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x, y: y + i };
        };
        break;
      case 8: //down
        directionFunc = (x: number, y: number, i: number) => {
          return { x: x, y: y - i };
        };
        break;
    }
    let pieceDetected: boolean = false;
    let xy: any = { x: 0, y: 0 };
    for (let i = 1; i < 8; i++) {
      xy = directionFunc(oldX, oldY, i);
      if (
        this.position[alphabet[xy.x] as unknown as keyof typeof this.position][
          xy.y
        ].constructor.name != "Empty"
      ) {
        pieceDetected = true;
        break;
      }
      if (xy.x == newX && xy.y === newY) {
        pieceDetected = false;
        break;
      }
    }

    return pieceDetected;
  }

}
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
