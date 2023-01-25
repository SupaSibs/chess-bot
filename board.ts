/* use strict */

import { Pawn, Knight, Bishop, Rook, Queen, King } from "./classes";

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

interface Position {
  position: board;
  materialImbalance: number;
  centerSquares: any[];
}

class Empty {
  position: string;
  constructor(position: string) {
    this.position = position;
  }
}

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

class Board implements Position {
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

  getMovementDirection(oldX: number, oldY: number, newX: number, newY: number) {
    if (
      Math.abs(newX - oldX) === Math.abs(newY - oldY) &&
      newX - oldX < 0 &&
      newY - oldY > 0
    ) {
      return 1;
    } else if (
      Math.abs(newX - oldX) === Math.abs(newY - oldY) &&
      newX - oldX > 0 &&
      newY - oldY > 0
    ) {
      return 2;
    } else if (
      Math.abs(newX - oldX) === Math.abs(newY - oldY) &&
      newX - oldX > 0 &&
      newY - oldY < 0
    ) {
      return 3;
    } else if (
      Math.abs(newX - oldX) === Math.abs(newY - oldY) &&
      newX - oldX > 0 &&
      newY - oldY < 0
    ) {
      return 4;
    }
  }
  validateMove(square: string, newPos: string) {
    let position =
      this.position[alphabet.indexOf(square[0])][parseInt(square[1])].pos;
    let posNew =
      this.position[alphabet.indexOf(newPos[0])][parseInt(newPos[1])].pos;
    let oldX = alphabet.indexOf(square[0]) + 1;
    let oldY = parseInt(square[1]);
    let newX = alphabet.indexOf(newPos[0]) + 1;
    let newY = parseInt(newPos[1]);

    //Eight If statements to cover ALL 8 DIRECTIONS

    if (newPos[2] != "x" && posNew != new Empty(newPos)) {
      return false;
    }

    switch (this.getMovementDirection(oldX, oldY, newX, newY)) {
    }

    return position.validateMove(newPos);
  }

  evaluatePosition() {
    //TODO: Implement eval
  }
}
