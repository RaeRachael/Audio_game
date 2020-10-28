export class Echo {
  audioContext: AudioContext
  panNode: StereoPannerNode
  echoDelay: DelayNode
  echoGain: GainNode
  panNodeOpposite: StereoPannerNode
  echoDelayOpposite: DelayNode
  echoGainOpposite: GainNode
  click

  constructor(audioContext: AudioContext, click, pan: number) {
    this.audioContext = audioContext
    this.panNode = audioContext.createStereoPanner()
    this.panNode.pan.value = pan
    this.panNodeOpposite = audioContext.createStereoPanner()
    this.panNodeOpposite.pan.value = pan * - 1
    this.click = click
    this.echoDelay = this.audioContext.createDelay();
    this.echoGain = this.audioContext.createGain();
    this.echoDelayOpposite = this.audioContext.createDelay();
    this.echoGainOpposite = this.audioContext.createGain();
    this.addEchoValues(0)
  }

  addEchoValues(distance) {
    if ( distance > 0) {
      this.echoDelay.delayTime.value = distance/10
      this.echoGain.gain.value = (0.8 / (2 * distance)**2)
      this.echoDelayOpposite.delayTime.value = distance/10 + 1/1000
      this.echoGainOpposite.gain.value = (0.1 / (2 * distance)**2)
    } else {
      this.echoDelay.delayTime.value = 0
      this.echoGain.gain.value = 0
      this.echoDelayOpposite.delayTime.value = 0
      this.echoGainOpposite.gain.value = 0
    }
    console.log(this.echoGain.gain.value, distance)
  }

  connectEcho(){
    console.log(this.echoGain.gain.value, "connect")
    this.click.connect(this.echoDelay)
    this.echoDelay.connect(this.echoGain)
    this.echoGain.connect(this.panNode)
    this.panNode.connect(this.audioContext.destination)
    if (this.panNode.pan.value != 0) {
      this.click.connect(this.echoDelayOpposite)
      this.echoDelayOpposite.connect(this.echoGainOpposite)
      this.echoGainOpposite.connect(this.panNodeOpposite)
      this.panNodeOpposite.connect(this.audioContext.destination)
    }
  }

  // disconnectEcho() {
  //   this.panNode.disconnect(this.audioContext.destination)
  //   if (this.panNode.pan.value !=0) {
  //     this.panNodeOpposite.disconnect(this.audioContext.destination)
  //   }
  // }

}