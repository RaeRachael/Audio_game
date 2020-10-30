import { Audio } from "./audio/audio";
import { Input } from "./input/input";
import { LevelCreator } from "./level/levelCreator";
import { Player } from "./player/player"

let input: Input
let levelNumber: number = 0
let player: Player
let levelCreator: LevelCreator
let audio: Audio

document.addEventListener("DOMContentLoaded", setup);

var silentSteps = <HTMLInputElement> document.getElementById("silentSteps");
silentSteps.oninput = () => {
  var text = document.getElementById("text");
  if (silentSteps.checked == true){
    text.style.display = "block";
    audio.silentSteps = true
  } else {
    text.style.display = "none";
    audio.silentSteps = false
  }
}

var branchingValue = <HTMLInputElement> document.getElementById("branchingValue");
branchingValue.onchange = () => {
  getBranchingValue(parseFloat(branchingValue.value))
}

function getBranchingValue(value: number) {
  levelCreator.branchingValue = value
}

export function setup() {
  levelCreator = new LevelCreator
  player = new Player
  input = new Input(player)
  audio = new Audio
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