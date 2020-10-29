import { Audio } from "./audio/audio";
import { Input } from "./input/input";
import { LevelCreator } from "./level/levelCreator";
import { Player } from "./player/player"

let input: Input
let levelNumber: number = 0
let player: Player
let levelCreator: LevelCreator

document.addEventListener("DOMContentLoaded", setup);

export function setup() {
  levelCreator = new LevelCreator
  player = new Player
  input = new Input(player)
  var audio = new Audio
  player.addAudio(audio)
}

export function displayText(text: string) {
  var displayBlock = document.getElementById("display_block")
  displayBlock.innerHTML = text
  input.active = !input.active
  if (input.active) {
    levelNumber++
    player.reset()
    var currentLevel = levelCreator.createLevel(levelNumber)
    player.setLevel(currentLevel)
    console.log(levelNumber, currentLevel)
  }
}