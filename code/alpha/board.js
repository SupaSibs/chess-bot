"use strict";
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
exports.BoardEval = void 0;
/* use strict */
var classes_1 = require("./classes");
var BoardEval = /** @class */ (function (_super) {
    __extends(BoardEval, _super);
    function BoardEval() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoardEval.prototype.evaluatePosition = function (randomMove) {
        if (randomMove === void 0) { randomMove = false; }
        //TODO: Implement eval
        if (randomMove) {
            return Math.round(Math.random() * 1000);
        }
    };
    return BoardEval;
}(classes_1.BoardMoveConnector));
exports.BoardEval = BoardEval;
//Tests
var Board = new BoardEval();
var MoveValidation = Board.validateMove("e2", "e4", "white");
console.log(MoveValidation);
