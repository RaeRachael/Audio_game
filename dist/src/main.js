import { Audio } from "./audio/audio.js";
import { directionValues } from "./helpers/typesAndConst.js";
import { Input } from "./input/input.js";
import { LevelCreator } from "./level/levelCreator.js";
import { Player } from "./player/player.js";
document.addEventListener("DOMContentLoaded", setup);
let lastStepTime = 0;
let PLAYER_MOVEMENT_SPEED = 0.25;
let audio;
let player;
let currentLevel;
let first = true;
export function beginMainLoop() {
    if (first) {
        audio = new Audio;
        player.addAudio(audio);
    }
    window.requestAnimationFrame(mainLoop);
}
export function mainLoop(currentTime) {
    const timePassedSinceStep = (currentTime - lastStepTime) / 1000;
    window.requestAnimationFrame(mainLoop);
    if (timePassedSinceStep > (1 / (PLAYER_MOVEMENT_SPEED))) {
        lastStepTime = currentTime;
        var left = directionValues[player.direction].left;
        var distanceLeft = player.currentLevel.blockingDistance(player.position, left);
        var right = directionValues[player.direction].right;
        var distanceRight = player.currentLevel.blockingDistance(player.position, right);
        var distanceForward = player.currentLevel.blockingDistance(player.position, player.direction);
        player.audio.buildEcho(distanceLeft, distanceRight, distanceForward);
        player.audio.playClick();
    }
}
export function setup() {
    var levelCreator = new LevelCreator;
    player = new Player;
    var input = new Input(player);
    currentLevel = levelCreator.createLevel(2);
    player.setLevel(currentLevel);
}
//# sourceMappingURL=main.js.map