export class Echo {
    constructor(audioContext, click, pan) {
        this.audioContext = audioContext;
        this.panNode = audioContext.createStereoPanner();
        this.panNode.pan.value = pan;
        this.panNodeOpposite = audioContext.createStereoPanner();
        this.panNodeOpposite.pan.value = pan * -1;
        this.click = click;
    }
    addEchoValues(distance) {
        if (distance > 0) {
            this.echoDelay = this.audioContext.createDelay();
            this.echoDelay.delayTime.value = distance / 10;
            this.echoGain = this.audioContext.createGain();
            this.echoGain.gain.value = (0.8 / (2 * distance) ** 5);
            this.echoDelayOpposite = this.audioContext.createDelay();
            this.echoDelayOpposite.delayTime.value = distance / 10 + 1 / 1000;
            this.echoGainOpposite = this.audioContext.createGain();
            this.echoGainOpposite.gain.value = (0.1 / (2 * distance) ** 5);
        }
        else {
            this.echoGain.gain.value = 0;
            this.echoGainOpposite.gain.value = 0;
        }
    }
    connectEcho() {
        this.click.connect(this.echoDelay);
        this.echoDelay.connect(this.echoGain);
        this.echoGain.connect(this.panNode);
        this.panNode.connect(this.audioContext.destination);
        this.click.connect(this.echoDelayOpposite);
        if (this.panNode.pan.value != 0) {
            this.echoDelayOpposite.connect(this.echoGainOpposite);
            this.echoGainOpposite.connect(this.panNodeOpposite);
            this.panNodeOpposite.connect(this.audioContext.destination);
        }
    }
}
//# sourceMappingURL=echo.js.map