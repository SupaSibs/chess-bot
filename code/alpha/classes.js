"use strict";
/* use strict */
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null"
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
exports.__esModule = true;
exports.King =
  exports.Queen =
  exports.Rook =
  exports.Bishop =
  exports.Knight =
  exports.Pawn =
    void 0;
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
  function Piece(position, color, moved) {
    if (moved === void 0) {
      moved = false;
    }
    this.position = position;
    this.moved = moved;
    this.color = color;
  }
  Object.defineProperty(Piece.prototype, "pos", {
    get: function () {
      return this.position;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(Piece.prototype, "move", {
    get: function () {
      return this.moved;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(Piece.prototype, "colour", {
    get: function () {
      return this.color;
    },
    enumerable: false,
    configurable: true,
  });
  return Piece;
})();
var Pawn = /** @class */ (function (_super) {
  __extends(Pawn, _super);
  function Pawn() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Pawn.prototype.validateMove = function (move) {
    //TODO: implement promotion
    var fromX = alphabet.indexOf(this.position[0]);
    var fromY = parseInt(this.position[1]);
    var toX = alphabet.indexOf(move[0]);
    var toY = parseInt(move[1]);
    var distX = Math.abs(toX - fromX);
    var distY = Math.abs(toY - fromY);
    return (
      (distX == 0 && distY == 1) ||
      (move[2] == "x" && distX == 1 && distY == 1) ||
      (this.moved === false && distX === 0 && distY == 2)
    );
  };
  return Pawn;
})(Piece);
exports.Pawn = Pawn;
var Knight = /** @class */ (function (_super) {
  __extends(Knight, _super);
  function Knight() {
    return (_super !== null && _super.apply(this, arguments)) || this;
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
})(Piece);
exports.Knight = Knight;
var Bishop = /** @class */ (function (_super) {
  __extends(Bishop, _super);
  function Bishop() {
    return (_super !== null && _super.apply(this, arguments)) || this;
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
})(Piece);
exports.Bishop = Bishop;
var Rook = /** @class */ (function (_super) {
  __extends(Rook, _super);
  function Rook() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Rook.prototype.validateMove = function (move) {
    var fromX = alphabet.indexOf(this.position[0]);
    var fromY = parseInt(this.position[1]);
    var toX = alphabet.indexOf(move[0]);
    var toY = parseInt(move[1]);
    var distX = Math.abs(toX - fromX);
    var distY = Math.abs(toY - fromY);
    return (distX < 8 && distY == 0) || (distX == 0 && distY < 8);
  };
  return Rook;
})(Piece);
exports.Rook = Rook;
var Queen = /** @class */ (function (_super) {
  __extends(Queen, _super);
  function Queen() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Queen.prototype.validateMove = function (move) {
    var fromX = alphabet.indexOf(this.position[0]);
    var fromY = parseInt(this.position[1]);
    var toX = alphabet.indexOf(move[0]);
    var toY = parseInt(move[1]);
    var distX = Math.abs(toX - fromX);
    var distY = Math.abs(toY - fromY);
    return (
      (distX === distY && distX < 8 && distY < 8) ||
      (distX == 0 && distY < 8) ||
      (distX < 8 && distY === 0)
    );
  };
  return Queen;
})(Piece);
exports.Queen = Queen;
var King = /** @class */ (function (_super) {
  __extends(King, _super);
  function King() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  King.prototype.validateMove = function (move) {
    var fromX = alphabet.indexOf(this.position[0]);
    var fromY = parseInt(this.position[1]);
    var toX = alphabet.indexOf(move[0]);
    var toY = parseInt(move[1]);
    var distX = Math.abs(toX - fromX);
    var distY = Math.abs(toY - fromY);
    return (
      (distX == 1 && distY == 1) ||
      (distX == 1 && distY == 0) ||
      (distX == 0 && distY == 1)
    );
  };
  return King;
})(Piece);
exports.King = King;
