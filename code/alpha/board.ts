/* use strict */
import { BoardMoveConnector } from "./classes";
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

let MoveValidation = Board.validateMove("e2", "e4", "white")
console.log(MoveValidation)