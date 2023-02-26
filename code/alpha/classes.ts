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
interface board {
  a: any[];
  b: any[];
  c: any[];
  d: any[];
  e: any[];
  f: any[];
  g: any[];
  h: any[];
}

class Empty {
  position: string;
  constructor(position: string) {
    this.position = position;
  }
}

//Supporter end

/* This Chess Engine uses an HCE, Hand-Picked Evaluation.
 * NNUE shall be implemented later on.
 */

const baseBoard: board = {
  a: [
    new Rook("a1", "white"),
    new Pawn("a2", "white"),
    new Empty("a3"),
    new Empty("a4"),
    new Empty("a5"),
    new Empty("a6"),
    new Pawn("a7", "black"),
    new Rook("a8", "black"),
  ],
  b: [
    new Knight("b1", "white"),
    new Pawn("b2", "white"),
    new Empty("b3"),
    new Empty("b4"),
    new Empty("b5"),
    new Empty("b6"),
    new Pawn("b7", "black"),
    new Knight("b8", "black"),
  ],
  c: [
    new Bishop("c1", "white"),
    new Pawn("c2", "white"),
    new Empty("c3"),
    new Empty("c4"),
    new Empty("c5"),
    new Empty("c6"),
    new Pawn("c7", "black"),
    new Bishop("c8", "black"),
  ],
  d: [
    new Queen("d1", "white"),
    new Pawn("d2", "white"),
    new Empty("d3"),
    new Empty("d4"),
    new Empty("d5"),
    new Empty("d6"),
    new Pawn("d7", "black"),
    new Queen("d8", "black"),
  ],
  e: [
    new King("e1", "white"),
    new Pawn("e2", "white"),
    new Empty("e3"),
    new Empty("e4"),
    new Empty("e5"),
    new Empty("e6"),
    new Pawn("e7", "black"),
    new King("e8", "black"),
  ],
  f: [
    new Bishop("f1", "white"),
    new Pawn("f2", "white"),
    new Empty("f3"),
    new Empty("f4"),
    new Empty("f5"),
    new Empty("f6"),
    new Pawn("f7", "black"),
    new Bishop("f8", "black"),
  ],
  g: [
    new Knight("g1", "white"),
    new Pawn("g2", "white"),
    new Empty("g3"),
    new Empty("g4"),
    new Empty("g5"),
    new Empty("g6"),
    new Pawn("g7", "black"),
    new Knight("g8", "black"),
  ],
  h: [
    new Rook("h1", "white"),
    new Pawn("h2", "white"),
    new Empty("h3"),
    new Empty("h4"),
    new Empty("h5"),
    new Empty("h6"),
    new Pawn("h7", "black"),
    new Rook("h8", "black"),
  ],
};

interface Position {
  position: board;
  materialImbalance: number;
  centerSquares: any[];
}
export class BoardMoveConnector implements Position {
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
          xy.y - 1
        ].constructor.name != "Empty" &&
        this.position[alphabet[xy.x] as unknown as keyof typeof this.position][
          xy.y - 1
        ].color = ()
      ) {
        pieceDetected = true;
        break;
      }
      if (xy.x == newX && xy.y === newY) {
        break;
      }
    }

    return pieceDetected;
  }

  validateMove(originalSquare: string, newSquare: string, colour: string) {
    //Support
    let oldX = alphabet.indexOf(originalSquare[0]);
    let oldY = parseInt(originalSquare[1]);
    let newX = alphabet.indexOf(newSquare[0]);
    let newY = parseInt(newSquare[1]);
    let direction = this.getMovementDirection(oldX, oldY, newX, newY);
    let collisionTest = this.checkCollisions(
      direction,
      oldX,
      oldY,
      newX,
      newY,
      colour
    );
    //Main

    let validation: boolean = false;
    if (
      collisionTest === false ||
      this.position[alphabet[oldX] as keyof typeof this.position][oldY]
        .validateMove === false
    ) {
      validation = true;
    }
    return validation;
  }
  getAllMoves() {
    
  }
}
