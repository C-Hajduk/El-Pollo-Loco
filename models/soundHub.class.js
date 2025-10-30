class SoundHub {
  isPlaying = true;
  button;
  static coinCollectedAudio = new Audio('audio/coin-257878.mp3');
  static bottleCollectedAudio = new Audio('audio/bottle-clink-101000.mp3');
  static jumpAudio = new Audio('audio/pixel-jump-319167.mp3');
  static runningAudio = new Audio('audio/running-on-sand-357373.mp3');
  static deadChickenAudio = new Audio('audio/chicken-single-alarm-call-6056.mp3');
  static deadCharacterAudio = new Audio('audio/dead-8bit-41400.mp3');
  static hitCharacterAudio = new Audio('audio/young-man-being-hurt-95628.mp3');
  static backgroundAudio = new Audio(
    'audio/JDSherbert - Nostalgia Music Pack - Treehouse Party.mp3'
  );

  static allSounds = [
    SoundHub.coinCollectedAudio,
    SoundHub.bottleCollectedAudio,
    SoundHub.jumpAudio,
    SoundHub.runningAudio,
    SoundHub.deadChickenAudio,
    SoundHub.deadCharacterAudio,
    SoundHub.hitCharacterAudio,
    SoundHub.backgroundAudio
  ];

  constructor() {
    this.button = document.getElementById('audio_button');
  }

  static playOne(sound) {
    sound.volume = 0.2;
    sound.currentTime = 0;
    sound.play();
  }

  static pauseAll() {
    SoundHub.allSounds.forEach((sound) => {
      sound.pause();
    });
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
