import { Echo } from "./echo.js";
export class Audio {
    constructor() {
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
        this.disconnect();
        this.buildEcho(left, right, forward);
        this.buildSecondEcho(left, right, forward);
        this.stepDelayGain.gain.value = 1;
        this.stepDelayGain.connect(this.audioContext.destination);
        this.playClick();
    }
    audioSequence(left, right, forward) {
        this.disconnect();
        this.buildEcho(left, right, forward);
        this.buildSecondEcho(0, 0, 0);
        this.stepDelayGain.gain.value = 0;
        this.playClick();
    }
    disconnect() {
        this.click.disconnect(this.audioContext.destination);
        this.leftSignal.disconnectEcho();
        this.rightSignal.disconnectEcho();
        this.leftSignal.disconnectEcho();
    }
    playClick() {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        console.log("play called");
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        this.click.connect(this.audioContext.destination);
        this.audioElement.play();
    }
    buildEcho(left, right, forward) {
        this.leftSignal.addEchoValues(left);
        this.leftSignal.connectEcho();
        this.rightSignal.addEchoValues(right);
        this.rightSignal.connectEcho();
        this.forwardSignal.addEchoValues(forward);
        this.forwardSignal.connectEcho();
    }
    buildSecondEcho(left, right, forward) {
        this.secondLeftSignal.addEchoValues(left);
        this.secondLeftSignal.connectEcho();
        this.secondRightSignal.addEchoValues(right);
        this.secondRightSignal.connectEcho();
        this.secondForwardSignal.addEchoValues(forward);
        this.secondForwardSignal.connectEcho();
    }
}
//# sourceMappingURL=audio.js.map