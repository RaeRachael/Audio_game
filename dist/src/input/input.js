export class Input {
    constructor(player) {
        this.player = player;
        // document.body.addEventListener("touchstart", touchScreenPress, false)
        // document.body.addEventListener("touchend", touchScreenPressEnd, false)
        window.addEventListener("keydown", e => { this.keyResponse(e.key); });
    }
    keyResponse(key) {
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
        console.log(this.player.position, this.player.direction);
        console.log(this.player.currentLevel.levelMap, "map");
    }
}
//# sourceMappingURL=input.js.map