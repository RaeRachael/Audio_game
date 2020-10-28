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

  audioSequence(left: number, right: number, forward: number) {
    this.disconnect()
    this.buildEcho(left, right, forward)
    this.playClick()
  }

  disconnect() {
    this.click.disconnect(this.audioContext.destination)
    this.leftSignal.disconnectEcho()
    this.rightSignal.disconnectEcho()
    this.leftSignal.disconnectEcho()
  }
  
  playClick() {
    console.log("play called")
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
}

