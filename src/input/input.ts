import { Audio } from "../audio/audio";
import { Player } from "../player/player";

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
      console.log(key)
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
        this.active = true
        this.player.firstSound()
      }
    }
  }
}