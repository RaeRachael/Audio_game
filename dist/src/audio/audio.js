import { Echo } from "./echo.js";
export class Audio {
    constructor() {
        this.silentSteps = false;
        this.stepDelayTime = 0.5;
        this.audioContext = new AudioContext();
        this.audioElement = document.querySelector('audio');
        this.click = this.audioContext.createMediaElementSource(this.audioElement);
        this.leftSignal = new Echo(this.audioContext, this.click, -1);
        this.rightSignal = new Echo(this.audioContext, this.click, 1);
        this.forwardSignal = new Echo(this.audioContext, this.click, 0);
        this.stepDelay = this.audioContext.createDelay();
        this.stepDelay.delayTime.value = this.stepDelayTime;
        this.click.connect(this.stepDelay);
        this.secondLeftSignal = new Echo(this.audioContext, this.click, -1, this.stepDelayTime);
        this.secondRightSignal = new Echo(this.audioContext, this.click, 1, this.stepDelayTime);
        this.secondForwardSignal = new Echo(this.audioContext, this.click, 0, this.stepDelayTime);
        this.stepDelayGain = this.audioContext.createGain();
        this.stepDelayGain.gain.value = 1;
        this.stepDelay.connect(this.stepDelayGain);
    }
    secondClickAudio(left, right, forward) {
        this.buildEcho(left, right, forward);
        this.buildSecondEcho(left, right, forward);
        this.stepDelayGain.gain.value = 1;
        this.playClick();
    }
    audioSequence(left, right, forward) {
        this.buildEcho(left, right, forward);
        this.buildSecondEcho(0, 0, 0);
        this.stepDelayGain.gain.value = 0;
        this.playClick();
    }
    playClick() {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        this.audioElement.play();
    }
    buildEcho(left, right, forward) {
        this.leftSignal.addEchoValues(left);
        this.rightSignal.addEchoValues(right);
        this.forwardSignal.addEchoValues(forward);
    }
    buildSecondEcho(left, right, forward) {
        this.secondLeftSignal.addEchoValues(left);
        this.secondRightSignal.addEchoValues(right);
        this.secondForwardSignal.addEchoValues(forward);
    }
    makeConnections() {
        this.leftSignal.connectEcho();
        this.rightSignal.connectEcho();
        this.forwardSignal.connectEcho();
        this.secondLeftSignal.connectEcho();
        this.secondRightSignal.connectEcho();
        this.secondForwardSignal.connectEcho();
        if (this.silentSteps == false) {
            this.click.connect(this.audioContext.destination);
            this.stepDelayGain.connect(this.audioContext.destination);
        }
    }
}
//# sourceMappingURL=audio.js.map