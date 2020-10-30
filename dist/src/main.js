import { Audio } from "./audio/audio";
import { Input } from "./input/input";
import { LevelCreator } from "./level/levelCreator";
import { Player } from "./player/player";
let input;
let levelNumber = 0;
let player;
let levelCreator;
let audio;
document.addEventListener("DOMContentLoaded", setup);
var silentSteps = document.getElementById("silentSteps");
silentSteps.oninput = () => {
    var text = document.getElementById("text");
    if (silentSteps.checked == true) {
        text.style.display = "block";
        audio.silentSteps = true;
    }
    else {
        text.style.display = "none";
        audio.silentSteps = false;
    }
};
var branchingValue = document.getElementById("branchingValue");
branchingValue.onchange = () => {
    getBranchingValue(parseFloat(branchingValue.value));
};
function getBranchingValue(value) {
    levelCreator.branchingValue = value;
}
export function setup() {
    levelCreator = new LevelCreator;
    player = new Player;
    input = new Input(player);
    audio = new Audio;
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