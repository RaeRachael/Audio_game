"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var directionValues = {
    North: { x: 0, y: 1, opposite: "South", left: "West", right: "East" },
    South: { x: 0, y: -1, opposite: "North", left: "East", right: "West" },
    East: { x: 1, y: 0, opposite: "West", left: "South", right: "North" },
    West: { x: -1, y: 0, opposite: "East", left: "North", right: "South" }
};
var Player = /** @class */ (function () {
    function Player() {
        this.position = { x: 0, y: 0 };
        this.direction = "North";
    }
    Player.prototype.reset = function () {
        this.position = { x: 0, y: 0 };
        this.direction = "North";
    };
    Player.prototype.step = function () {
        this.position.x += directionValues[this.direction].x;
        this.position.y += directionValues[this.direction].y;
    };
    Player.prototype.left = function () {
        this.direction = directionValues[this.direction].left;
    };
    Player.prototype.right = function () {
        this.direction = directionValues[this.direction].right;
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map