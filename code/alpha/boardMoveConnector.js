"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardMoveConnector = void 0;
/* use strict */
const pieces_1 = require("./pieces");
let alphabet = "abcdefgh";
class Empty {
    constructor(position) {
        this.position = position;
    }
}
const squareConverter = (square) => {
    return [alphabet.indexOf(square[0]), Number(square[1])];
};
const moves = {
    side: (origSquare) => {
        let [x, y] = squareConverter(origSquare);
        let [negativeX, negativeY] = [x, y];
    },
};
//Supporter end
/* This Chess Engine uses an HCE, Hand-Picked Evaluation.
 * NNUE shall be implemented later on.
 */
const baseBoard = {
    a: [
        new pieces_1.Rook("a1", "white"),
        new pieces_1.Pawn("a2", "white"),
        new Empty("a3"),
        new Empty("a4"),
        new Empty("a5"),
        new Empty("a6"),
        new pieces_1.Pawn("a7", "black"),
        new pieces_1.Rook("a8", "black"),
    ],
    b: [
        new pieces_1.Knight("b1", "white"),
        new pieces_1.Pawn("b2", "white"),
        new Empty("b3"),
        new Empty("b4"),
        new Empty("b5"),
        new Empty("b6"),
        new pieces_1.Pawn("b7", "black"),
        new pieces_1.Knight("b8", "black"),
    ],
    c: [
        new pieces_1.Bishop("c1", "white"),
        new pieces_1.Pawn("c2", "white"),
        new Empty("c3"),
        new Empty("c4"),
        new Empty("c5"),
        new Empty("c6"),
        new pieces_1.Pawn("c7", "black"),
        new pieces_1.Bishop("c8", "black"),
    ],
    d: [
        new pieces_1.Queen("d1", "white"),
        new pieces_1.Pawn("d2", "white"),
        new Empty("d3"),
        new Empty("d4"),
        new Empty("d5"),
        new Empty("d6"),
        new pieces_1.Pawn("d7", "black"),
        new pieces_1.Queen("d8", "black"),
    ],
    e: [
        new pieces_1.King("e1", "white"),
        new pieces_1.Pawn("e2", "white"),
        new Empty("e3"),
        new Empty("e4"),
        new Empty("e5"),
        new Empty("e6"),
        new pieces_1.Pawn("e7", "black"),
        new pieces_1.King("e8", "black"),
    ],
    f: [
        new pieces_1.Bishop("f1", "white"),
        new pieces_1.Pawn("f2", "white"),
        new Empty("f3"),
        new Empty("f4"),
        new Empty("f5"),
        new Empty("f6"),
        new pieces_1.Pawn("f7", "black"),
        new pieces_1.Bishop("f8", "black"),
    ],
    g: [
        new pieces_1.Knight("g1", "white"),
        new pieces_1.Pawn("g2", "white"),
        new Empty("g3"),
        new Empty("g4"),
        new Empty("g5"),
        new Empty("g6"),
        new pieces_1.Pawn("g7", "black"),
        new pieces_1.Knight("g8", "black"),
    ],
    h: [
        new pieces_1.Rook("h1", "white"),
        new pieces_1.Pawn("h2", "white"),
        new Empty("h3"),
        new Empty("h4"),
        new Empty("h5"),
        new Empty("h6"),
        new pieces_1.Pawn("h7", "black"),
        new pieces_1.Rook("h8", "black"),
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
        for (let i = 0; i <= 7; i++) {
            xy = directionFunc(oldX, oldY, i);
            if (this.position[alphabet[xy.x]][xy.y].constructor.name != "Empty" &&
                this.position[alphabet[xy.x]][xy.y]) {
                pieceDetected = true;
                break;
            }
            if (xy.x == newX && xy.y === newY) {
                break;
            }
        }
        return pieceDetected;
    }
    getNonEmpty() {
        let fileKeys = Object.keys(this.position);
        let nonEmpty = [];
        for (let i = 0; i <= 7; i++) {
            let file = this.position[fileKeys[i]];
            let filteredFile = file.filter((piece) => piece.constructor.name != Empty);
            filteredFile.forEach((piece) => nonEmpty.push(piece));
        }
        return nonEmpty;
    }
    getMoves() {
        let unchecked = this.getNonEmpty();
        for (let i = 0; i <= unchecked.length - 1; i++) { }
    }
    validateMove(originalSquare, newSquare, colour) {
        //Support
        let [oldX, oldY] = squareConverter(originalSquare);
        let [newX, newY] = squareConverter(newSquare);
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
