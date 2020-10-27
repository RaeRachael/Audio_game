export class Echo {
  audioContext: AudioContext
  panNode: StereoPannerNode
  echoDelay: DelayNode
  echoGain: GainNode
  panNodeOpposite: StereoPannerNode
  echoDelayOpposite: DelayNode
  echoGainOpposite: GainNode
  click

  constructor(audioContext, click, pan) {
    this.audioContext = audioContext
    this.panNode = audioContext.createStereoPanner()
    this.panNode.pan.value = pan
    this.panNodeOpposite = audioContext.createStereoPanner()
    this.panNodeOpposite.pan.value = pan * - 1
    this.click = click
  }

  addEchoValues(distance) {
    this.echoDelay = this.audioContext.createDelay()
    this.echoDelay.delayTime.value = distance/10
    this.echoGain = this.audioContext.createGain()
    this.echoGain.gain.value = (0.5 * 1 / distance)
    this.echoDelayOpposite = this.audioContext.createDelay()
    this.echoDelayOpposite.delayTime.value = distance/100 + 1/1000
    this.echoGainOpposite = this.audioContext.createGain()
    this.echoGain.gain.value = (0.2 / distance)
  }

  connectEcho(){
    this.click.connect(this.echoDelay)
    this.echoDelay.connect(this.echoGain)
    this.echoGain.connect(this.panNode)
    this.panNode.connect(this.audioContext.destination)
    this.click.connect(this.echoDelayOpposite)
    this.echoDelayOpposite.connect(this.echoGainOpposite)
    this.echoGainOpposite.connect(this.panNodeOpposite)
    this.panNodeOpposite.connect(this.audioContext.destination)
  }

}