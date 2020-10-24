import { Audio } from "./audio/audio.js";
import { Input } from "./input/input.js";
import { LevelCreator } from "./level/levelCreator.js";
import { Player } from "./player/player.js";
document.addEventListener("DOMContentLoaded", setup);
let lastStepTime = 0;
let PLAYER_MOVEMENT_SPEED = 0.25;
let audio;
export function beginMainLoop() {
    audio = new Audio;
    window.requestAnimationFrame(mainLoop);
}
export function mainLoop(currentTime) {
    const timePassedSinceStep = (currentTime - lastStepTime) / 1000;
    window.requestAnimationFrame(mainLoop);
    if (timePassedSinceStep > (1 / (PLAYER_MOVEMENT_SPEED))) {
        lastStepTime = currentTime;
        audio.playClick();
        console.log("click");
    }
}
export function setup() {
    var levelCreator = new LevelCreator;
    var player = new Player;
    var input = new Input(player);
    player.setLevel(levelCreator.createLevel(2));
}
//# sourceMappingURL=main.js.map