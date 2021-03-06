import { Audio } from "./audio/audio.js";
import { Input } from "./input/input.js";
import { LevelCreator } from "./level/levelCreator.js";
import { Player } from "./player/player.js";
let input;
let levelNumber = 0;
let player;
let levelCreator;
let audio;
document.addEventListener("DOMContentLoaded", setup);
export function setup() {
    levelCreator = new LevelCreator;
    player = new Player;
    input = new Input(player);
    audio = new Audio;
    player.addAudio(audio);
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
        levelCreator.branchingValue = value / 100.0;
        console.log(levelCreator.branchingValue);
    }
}
export function displayText(text) {
    input.active = !input.active;
    if (input.active) {
        levelNumber++;
        player.reset();
        var currentLevel = levelCreator.createLevel(levelNumber);
        player.setLevel(currentLevel);
    }
    var displayBlock = document.getElementById("display_block");
    displayBlock.innerHTML = "curret level:" + levelNumber.toString() + "  " + text;
}
//# sourceMappingURL=main.js.map