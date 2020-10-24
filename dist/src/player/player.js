import { findCorrectTile } from "../helpers/helpers.js";
const directionValues = {
    North: { x: 0, y: 1, opposite: "South", left: "West", right: "East" },
    South: { x: 0, y: -1, opposite: "North", left: "East", right: "West" },
    East: { x: 1, y: 0, opposite: "West", left: "North", right: "South" },
    West: { x: -1, y: 0, opposite: "East", left: "South", right: "North" }
};
export class Player {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.direction = "North";
    }
    setLevel(newLevel) {
        this.currentLevel = newLevel;
    }
    reset() {
        this.position = { x: 0, y: 0 };
        this.direction = "North";
    }
    step() {
        if (this.currentLevel.blockingDistance(this.position, this.direction) > 0) {
            this.position.x += directionValues[this.direction].x;
            this.position.y += directionValues[this.direction].y;
        }
        console.log("path forward: ", this.currentLevel.blockingDistance(this.position, this.direction));
        if (findCorrectTile(this.currentLevel.levelMap, this.position).exitTile) {
            console.log("*** EXIT TILE ***");
        }
    }
    left() {
        this.direction = directionValues[this.direction].left;
    }
    right() {
        this.direction = directionValues[this.direction].right;
    }
}
//# sourceMappingURL=player.js.map