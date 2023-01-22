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
  constructor(position: string, moved = false) {
    this.position = position;
    this.moved = moved;
  }
}
class Pawn extends Piece {
  validateMove(move: string) {
    //TODO: implement promotion
    //d4 d3
    /*if (
      (move[2] != "x" &&
        this.moved === true &&
        parseInt(this.position[1]) + 1 == parseInt(move[1])) ||
      (move[2] != "x" &&
        this.moved === false &&
        parseInt(this.position[1]) + 1 == parseInt(move[1])) ||
      (move[2] != "x" &&
        this.moved === false &&
        parseInt(this.position[1]) + 2 == parseInt(move[1]))
    ) {
      return true;
    }
    if (
      (move[2] === "x" &&
        alphabet.indexOf(move[0]) + 1 ===
          alphabet.indexOf(this.position[0]) + 2 &&
        parseInt(move[1]) === parseInt(this.position[1]) + 1) ||
      (move[2] === "x" &&
        alphabet.indexOf(move[0]) + 1 === alphabet.indexOf(this.position[0]) &&
        parseInt(move[1]) === parseInt(this.position[1]) + 1)
    ) {
      return true;
    }
    return false;*/

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
//pos 0-f 1-3 moves 1 0-g 1-3 2 0-e 1-1 3 0-g 1-5 4 0-e 1-5 5 0-d 1-4 6 0-d 1-2 7 0-h 1-4 8 0-h 1-2
class Knight extends Piece {
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

class Bishop extends Piece {
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

class Rook extends Piece {

validateMove(move: string) {
	  const fromX = alphabet.indexOf(this.position[0]);
	    const fromY = parseInt(this.position[1]);
	      const toX = alphabet.indexOf(move[0]);
	        const toY = parseInt(move[1]);

		  const distX = Math.abs(toX - fromX);
		    const distY = Math.abs(toY - fromY);

		      return distX < 8 && distY == 0 || distX == 0 && distY < 8;
}
}

class Queen extends Piece {

validateMove(move: string) {
	  const fromX = alphabet.indexOf(this.position[0]);
	    const fromY = parseInt(this.position[1]);
	      const toX = alphabet.indexOf(move[0]);
	        const toY = parseInt(move[1]);

		  const distX = Math.abs(toX - fromX);
		    const distY = Math.abs(toY - fromY);

		      return distX = distY && distX < 8 && distY < 8 || distX == 0 && distY < 8 || distX < 8 && distY === 0
}
}

class King extends Piece {

validateMove(move: string) {
	  const fromX = alphabet.indexOf(this.position[0]);
	    const fromY = parseInt(this.position[1]);
	      const toX = alphabet.indexOf(move[0]);
	        const toY = parseInt(move[1]);

		  const distX = Math.abs(toX - fromX);
		    const distY = Math.abs(toY - fromY);

		      return distX == 1 && distY == 1 || distX == 1 && distY == 0 || distX == 0 && distY == 1
}

}

let x = new Pawn("e2");
console.debug(
  `${x.validateMove("e3")}  ${x.validateMove("e2")} ${x.validateMove(
    "f3x"
  )} ${x.validateMove("c3x")} ${x.validateMove("e4")}`
);

let y = new Knight("f3");
console.debug(
  `${y.validateMove("g1")} ${y.validateMove("e1")} ${y.validateMove(
    "g5"
  )} ${y.validateMove("e5")} ${y.validateMove("d4")} ${y.validateMove(
    "d2"
  )} ${y.validateMove("h4")} ${y.validateMove("h2")}`
);

let b = new Bishop("g2");
console.debug(
  `${b.validateMove("h1")} ${b.validateMove("h3")} ${b.validateMove(
    "f3"
  )} ${b.validateMove("f1")}`
);
