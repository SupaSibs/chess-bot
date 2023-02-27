"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardEval = void 0;
/* use strict */
const classes_1 = require("./classes");
class BoardEval extends classes_1.BoardMoveConnector {
    evaluatePosition(randomMove = false) {
        //TODO: Implement eval
        if (randomMove) {
            return Math.round(Math.random() * 1000);
        }
    }
}
exports.BoardEval = BoardEval;
//Tests
let Board = new BoardEval();
let time;
console.time(time);
let MoveValidation = [Board.validateMove("e2", "e4", "white"), Board.validateMove("a1", "a3", "white"), Board.validateMove("a1", "a2", "white")];
console.log(MoveValidation);
console.timeEnd(time);
