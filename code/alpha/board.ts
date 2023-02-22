/* use strict */
//Supporter start
import { Pawn, Knight, Bishop, Rook, Queen, King, BoardBoiler } from "./classes";

let alphabet = "abcdefgh";


class Board extends BoardBoiler {

  validateMove(square: string, move: string, colour: string) {
    //Support
    let oldX = alphabet.indexOf(square[0]);
    let oldY = parseInt(square[1]);
    let newX = alphabet.indexOf(move);
    let newY = parseInt(move[1]);
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

    let validation: boolean = true;
    if (collisionTest === false) return validation;
  }
  evaluatePosition(randomMove: boolean = false) {
    //TODO: Implement eval
    if (randomMove) {
      return Math.round(Math.random() * 1000);
    }
  }
}
