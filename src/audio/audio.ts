import { Echo } from "./echo"

export class Audio {
  audioContext: AudioContext
  audioElement
  click: MediaElementAudioSourceNode
  stepDelay: DelayNode
  stepDelayGain: GainNode
  stepDelayTime: number = 0.5

  leftSignal: Echo
  rightSignal: Echo
  forwardSignal: Echo
  
  secondLeftSignal: Echo
  secondRightSignal: Echo
  secondForwardSignal: Echo

  constructor() {
    this.audioContext = new AudioContext();
    this.audioElement = document.querySelector('audio');
    this.click = this.audioContext.createMediaElementSource(this.audioElement);
    this.leftSignal = new Echo(this.audioContext, this.click, -1)
    this.rightSignal = new Echo(this.audioContext, this.click, 1)
    this.forwardSignal = new Echo(this.audioContext, this.click, 0)
    this.stepDelay = this.audioContext.createDelay()
    this.stepDelay.delayTime.value = this.stepDelayTime
    this.click.connect(this.stepDelay)
    this.secondLeftSignal = new Echo(this.audioContext, this.click, -1, this.stepDelayTime)
    this.secondRightSignal = new Echo(this.audioContext, this.click, 1, this.stepDelayTime)
    this.secondForwardSignal = new Echo(this.audioContext, this.click, 0, this.stepDelayTime)
    this.stepDelayGain = this.audioContext.createGain()
    this.stepDelayGain.gain.value = 1
    this.stepDelay.connect(this.stepDelayGain)
  }

  secondClickAudio(left: number, right: number, forward: number) {
    this.buildEcho(left, right, forward)
    this.buildSecondEcho(left, right, forward)
    this.stepDelayGain.gain.value = 1
    this.stepDelayGain.connect(this.audioContext.destination)
    this.playClick()
  }

  audioSequence(left: number, right: number, forward: number) {
    this.buildEcho(left, right, forward)
    this.buildSecondEcho(0, 0, 0)
    this.stepDelayGain.gain.value = 0
    this.playClick()
  }
  
  playClick() {
    this.audioElement.pause()
    this.audioElement.currentTime = 0
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    this.click.connect(this.audioContext.destination);
    this.audioElement.play()
  }

  buildEcho(left: number, right: number, forward: number) {
    this.leftSignal.addEchoValues(left)
    this.leftSignal.connectEcho()
    this.rightSignal.addEchoValues(right)
    this.rightSignal.connectEcho()
    this.forwardSignal.addEchoValues(forward)
    this.forwardSignal.connectEcho()
  }

  buildSecondEcho(left: number, right: number, forward: number) {
    this.secondLeftSignal.addEchoValues(left)
    this.secondLeftSignal.connectEcho()
    this.secondRightSignal.addEchoValues(right)
    this.secondRightSignal.connectEcho()
    this.secondForwardSignal.addEchoValues(forward)
    this.secondForwardSignal.connectEcho()
  }
}

