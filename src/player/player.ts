import { Audio } from "../audio/audio";
import { findCorrectTile } from "../helpers/helpers";
import { directionValues } from "../helpers/typesAndConst";
import { Level } from "../level/level";
import { displayText } from "../main";

export class Player {
  currentLevel: Level
  position: {x: number, y:number};
  direction: string;
  audio: Audio;

  constructor() {
    this.position = {x: 0, y: 0};
    this.direction = "North"
  }

  addAudio(audio: Audio) {
    this.audio = audio
  }

  setLevel(newLevel: Level){
    this.currentLevel = newLevel
  }

  reset() {
    this.position = {x: 0, y: 0};
    this.direction = "North"
  }

  step() {
    if (this.currentLevel.blockingDistance(this.position, this.direction) != 0.5) {
      this.position.x += directionValues[this.direction].x
      this.position.y += directionValues[this.direction].y
      this.triggerSecondStepAudio()
    } else {
      this.triggerAudio()
    }
    if (findCorrectTile(this.currentLevel.levelMap, this.position).exitTile) {
      displayText("ExitTile")
    }
  }

  left() {
    this.direction = directionValues[this.direction].left
    this.triggerAudio()
  }

  right() {
    this.direction = directionValues[this.direction].right
    this.triggerAudio()
  }

  triggerAudio() {
    var left = directionValues[this.direction].left
    var distanceLeft = this.currentLevel.blockingDistance(this.position, left)
    var right = directionValues[this.direction].right
    var distanceRight = this.currentLevel.blockingDistance(this.position, right)
    var distanceForward = this.currentLevel.blockingDistance(this.position, this.direction)
    this.audio.audioSequence(distanceLeft, distanceRight, distanceForward)
  }

  triggerSecondStepAudio(){
    var left = directionValues[this.direction].left
    var distanceLeft = this.currentLevel.blockingDistance(this.position, left)
    var right = directionValues[this.direction].right
    var distanceRight = this.currentLevel.blockingDistance(this.position, right)
    var distanceForward = this.currentLevel.blockingDistance(this.position, this.direction)
    this.audio.secondClickAudio(distanceLeft, distanceRight, distanceForward)
  }

  firstSound() {
    this.audio.makeConnections()
    this.triggerAudio()
  }

}