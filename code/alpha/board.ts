/* use strict */
import { BoardMoveConnector } from "./boardMoveConnector";
export class BoardEval extends BoardMoveConnector {
  evaluatePosition(randomMove: boolean = false) {
    //TODO: Implement eval
    if (randomMove) {
      return Math.round(Math.random() * 1000);
    }
  }
}

//Tests
let Board = new BoardEval();
let time;
console.time(time);
let MoveValidation = [
  Board.validateMove("e2", "e4", "white"),
  Board.validateMove("a1", "a3", "white"),
  Board.validateMove("a1", "a2", "white"),
];
console.log(MoveValidation);
console.timeEnd(time);
