"use strict";
/* use strict */
exports.__esModule = true;
var baseBoard = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: []
};
var Board = /** @class */ (function () {
    function Board(position, materialImbalance) {
        if (position === void 0) { position = baseBoard; }
        if (materialImbalance === void 0) { materialImbalance = 0; }
        this.position = position;
        this.materialImbalance = materialImbalance;
        this.centerSquares = [
            this.position.d[4],
            this.position.e[4],
            this.position.d[5],
            this.position.e[5],
        ];
    }
    Board.prototype.evaluatePosition = function () {
        //TODO: Implement eval
    };
    return Board;
}());
