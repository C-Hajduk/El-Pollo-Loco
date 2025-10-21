class SoundHub {
  isPlaying = true;
  button;

  constructor() {
    this.button = document.getElementById('audio_button');
  }

  toggleAudio() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.button.style.backgroundColor = '#FFA500';
      this.button.innerHTML = '🔊';
    } else {
      this.button.style.backgroundColor = '#C92A2A';
      this.button.innerHTML = '🔇';
    }
  }
}
