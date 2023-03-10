/* use strict */
import { Pawn, Knight, Bishop, Rook, Queen, King } from "./pieces";
let alphabet = "abcdefgh";

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
const squareConverter = (square: string) => {
  return [alphabet.indexOf(square[0]), Number(square[1])];
};
const moves = {
  side: function*(origSquare: string) {
    let [x, y] = squareConverter(origSquare)
   let move = []
    let i = 1;
    
      yield [x + i, x - i, y, y]
      i++
      yield [x + i, x - i, y, y]
      i++
      yield [x - i, x - i, y, y]
      i++
      yield [x + i, x - i, y, y]
      i++
      yield [x + i, x - i, y, y]
      i++
      yield [x + i, x - i, y, y]
      i++
  },
  up: function*(origSquare: string) {
    let [x, y] = squareConverter(origSquare)
   let move = []
    let i = 1;
    
      yield [x, x, y + i, y - i]
      i++
      yield [x, x, y + i, y - i]
      i++
      yield [x, x, y + i, y - i]
      i++
      yield [x, x, y + i, y - i]
      i++
      yield [x, x, y + i, y - i]
      i++
      yield [x, x, y + i, y - i]
      i++
  },
  diaur: function*(origSquare: string) {
    let [x, y] = squareConverter(origSquare)
   let move = []
    let i = 1;
    
      yield [x, x, y, y]
      i++
      yield [x, x, y, y]
      i++
      yield [x, x, y, y]
      i++
      yield [x, x, y, y]
      i++
      yield [x, x, y, y]
      i++
      yield [x, x, y, y]
      i++
  },
  diaul: function*(origSquare: string) {
    let [x, y] = squareConverter(origSquare)
   let move = []
    let i = 1;
    
      yield [x, x , y, y]
      i++
      yield [x, x , y, y]
      i++
      yield [x, x , y, y]
      i++
      yield [x, x , y, y]
      i++
      yield [x, x, y, y]
      i++
      yield [x, x 1, y, y]
      i++
  },
  
};
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
  directionFunc(direction: number) {
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
    return directionFunc;
  }
  checkCollisions(
    directionFunc: Function,
    oldX: any,
    oldY: any,
    newX: any,
    newY: any,
    colour: any
  ) {
    let pieceDetected: boolean = false;
    let xy: any = { x: 0, y: 0 };
    for (let i = 0; i <= 7; i++) {
      xy = directionFunc(oldX, oldY, i);
      if (
        this.position[alphabet[xy.x] as unknown as keyof typeof this.position][
          xy.y
        ].constructor.name != "Empty" &&
        this.position[alphabet[xy.x] as unknown as keyof typeof this.position][
          xy.y
        ]
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
  getNonEmpty() {
    let fileKeys: string[] = Object.keys(this.position);
    let nonEmpty: any[] = [];
    for (let i = 0; i <= 7; i++) {
      let file = this.position[fileKeys[i] as keyof typeof this.position];
      let filteredFile = file.filter(
        (piece) => piece.constructor.name != Empty
      );
      filteredFile.forEach((piece) => nonEmpty.push(piece));
    }
    return nonEmpty;
  }
  getMoves() {
    let unchecked = this.getNonEmpty();
    for (let i = 0; i <= unchecked.length - 1; i++) {}
  }

  validateMove(originalSquare: string, newSquare: string, colour: string) {
    //Support
    let [oldX, oldY] = squareConverter(originalSquare)
    let [newX, newY] = squareConverter(newSquare)
  
    let direction = this.getMovementDirection(oldX, oldY, newX, newY);
    let directionFunc = this.directionFunc(direction);
    let collisionTest = this.checkCollisions(
      directionFunc,
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
        .validateMove === true
    ) {
      validation = true;
    }
    return validation;
  }
}
