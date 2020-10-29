import { Audio } from "./audio/audio.js";
import { Input } from "./input/input.js";
import { LevelCreator } from "./level/levelCreator.js";
import { Player } from "./player/player.js";
let input;
let levelNumber = 0;
let player;
let levelCreator;
document.addEventListener("DOMContentLoaded", setup);
export function setup() {
    levelCreator = new LevelCreator;
    player = new Player;
    input = new Input(player);
    var audio = new Audio;
    player.addAudio(audio);
}
export function displayText(text) {
    var displayBlock = document.getElementById("display_block");
    displayBlock.innerHTML = text;
    input.active = !input.active;
    if (input.active) {
        levelNumber++;
        player.reset();
        var currentLevel = levelCreator.createLevel(levelNumber);
        player.setLevel(currentLevel);
        console.log(levelNumber, currentLevel);
    }
}
//# sourceMappingURL=main.js.map