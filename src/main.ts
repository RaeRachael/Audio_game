import { Audio } from "./audio/audio";
import { Input } from "./input/input";
import { LevelCreator } from "./level/levelCreator";
import { Player } from "./player/player"

document.addEventListener("DOMContentLoaded", setup);

export function setup() {
  var levelCreator = new LevelCreator
  var player = new Player
  var input = new Input(player)
  var currentLevel = levelCreator.createLevel(4)
  player.setLevel(currentLevel)
  var audio = new Audio
  player.addAudio(audio)
}