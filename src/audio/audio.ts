import { Echo } from "./echo"

export class Audio {
  audioContext: AudioContext
  audioElement
  click

  leftSignal: Echo
  rightSignal: Echo
  forwardSignal: Echo

  constructor() {
    this.audioContext = new AudioContext();
    this.audioElement = document.querySelector('audio');
    this.click = this.audioContext.createMediaElementSource(this.audioElement);
    this.leftSignal = new Echo(this.audioContext, this.click, -1)
    this.rightSignal = new Echo(this.audioContext, this.click, 1)
    this.forwardSignal = new Echo(this.audioContext, this.click, 0)
  }
  
  playClick() {
    console.log("play called")
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    this.click.connect(this.audioContext.destination);
    this.audioElement.play()
    // this.click.disconnect(this.audioContext.destination)
  }

  buildEcho(left, right, forward) {
    this.leftSignal.addEchoValues(left)
    this.leftSignal.connectEcho()
    this.rightSignal.addEchoValues(right)
    this.rightSignal.connectEcho()
    this.forwardSignal.addEchoValues(forward)
    this.forwardSignal.connectEcho()
  }
}

