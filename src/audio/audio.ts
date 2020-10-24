
export class Audio {
  audioContext
  audioElement
  click

  constructor() {
    this.audioContext = new AudioContext();
    this.audioElement = document.querySelector('audio');
    this.click = this.audioContext.createMediaElementSource(this.audioElement);
  }
  
  playClick() {
    console.log("play called")
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    this.click.connect(this.audioContext.destination);
    this.audioElement.play()
  }
}
