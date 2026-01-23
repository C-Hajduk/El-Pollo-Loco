/**
 * Zentrale Klasse für die Audio-Verwaltung im Spiel.
 * Verwaltet alle Sound-Effekte und die Stummschaltung.
 * @class
 */
class SoundHub {
  /**
   * Gibt an, ob Audio abgespielt wird.
   * @type {boolean}
   */
  isPlaying = false;

  /**
   * Referenz zum Audio-Button im DOM.
   * @type {HTMLElement}
   */
  button;

  /**
   * Singleton-Instanz der SoundHub-Klasse.
   * @type {SoundHub|null}
   * @static
   */
  static instance = null;

  /**
   * Audio für Münzen-Sammlung.
   * @type {HTMLAudioElement}
   * @static
   */
  static coinCollectedAudio = new Audio('audio/coinSound.mp3');

  /**
   * Audio für Flaschen-Sammlung.
   * @type {HTMLAudioElement}
   * @static
   */
  static bottleCollectedAudio = new Audio('audio/bottleSound.mp3');

  /**
   * Audio für Sprung.
   * @type {HTMLAudioElement}
   * @static
   */
  static jumpAudio = new Audio('audio/jumpSound.mp3');

  /**
   * Audio für Laufen.
   * @type {HTMLAudioElement}
   * @static
   */
  static runningAudio = new Audio('audio/runningSound.mp3');

  /**
   * Audio für Endboss-Treffer.
   * @type {HTMLAudioElement}
   * @static
   */
  static hitEndbossAudio = new Audio('audio/hitEndbossSound.mp3');

  /**
   * Audio für totes Huhn.
   * @type {HTMLAudioElement}
   * @static
   */
  static deadChickenAudio = new Audio('audio/hitChickenSound.mp3');

  /**
   * Audio für toten Charakter.
   * @type {HTMLAudioElement}
   * @static
   */
  static deadCharacterAudio = new Audio('audio/LooseSound.mp3');

  /**
   * Audio für Charakter-Treffer.
   * @type {HTMLAudioElement}
   * @static
   */
  static hitCharacterAudio = new Audio('audio/hitCharacterSound.mp3');

  /**
   * Audio für Schnarchen.
   * @type {HTMLAudioElement}
   * @static
   */
  static snoringAudio = new Audio('audio/snoringSound.mp3');

  /**
   * Audio für Gewinn.
   * @type {HTMLAudioElement}
   * @static
   */
  static winAudio = new Audio('audio/WinnerSound.mp3');

  /**
   * Hintergrundmusik.
   * @type {HTMLAudioElement}
   * @static
   */
  static backgroundAudio = new Audio('audio/BackgroundSound.mp3');

  /**
   * Array aller Sound-Effekte.
   * @type {HTMLAudioElement[]}
   * @static
   */
  static allSounds = [
    SoundHub.coinCollectedAudio,
    SoundHub.bottleCollectedAudio,
    SoundHub.jumpAudio,
    SoundHub.runningAudio,
    SoundHub.hitEndbossAudio,
    SoundHub.deadChickenAudio,
    SoundHub.deadCharacterAudio,
    SoundHub.hitCharacterAudio,
    SoundHub.snoringAudio,
    SoundHub.winAudio,
    SoundHub.backgroundAudio
  ];

  /**
   * Erstellt eine neue SoundHub-Instanz.
   */
  constructor() {
    SoundHub.instance = this;
    SoundHub.runningAudio.loop = true;
  }

  /**
   * Initialisiert den Audio-Button und lädt den Mute-Status.
   */
  initButton() {
    this.button = document.getElementById('audio_button');
    this.updateButton();
  }

  /**
   * Lädt den Mute-Status aus dem localStorage.
   */
  loadMuteState() {
    let savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
      let settings = JSON.parse(savedSettings);
      this.isPlaying = settings.audioEnabled;
    }
  }

  /**
   * Speichert den Mute-Status im localStorage.
   */
  saveMute() {
    let settings = {
      audioEnabled: this.isPlaying
    };
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }

  /**
   * Spielt einen einzelnen Sound ab.
   * @param {HTMLAudioElement} sound - Der abzuspielende Sound.
   * @static
   */
  static playOne(sound) {
    if (SoundHub.instance && !SoundHub.instance.isPlaying) {
      return;
    }
    sound.volume = 0.2;
    sound.currentTime = 0;
    sound.play().catch((error) => {
      console.log('Audio playback was prevented:', error);
    });
  }

  /**
   * Pausiert alle Sounds.
   * @static
   */
  static pauseAll() {
    SoundHub.allSounds.forEach((sound) => {
      sound.pause();
    });
  }

  /**
   * Pausiert einen einzelnen Sound.
   * @param {HTMLAudioElement} sound - Der zu pausierende Sound.
   * @static
   */
  static pauseOne(sound) {
    sound.pause();
  }

  /**
   * Schaltet Audio ein/aus.
   */
  toggleAudio() {
    this.isPlaying = !this.isPlaying;
    this.saveMute();
    this.updateButton();
  }

  /**
   * Aktualisiert das Aussehen des Audio-Buttons.
   */
  updateButton() {
    if (this.button) {
      if (this.isPlaying) {
        this.button.style.backgroundColor = '#FFA500';
        this.button.innerHTML = '🔊';
      } else {
        this.button.style.backgroundColor = '#C92A2A';
        this.button.innerHTML = '🔇';
      }
    }
  }
}
