export class Echo {
    constructor(audioContext, click, pan, delay = 0) {
        this.audioContext = audioContext;
        this.panNode = audioContext.createStereoPanner();
        this.panNode.pan.value = pan;
        this.panNodeOpposite = audioContext.createStereoPanner();
        this.panNodeOpposite.pan.value = pan * -1;
        this.defaultGain = 0.8 / (2 - pan ** 2); //half for forward
        this.click = click;
        this.stepDelay = this.audioContext.createDelay();
        this.stepDelay.delayTime.value = delay;
        this.echoDelay = this.audioContext.createDelay();
        this.echoGain = this.audioContext.createGain();
        this.echoDelayOpposite = this.audioContext.createDelay();
        this.echoGainOpposite = this.audioContext.createGain();
        this.addEchoValues(0);
    }
    addEchoValues(distance) {
        if (distance > 0) {
            this.echoDelay.delayTime.value = distance / 10;
            this.echoGain.gain.value = (this.defaultGain / (2 * distance) ** 2);
            this.echoDelayOpposite.delayTime.value = distance / 10 + 1 / 1000;
            this.echoGainOpposite.gain.value = this.echoGain.gain.value / 10;
        }
        else {
            this.echoDelay.delayTime.value = 0;
            this.echoGain.gain.value = 0;
            this.echoDelayOpposite.delayTime.value = 0;
            this.echoGainOpposite.gain.value = 0;
        }
        console.log(this.echoGain.gain.value, distance);
    }
    connectEcho() {
        console.log(this.echoGain.gain.value, "connect");
        this.click.connect(this.stepDelay);
        this.stepDelay.connect(this.echoDelay);
        this.echoDelay.connect(this.echoGain);
        this.echoGain.connect(this.panNode);
        this.panNode.connect(this.audioContext.destination);
        if (this.panNode.pan.value != 0) {
            this.click.connect(this.echoDelayOpposite);
            this.echoDelayOpposite.connect(this.echoGainOpposite);
            this.echoGainOpposite.connect(this.panNodeOpposite);
            this.panNodeOpposite.connect(this.audioContext.destination);
        }
    }
}
//# sourceMappingURL=echo.js.map