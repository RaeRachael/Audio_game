import { Echo } from "./echo.js";
export class Audio {
    constructor() {
        this.silentSteps = false;
        this.stepDelayTime = 0.5;
        this.audioContext = new AudioContext();
        this.audioClick = document.getElementById('click');
        this.click = this.audioContext.createMediaElementSource(this.audioClick);
        this.audioDing = document.getElementById('ding');
        this.exitDing = this.audioContext.createMediaElementSource(this.audioDing);
        this.leftSignal = new Echo(this.audioContext, this.click, -1);
        this.rightSignal = new Echo(this.audioContext, this.click, 1);
        this.forwardSignal = new Echo(this.audioContext, this.click, 0);
        this.stepDelay = this.audioContext.createDelay();
        this.secondLeftSignal = new Echo(this.audioContext, this.click, -1, this.stepDelayTime);
        this.secondRightSignal = new Echo(this.audioContext, this.click, 1, this.stepDelayTime);
        this.secondForwardSignal = new Echo(this.audioContext, this.click, 0, this.stepDelayTime);
        this.stepDelayGain = this.audioContext.createGain();
        this.stepDelayGain.gain.value = 1;
        this.stepDelay.connect(this.stepDelayGain);
        this.exitLeftSignal = new Echo(this.audioContext, this.exitDing, -1);
        this.exitRightSignal = new Echo(this.audioContext, this.exitDing, 1);
        this.exitForwardSignal = new Echo(this.audioContext, this.exitDing, 0);
        this.stepDelay = this.audioContext.createDelay();
        this.exitSecondLeftSignal = new Echo(this.audioContext, this.exitDing, -1, this.stepDelayTime);
        this.exitSecondRightSignal = new Echo(this.audioContext, this.exitDing, 1, this.stepDelayTime);
        this.exitSecondForwardSignal = new Echo(this.audioContext, this.exitDing, 0, this.stepDelayTime);
        this.stepDelayGain = this.audioContext.createGain();
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
        this.audioClick.pause();
        this.audioDing.pause();
        this.audioClick.currentTime = 0;
        this.audioDing.currentTime = 0;
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        this.audioClick.play();
        this.audioDing.play();
    }
    buildEcho(left, right, forward) {
        this.leftSignal.addEchoValues(left);
        this.rightSignal.addEchoValues(right);
        this.forwardSignal.addEchoValues(forward);
        this.exitLeftSignal.addEchoValues(-left);
        this.exitRightSignal.addEchoValues(-right);
        this.exitForwardSignal.addEchoValues(-forward);
    }
    buildSecondEcho(left, right, forward) {
        this.secondLeftSignal.addEchoValues(left);
        this.secondRightSignal.addEchoValues(right);
        this.secondForwardSignal.addEchoValues(forward);
        this.exitSecondLeftSignal.addEchoValues(-left);
        this.exitSecondRightSignal.addEchoValues(-right);
        this.exitSecondForwardSignal.addEchoValues(-forward);
    }
    makeConnections() {
        this.leftSignal.connectEcho();
        this.rightSignal.connectEcho();
        this.forwardSignal.connectEcho();
        this.secondLeftSignal.connectEcho();
        this.secondRightSignal.connectEcho();
        this.secondForwardSignal.connectEcho();
        this.exitLeftSignal.connectEcho();
        this.exitRightSignal.connectEcho();
        this.exitForwardSignal.connectEcho();
        this.exitSecondLeftSignal.connectEcho();
        this.exitSecondRightSignal.connectEcho();
        this.exitSecondForwardSignal.connectEcho();
        if (this.silentSteps == false) {
            this.click.connect(this.audioContext.destination);
            this.stepDelayGain.connect(this.audioContext.destination);
        }
    }
}
//# sourceMappingURL=audio.js.map