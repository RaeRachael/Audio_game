import { Echo } from "./echo"

export class Audio {
  audioContext
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
    

    // const channelsCount = 2; // or read from: 'audioSource.channelCount'

    // const splitterNode = new ChannelSplitterNode(audioContext, { numberOfOutputs: channelsCount });
    // const mergerNode = new ChannelMergerNode(audioContext, { numberOfInputs: channelsCount });

    // audioSource.connect(splitterNode);

    // splitterNode.connect(volumeNodeL, 0); // connect OUTPUT channel 0
    // splitterNode.connect(volumeNodeR, 1); // connect OUTPUT channel 1

    // volumeNodeL.connect(mergerNode, 0, 0); // connect INPUT channel 0
    // volumeNodeR.connect(mergerNode, 0, 1); // connect INPUT channel 1

    // mergerNode.connect(audioContext.destination);

