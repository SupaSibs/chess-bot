/* use strict */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Supporters
var alphabet = "abcdefgh";
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
var Piece = /** @class */ (function () {
    function Piece(position, moved) {
        if (moved === void 0) { moved = false; }
        this.position = position;
        this.moved = moved;
    }
    return Piece;
}());
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pawn.prototype.validateMove = function (move) {
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
        var fromX = alphabet.indexOf(this.position[0]);
        var fromY = parseInt(this.position[1]);
        var toX = alphabet.indexOf(move[0]);
        var toY = parseInt(move[1]);
        var distX = Math.abs(toX - fromX);
        var distY = Math.abs(toY - fromY);
        return ((distX == 0 && distY == 1) ||
            (move[2] == "x" && distX == 1 && distY == 1) ||
            (this.moved === false && distX === 0 && distY == 2));
    };
    return Pawn;
}(Piece));
//pos 0-f 1-3 moves 1 0-g 1-3 2 0-e 1-1 3 0-g 1-5 4 0-e 1-5 5 0-d 1-4 6 0-d 1-2 7 0-h 1-4 8 0-h 1-2
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Knight.prototype.validateMove = function (move) {
        var fromX = alphabet.indexOf(this.position[0]);
        var fromY = parseInt(this.position[1]);
        var toX = alphabet.indexOf(move[0]);
        var toY = parseInt(move[1]);
        var distX = Math.abs(toX - fromX);
        var distY = Math.abs(toY - fromY);
        return (distX == 2 && distY == 1) || (distX == 1 && distY == 2);
    };
    return Knight;
}(Piece));
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bishop.prototype.validateMove = function (move) {
        var fromX = alphabet.indexOf(this.position[0]);
        var fromY = parseInt(this.position[1]);
        var toX = alphabet.indexOf(move[0]);
        var toY = parseInt(move[1]);
        var distX = Math.abs(toX - fromX);
        var distY = Math.abs(toY - fromY);
        return distX == distY && distX < 8 && distY < 8;
    };
    return Bishop;
}(Piece));
var x = new Pawn("e2");
console.debug("".concat(x.validateMove("e3"), "  ").concat(x.validateMove("e2"), " ").concat(x.validateMove("f3x"), " ").concat(x.validateMove("c3x"), " ").concat(x.validateMove("e4")));
var y = new Knight("f3");
console.debug("".concat(y.validateMove("g1"), " ").concat(y.validateMove("e1"), " ").concat(y.validateMove("g5"), " ").concat(y.validateMove("e5"), " ").concat(y.validateMove("d4"), " ").concat(y.validateMove("d2"), " ").concat(y.validateMove("h4"), " ").concat(y.validateMove("h2")));
var b = new Bishop("g2");
console.debug("".concat(b.validateMove("h1"), " ").concat(b.validateMove("h3"), " ").concat(b.validateMove("f3"), " ").concat(b.validateMove("f1")));
