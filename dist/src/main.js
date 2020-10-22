"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.mainLoop = void 0;
import { Input } from "./input/input.js";
import { Player } from "./player/player.js";
document.addEventListener("DOMContentLoaded", setup);
let lastStepTime = 0;
let PLAYER_MOVEMENT_SPEED = 10;
function mainLoop(currentTime) {
    const timePassedSinceStep = (currentTime - lastStepTime) / 1000;
    window.requestAnimationFrame(mainLoop);
    if (timePassedSinceStep > (1 / (PLAYER_MOVEMENT_SPEED))) {
        lastStepTime = currentTime;
        // console.log("tick", lastStepTime)
    }
}
exports.mainLoop = mainLoop;
function setup() {
    var player = new Player;
    var input = new Input(player);
}
exports.setup = setup;
window.requestAnimationFrame(mainLoop);
//# sourceMappingURL=main.js.map