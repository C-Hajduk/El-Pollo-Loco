/**
 * Repräsentiert den spielbaren Hauptcharakter Pepe.
 * Verwaltet alle Animationen, Bewegungen und Zustände des Charakters.
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
  /**
   * Y-Position des Charakters.
   * @type {number}
   */
  y = 80;

  /**
   * Höhe des Charakters in Pixeln.
   * @type {number}
   */
  height = 250;

  /**
   * Breite des Charakters in Pixeln.
   * @type {number}
   */
  width = 125;

  /**
   * Bewegungsgeschwindigkeit des Charakters.
   * @type {number}
   */
  speed = 10;

  /**
   * Gibt an, ob der Charakter gerade schläft.
   * @type {boolean}
   */
  isSleeping = false;

  /**
   * Offset-Werte für die Kollisionserkennung.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 100,
    right: 15,
    bottom: 10,
    left: 15
  };

  /**
   * Bildpfade für die Laufanimation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];

  /**
   * Bildpfade für die Sprunganimation.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'
  ];

  /**
   * Bildpfade für die Todesanimation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ];

  /**
   * Bildpfade für die Verletzungsanimation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
  ];

  /**
   * Bildpfade für die Schlafanimation.
   * @type {string[]}
   */
  IMAGES_SLEEP = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];

  /**
   * Bildpfade für die Idle-Animation.
   * @type {string[]}
   */
  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
  ];

  /**
   * Referenz zur Spielwelt.
   * @type {World}
   */
  world;

  /**
   * Erstellt eine neue Character-Instanz.
   * Lädt alle Animationsbilder und initialisiert den Charakter.
   */
  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_IDLE);
    this.applyGravity();
    this.lastMove = Date.now();
    this.hurtDuration = 0.2;
    this.animate();
  }

  /**
   * Startet die Animations- und Bewegungsintervalle.
   */
  animate() {
    setStoppableInterval(() => this.characterMoving(), 1000 / 60);
    setStoppableInterval(() => this.playAnimationCharacter(), 120);
  }

  /**
   * Bestimmt und spielt die passende Animation basierend auf dem Zustand.
   */
  playAnimationCharacter() {
    if (this.isHurt()) {
      this.handleHurtAnimation();
    } else if (this.isAboveGround()) {
      this.handleJumpAnimation();
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.handleWalkAnimation();
    } else if (this.characterIsSleeping()) {
      this.handleSleepAnimation();
    } else {
      this.handleIdleAnimation();
    }
    this.isCharacterDead();
  }

  /**
   * Spielt die Verletzungsanimation ab.
   */
  handleHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * Spielt die Sprunganimation ab.
   */
  handleJumpAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
  }

  /**
   * Spielt die Laufanimation ab.
   */
  handleWalkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Spielt die Schlafanimation ab und startet den Schnarch-Sound.
   */
  handleSleepAnimation() {
    if (!this.isSleeping) {
      this.isSleeping = true;
      SoundHub.playOne(SoundHub.snoringAudio);
    }
    this.playAnimation(this.IMAGES_SLEEP);
  }

  /**
   * Spielt die Idle-Animation ab.
   */
  handleIdleAnimation() {
    this.playAnimation(this.IMAGES_IDLE);
  }

  /**
   * Verarbeitet die Bewegungseingaben und aktualisiert die Kamera.
   */
  characterMoving() {
    this.world.camera_x = -this.x + 100;
    if (!gameReady) return;
    if (this.canMoveRight()) this.characterMovingRight();
    if (this.canMoveLeft()) this.characterMovingLeft();
    if (this.canJump()) this.jump();
    this.handleRunningSound();
  }

  /**
   * Verwaltet den Lauf-Sound basierend auf der Bewegung.
   */
  handleRunningSound() {
    if (this.isMovingHorizontally()) {
      this.shouldPlayRunningSound() ? this.playRunningSound() : SoundHub.runningAudio.pause();
    } else {
      SoundHub.runningAudio.pause();
    }
  }

  /**
   * Prüft, ob sich der Charakter horizontal bewegt.
   * @returns {boolean} True wenn rechts oder links gedrückt wird.
   */
  isMovingHorizontally() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Prüft, ob der Lauf-Sound abgespielt werden soll.
   * @returns {boolean} True wenn Charakter am Boden ist und Sound aktiviert ist.
   */
  shouldPlayRunningSound() {
    return !this.isAboveGround() && SoundHub.instance.isPlaying;
  }

  /**
   * Startet den Lauf-Sound.
   */
  playRunningSound() {
    let audio = SoundHub.runningAudio;
    if (audio.paused) {
      audio.volume = 0.2;
      audio.play().catch(() => {});
    }
    this.loopRunningSound(audio);
  }

  /**
   * Loopt den Lauf-Sound nahtlos.
   * @param {HTMLAudioElement} audio - Das Audio-Element für den Lauf-Sound.
   */
  loopRunningSound(audio) {
    if (audio.currentTime > audio.duration - 0.5) {
      audio.currentTime = 0.1;
      audio.play().catch(() => {});
    }
  }

  /**
   * Prüft, ob der Charakter eingeschlafen ist.
   * @returns {boolean} True wenn der Charakter länger als 10 Sekunden inaktiv war.
   */
  characterIsSleeping() {
    let timepassed = new Date().getTime() - this.lastMove;
    timepassed = timepassed / 1000;
    return timepassed > 10 && timepassed < 3600;
  }

  /**
   * Prüft, ob der Charakter tot ist und zeigt Game Over an.
   */
  isCharacterDead() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      SoundHub.playOne(SoundHub.deadCharacterAudio);
      SoundHub.backgroundAudio.pause();
      gameOver();
    }
  }

  /**
   * Prüft, ob der Charakter nach rechts laufen kann.
   * @returns {boolean} True wenn Rechts gedrückt wird und Level-Ende nicht erreicht.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Bewegt den Charakter nach rechts.
   */
  characterMovingRight() {
    this.isSleeping = false;
    this.moveRight();
    this.otherDirection = false;
    this.lastMove = Date.now();
  }

  /**
   * Prüft, ob der Charakter nach links laufen kann.
   * @returns {boolean} True wenn Links gedrückt wird und Startpunkt nicht erreicht.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > -300;
  }

  /**
   * Bewegt den Charakter nach links.
   */
  characterMovingLeft() {
    this.isSleeping = false;
    this.moveLeft();
    this.otherDirection = true;
    this.lastMove = Date.now();
  }

  /**
   * Prüft, ob der Charakter springen kann.
   * @returns {boolean} True wenn Leertaste gedrückt wird und Charakter am Boden ist.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Lässt den Charakter springen.
   * @override
   */
  jump() {
    this.isSleeping = false;
    this.speedY = 25;
    this.lastMove = Date.now();
    SoundHub.playOne(SoundHub.jumpAudio);
  }

  /**
   * Weckt den Charakter auf.
   */
  wakeUp() {
    this.isSleeping = false;
    this.lastMove = Date.now() + 6000;
  }
}
