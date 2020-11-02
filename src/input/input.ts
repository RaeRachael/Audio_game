import { Audio } from "../audio/audio";
import { Player } from "../player/player";
import { displayText } from "../main";

export class Input {
  player: Player;
  audio: Audio
  active: Boolean = false;

  constructor(player) {
    this.player = player

    // document.body.addEventListener("touchstart", touchScreenPress, false)
    // document.body.addEventListener("touchend", touchScreenPressEnd, false)
    window.addEventListener("keydown", e => { this.keyResponse(e.key); });
  }

  keyResponse(key: String){
    if (this.active){
      if (key == "ArrowUp") {
        this.player.step()
      }
      if (key == "ArrowRight") {
        this.player.right()
      }
      if (key == "ArrowLeft") {
        this.player.left()
      }
    } else {
      if (key == " ") {
        displayText("Use left/right arrow keys to turn and the up arrow to step forward")
        this.player.firstSound()
      }
    }
  }
}