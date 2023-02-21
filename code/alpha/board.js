"use strict";
exports.__esModule = true;
/* use strict */
//Supporter start
var classes_1 = require("./classes");
var alphabet = "abcdefgh";
var Empty = /** @class */ (function () {
  function Empty(position) {
    this.position = position;
  }
  return Empty;
})();
//Supporter end
/* This Chess Engine uses an HCE, Hand-Picked Evaluation.
 * NNUE shall be implemented later on.
 */
var baseBoard = {
  a: [
    new classes_1.Rook("a1", "white"),
    new classes_1.Pawn("a2", "white"),
    new Empty("a3"),
    new Empty("a4"),
    new Empty("a5"),
    new Empty("a6"),
    new classes_1.Pawn("a7", "black"),
    new classes_1.Rook("a8", "black"),
  ],
  b: [
    new classes_1.Knight("b1", "white"),
    new classes_1.Pawn("b2", "white"),
    new Empty("b3"),
    new Empty("b4"),
    new Empty("b5"),
    new Empty("b6"),
    new classes_1.Pawn("b7", "black"),
    new classes_1.Knight("b8", "black"),
  ],
  c: [
    new classes_1.Bishop("c1", "white"),
    new classes_1.Pawn("c2", "white"),
    new Empty("c3"),
    new Empty("c4"),
    new Empty("c5"),
    new Empty("c6"),
    new classes_1.Pawn("c7", "black"),
    new classes_1.Bishop("c8", "black"),
  ],
  d: [
    new classes_1.Queen("d1", "white"),
    new classes_1.Pawn("d2", "white"),
    new Empty("d3"),
    new Empty("d4"),
    new Empty("d5"),
    new Empty("d6"),
    new classes_1.Pawn("d7", "black"),
    new classes_1.Queen("d8", "black"),
  ],
  e: [
    new classes_1.King("e1", "white"),
    new classes_1.Pawn("e2", "white"),
    new Empty("e3"),
    new Empty("e4"),
    new Empty("e5"),
    new Empty("e6"),
    new classes_1.Pawn("e7", "black"),
    new classes_1.King("e8", "black"),
  ],
  f: [
    new classes_1.Bishop("f1", "white"),
    new classes_1.Pawn("f2", "white"),
    new Empty("f3"),
    new Empty("f4"),
    new Empty("f5"),
    new Empty("f6"),
    new classes_1.Pawn("f7", "black"),
    new classes_1.Bishop("f8", "black"),
  ],
  g: [
    new classes_1.Knight("g1", "white"),
    new classes_1.Pawn("g2", "white"),
    new Empty("g3"),
    new Empty("g4"),
    new Empty("g5"),
    new Empty("g6"),
    new classes_1.Pawn("g7", "black"),
    new classes_1.Knight("g8", "black"),
  ],
  h: [
    new classes_1.Rook("h1", "white"),
    new classes_1.Pawn("h2", "white"),
    new Empty("h3"),
    new Empty("h4"),
    new Empty("h5"),
    new Empty("h6"),
    new classes_1.Pawn("h7", "black"),
    new classes_1.Rook("h8", "black"),
  ],
};
var Board = /** @class */ (function () {
  function Board(position, materialImbalance) {
    if (position === void 0) {
      position = baseBoard;
    }
    if (materialImbalance === void 0) {
      materialImbalance = 0;
    }
    this.position = position;
    this.materialImbalance = materialImbalance;
    this.centerSquares = [
      this.position.d[4 - 1],
      this.position.e[4 - 1],
      this.position.d[4 - 1],
      this.position.e[4 - 1],
    ];
  }
  Board.prototype.getMovementDirection = function (oldX, oldY, newX, newY) {
    var direction;
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
  };
  Board.prototype.checkCollisions = function (
    direction,
    oldX,
    oldY,
    newX,
    newY,
    colour
  ) {
    var directionFunc = function () {};
    switch (direction) {
      case 1: //top right
        directionFunc = function (x, y, i) {
          return { x: x + i, y: y + i };
        };
        break;
      case 2: //top left
        directionFunc = function (x, y, i) {
          return { x: x - i, y: y + i };
        };
        break;
      case 3: //bottom right
        directionFunc = function (x, y, i) {
          return { x: x + i, y: y - i };
        };
        break;
      case 4: //bottom left
        directionFunc = function (x, y, i) {
          return { x: x - i, y: y - i };
        };
        break;
      case 5: //right
        directionFunc = function (x, y, i) {
          return { x: x + i, y: y };
        };
        break;
      case 6: //left
        directionFunc = function (x, y, i) {
          return { x: x - i, y: y };
        };
        break;
      case 7: //up
        directionFunc = function (x, y, i) {
          return { x: x, y: y + i };
        };
        break;
      case 8: //down
        directionFunc = function (x, y, i) {
          return { x: x, y: y - i };
        };
        break;
    }
    var pieceDetected;
    for (var i = 0; i <= 8; i++) {
      var xy = directionFunc(oldX, oldY, i);
      if (
        this.position[xy.x][xy.y].constructor.name != "Empty" &&
        this.position[xy.x][xy.y].colour == colour
      ) {
        pieceDetected = true;
      }
      if (pieceDetected) {
        return {
          usedFunc: directionFunc,
          detection: pieceDetected,
          squareDetected: alphabet[xy.x] + xy.y,
        };
      }
    }
  };
  Board.prototype.validateMove = function (square, move, colour) {
    //Support
    var oldX = alphabet.indexOf(square[0]);
    var oldY = parseInt(square[1]);
    var newX = alphabet.indexOf(move);
    var newY = parseInt(move[1]);
    var direction = this.getMovementDirection(oldX, oldY, newX, newY);
    var collisionTest = this.checkCollisions(
      direction,
      oldX,
      oldY,
      newX,
      newY,
      colour
    );
    //Main
    var validation = false;
    if (
      this.position[oldX][oldY].validateMove(move) == false ||
      (collisionTest.detection == true &&
        collisionTest.squareDetected == alphabet[newX] + newY)
    ) {
      validation = true;
    }
    for (var i = 0; i <= 8; ) i++;
    {
      if (collisionTest);
    }
  };
  Board.prototype.evaluatePosition = function (randomMove) {
    if (randomMove === void 0) {
      randomMove = false;
    }
    //TODO: Implement eval
    if (randomMove) {
      return Math.round(Math.random() * 1000);
    }
  };
  return Board;
})();
