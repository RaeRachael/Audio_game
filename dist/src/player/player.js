import { findCorrectTile } from "../helpers/helpers.js";
import { directionValues } from "../helpers/typesAndConst.js";
export class Player {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.direction = "North";
    }
    addAudio(audio) {
        this.audio = audio;
    }
    setLevel(newLevel) {
        this.currentLevel = newLevel;
    }
    reset() {
        this.position = { x: 0, y: 0 };
        this.direction = "North";
    }
    step() {
        if (this.currentLevel.blockingDistance(this.position, this.direction) != 0.5) {
            this.position.x += directionValues[this.direction].x;
            this.position.y += directionValues[this.direction].y;
            this.makeEcho();
        }
        else {
            this.audio.buildEcho(0, 0, 0);
        }
        this.audio.playClick();
        console.log("path forward: ", this.currentLevel.blockingDistance(this.position, this.direction));
        if (findCorrectTile(this.currentLevel.levelMap, this.position).exitTile) {
            console.log("*** EXIT TILE ***");
        }
    }
    left() {
        this.direction = directionValues[this.direction].left;
        this.makeEcho();
        this.audio.playClick();
    }
    right() {
        this.direction = directionValues[this.direction].right;
        this.makeEcho();
        this.audio.playClick();
    }
    makeEcho() {
        var left = directionValues[this.direction].left;
        var distanceLeft = this.currentLevel.blockingDistance(this.position, left);
        var right = directionValues[this.direction].right;
        var distanceRight = this.currentLevel.blockingDistance(this.position, right);
        var distanceForward = this.currentLevel.blockingDistance(this.position, this.direction);
        this.audio.buildEcho(distanceLeft, distanceRight, distanceForward);
    }
}
//# sourceMappingURL=player.js.map