import { displayText } from "../main";
export class Input {
    constructor(player) {
        this.active = false;
        this.player = player;
        // document.body.addEventListener("touchstart", touchScreenPress, false)
        // document.body.addEventListener("touchend", touchScreenPressEnd, false)
        window.addEventListener("keydown", e => { this.keyResponse(e.key); });
    }
    keyResponse(key) {
        if (this.active) {
            console.log(key);
            if (key == "ArrowUp") {
                this.player.step();
            }
            if (key == "ArrowRight") {
                this.player.right();
            }
            if (key == "ArrowLeft") {
                this.player.left();
            }
        }
        else {
            if (key == " ") {
                displayText("Use left/right arrow keys to turn and the up arrow to step forward");
                this.player.firstSound();
            }
        }
    }
}
//# sourceMappingURL=input.js.map