/* use strict */


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

const baseBoard: board = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: [],
};

class Board implements Position {
  position: board;
  materialImbalance: number;
  centerSquares: any[];
  constructor(position: board = baseBoard, materialImbalance: number = 0) {
    this.position = position;
    this.materialImbalance = materialImbalance;
    this.centerSquares = [
      this.position.d[4],
      this.position.e[4],
      this.position.d[5],
      this.position.e[5],
    ];
  }

  evaluatePosition() {
    //TODO: Implement eval
  }
}
