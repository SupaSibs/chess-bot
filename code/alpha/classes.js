"use strict";
/* use strict */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardMoveConnector = exports.King = exports.Queen = exports.Rook = exports.Bishop = exports.Knight = exports.Pawn = void 0;
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
    constructor(position, color, moved = false) {
        this.position = position;
        this.moved = moved;
        this.color = color;
    }
    get pos() {
        return this.position;
    }
    get move() {
        return this.moved;
    }
    get colour() {
        return this.color;
    }
}
class Pawn extends Piece {
    validateMove(move) {
        //TODO: implement promotion
        const fromX = alphabet.indexOf(this.position[0]);
        const fromY = parseInt(this.position[1]);
        const toX = alphabet.indexOf(move[0]);
        const toY = parseInt(move[1]);
        const distX = Math.abs(toX - fromX);
        const distY = Math.abs(toY - fromY);
        return ((distX == 0 && distY == 1) ||
            (move[2] == "x" && distX == 1 && distY == 1) ||
            (this.moved === false && distX === 0 && distY == 2));
    }
}
exports.Pawn = Pawn;
class Knight extends Piece {
    validateMove(move) {
        const fromX = alphabet.indexOf(this.position[0]);
        const fromY = parseInt(this.position[1]);
        const toX = alphabet.indexOf(move[0]);
        const toY = parseInt(move[1]);
        const distX = Math.abs(toX - fromX);
        const distY = Math.abs(toY - fromY);
        return (distX == 2 && distY == 1) || (distX == 1 && distY == 2);
    }
}
exports.Knight = Knight;
class Bishop extends Piece {
    validateMove(move) {
        const fromX = alphabet.indexOf(this.position[0]);
        const fromY = parseInt(this.position[1]);
        const toX = alphabet.indexOf(move[0]);
        const toY = parseInt(move[1]);
        const distX = Math.abs(toX - fromX);
        const distY = Math.abs(toY - fromY);
        return distX == distY && distX < 8 && distY < 8;
    }
}
exports.Bishop = Bishop;
class Rook extends Piece {
    validateMove(move) {
        const fromX = alphabet.indexOf(this.position[0]);
        const fromY = parseInt(this.position[1]);
        const toX = alphabet.indexOf(move[0]);
        const toY = parseInt(move[1]);
        const distX = Math.abs(toX - fromX);
        const distY = Math.abs(toY - fromY);
        return (distX < 8 && distY == 0) || (distX == 0 && distY < 8);
    }
}
exports.Rook = Rook;
class Queen extends Piece {
    validateMove(move) {
        const fromX = alphabet.indexOf(this.position[0]);
        const fromY = parseInt(this.position[1]);
        const toX = alphabet.indexOf(move[0]);
        const toY = parseInt(move[1]);
        const distX = Math.abs(toX - fromX);
        const distY = Math.abs(toY - fromY);
        return ((distX === distY && distX < 8 && distY < 8) ||
            (distX == 0 && distY < 8) ||
            (distX < 8 && distY === 0));
    }
}
exports.Queen = Queen;
class King extends Piece {
    validateMove(move) {
        const fromX = alphabet.indexOf(this.position[0]);
        const fromY = parseInt(this.position[1]);
        const toX = alphabet.indexOf(move[0]);
        const toY = parseInt(move[1]);
        const distX = Math.abs(toX - fromX);
        const distY = Math.abs(toY - fromY);
        return ((distX == 1 && distY == 1) ||
            (distX == 1 && distY == 0) ||
            (distX == 0 && distY == 1));
    }
}
exports.King = King;
class Empty {
    constructor(position) {
        this.position = position;
    }
}
//Supporter end
/* This Chess Engine uses an HCE, Hand-Picked Evaluation.
 * NNUE shall be implemented later on.
 */
const baseBoard = {
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
    ],
};
class BoardMoveConnector {
    constructor(position = baseBoard, materialImbalance = 0) {
        this.position = position;
        this.materialImbalance = materialImbalance;
        this.centerSquares = [
            this.position.d[4 - 1],
            this.position.e[4 - 1],
            this.position.d[4 - 1],
            this.position.e[4 - 1],
        ];
    }
    getMovementDirection(oldX, oldY, newX, newY) {
        let direction;
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
    }
    directionFunc(direction) {
        let directionFunc = () => { };
        switch (direction) {
            case 1: //top right
                directionFunc = (x, y, i) => {
                    return { x: x + i, y: y + i };
                };
                break;
            case 2: //top left
                directionFunc = (x, y, i) => {
                    return { x: x - i, y: y + i };
                };
                break;
            case 3: //bottom right
                directionFunc = (x, y, i) => {
                    return { x: x + i, y: y - i };
                };
                break;
            case 4: //bottom left
                directionFunc = (x, y, i) => {
                    return { x: x - i, y: y - i };
                };
                break;
            case 5: //right
                directionFunc = (x, y, i) => {
                    return { x: x + i, y: y };
                };
                break;
            case 6: //left
                directionFunc = (x, y, i) => {
                    return { x: x - i, y: y };
                };
                break;
            case 7: //up
                directionFunc = (x, y, i) => {
                    return { x: x, y: y + i };
                };
                break;
            case 8: //down
                directionFunc = (x, y, i) => {
                    return { x: x, y: y - i };
                };
                break;
        }
        return directionFunc;
    }
    checkCollisions(directionFunc, oldX, oldY, newX, newY, colour) {
        let pieceDetected = false;
        let xy = { x: 0, y: 0 };
        for (let i = 1; i < 8; i++) {
            xy = directionFunc(oldX, oldY, i);
            if (this.position[alphabet[xy.x]][xy.y - 1].constructor.name != "Empty" && this.position[alphabet[xy.x]][xy.y - 1]) {
                pieceDetected = true;
                break;
            }
            if (xy.x == newX && xy.y === newY) {
                break;
            }
        }
        return pieceDetected;
    }
    getMoves() {
    }
    validateMove(originalSquare, newSquare, colour) {
        //Support
        let oldX = alphabet.indexOf(originalSquare[0]);
        let oldY = parseInt(originalSquare[1]);
        let newX = alphabet.indexOf(newSquare[0]);
        let newY = parseInt(newSquare[1]);
        let direction = this.getMovementDirection(oldX, oldY, newX, newY);
        let directionFunc = this.directionFunc(direction);
        let collisionTest = this.checkCollisions(directionFunc, oldX, oldY, newX, newY, colour);
        //Main
        let validation = false;
        if (collisionTest === false ||
            this.position[alphabet[oldX]][oldY]
                .validateMove === true) {
            validation = true;
        }
        return validation;
    }
}
exports.BoardMoveConnector = BoardMoveConnector;
