import { Audio } from "./audio/audio.js";
import { Input } from "./input/input.js";
import { LevelCreator } from "./level/levelCreator.js";
import { Player } from "./player/player.js";
document.addEventListener("DOMContentLoaded", setup);
export function setup() {
    var levelCreator = new LevelCreator;
    var player = new Player;
    var input = new Input(player);
    var currentLevel = levelCreator.createLevel(2);
    player.setLevel(currentLevel);
    var audio = new Audio;
    player.addAudio(audio);
}
//# sourceMappingURL=main.js.map