"use strict";
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
exports.__esModule = true;
exports.BoardMoveConnector = exports.King = exports.Queen = exports.Rook = exports.Bishop = exports.Knight = exports.Pawn = void 0;
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
        if (moved === void 0) { moved = false; }
        this.position = position;
        this.moved = moved;
        this.color = color;
    }
    Object.defineProperty(Piece.prototype, "pos", {
        get: function () {
            return this.position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "move", {
        get: function () {
            return this.moved;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Piece.prototype, "colour", {
        get: function () {
            return this.color;
        },
        enumerable: false,
        configurable: true
    });
    return Piece;
}());
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pawn.prototype.validateMove = function (move) {
        //TODO: implement promotion
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
exports.Pawn = Pawn;
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
exports.Knight = Knight;
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
exports.Bishop = Bishop;
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook() {
        return _super !== null && _super.apply(this, arguments) || this;
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
}(Piece));
exports.Rook = Rook;
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Queen.prototype.validateMove = function (move) {
        var fromX = alphabet.indexOf(this.position[0]);
        var fromY = parseInt(this.position[1]);
        var toX = alphabet.indexOf(move[0]);
        var toY = parseInt(move[1]);
        var distX = Math.abs(toX - fromX);
        var distY = Math.abs(toY - fromY);
        return ((distX === distY && distX < 8 && distY < 8) ||
            (distX == 0 && distY < 8) ||
            (distX < 8 && distY === 0));
    };
    return Queen;
}(Piece));
exports.Queen = Queen;
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    King.prototype.validateMove = function (move) {
        var fromX = alphabet.indexOf(this.position[0]);
        var fromY = parseInt(this.position[1]);
        var toX = alphabet.indexOf(move[0]);
        var toY = parseInt(move[1]);
        var distX = Math.abs(toX - fromX);
        var distY = Math.abs(toY - fromY);
        return ((distX == 1 && distY == 1) ||
            (distX == 1 && distY == 0) ||
            (distX == 0 && distY == 1));
    };
    return King;
}(Piece));
exports.King = King;
var Empty = /** @class */ (function () {
    function Empty(position) {
        this.position = position;
    }
    return Empty;
}());
//Supporter end
/* This Chess Engine uses an HCE, Hand-Picked Evaluation.
 * NNUE shall be implemented later on.
 */
var baseBoard = {
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
    ]
};
var BoardMoveConnector = /** @class */ (function () {
    function BoardMoveConnector(position, materialImbalance) {
        if (position === void 0) { position = baseBoard; }
        if (materialImbalance === void 0) { materialImbalance = 0; }
        this.position = position;
        this.materialImbalance = materialImbalance;
        this.centerSquares = [
            this.position.d[4 - 1],
            this.position.e[4 - 1],
            this.position.d[4 - 1],
            this.position.e[4 - 1],
        ];
    }
    BoardMoveConnector.prototype.getMovementDirection = function (oldX, oldY, newX, newY) {
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
    BoardMoveConnector.prototype.checkCollisions = function (direction, oldX, oldY, newX, newY, colour) {
        var directionFunc = function () { };
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
        var pieceDetected = false;
        var xy = { x: 0, y: 0 };
        for (var i = 1; i < 8; i++) {
            xy = directionFunc(oldX, oldY, i);
            if (this.position[alphabet[xy.x]][xy.y].constructor.name != "Empty") {
                pieceDetected = true;
                break;
            }
            if (xy.x == newX && xy.y === newY) {
                break;
            }
        }
        return pieceDetected;
    };
    BoardMoveConnector.prototype.validateMove = function (originalSquare, newSquare, colour) {
        //Support
        var oldX = alphabet.indexOf(originalSquare[0]);
        var oldY = parseInt(originalSquare[1]);
        var newX = alphabet.indexOf(newSquare[0]);
        var newY = parseInt(newSquare[1]);
        var direction = this.getMovementDirection(oldX, oldY, newX, newY);
        var collisionTest = this.checkCollisions(direction, oldX, oldY, newX, newY, colour);
        //Main
        var validation = true;
        if (collisionTest === false || this.position[alphabet[oldX]][oldY].validateMove === true)
            return validation;
    };
    return BoardMoveConnector;
}());
exports.BoardMoveConnector = BoardMoveConnector;
