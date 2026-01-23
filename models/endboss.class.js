/**
 * Repräsentiert den Endboss des Spiels - ein riesiges Huhn.
 * Hat verschiedene Animationen für Alert, Walk, Attack, Hurt und Dead.
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /**
   * Höhe des Endbosses in Pixeln.
   * @type {number}
   */
  height = 450;

  /**
   * Breite des Endbosses in Pixeln.
   * @type {number}
   */
  width = 300;

  /**
   * Y-Position des Endbosses.
   * @type {number}
   */
  y = 0;

  /**
   * Bewegungsgeschwindigkeit des Endbosses.
   * @type {number}
   */
  speed = 50;

  /**
   * Offset-Werte für die Kollisionserkennung.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 70,
    right: 5,
    bottom: 15,
    left: 5
  };

  /**
   * Bildpfade für die Alert-Animation.
   * @type {string[]}
   */
  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  /**
   * Bildpfade für die Laufanimation.
   * @type {string[]}
   */
  IMAGES_WALK = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  /**
   * Bildpfade für die Angriffsanimation.
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png'
  ];

  /**
   * Bildpfade für die Verletzungsanimation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];

  /**
   * Bildpfade für die Todesanimation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
  ];

  /**
   * Erstellt einen neuen Endboss.
   * Lädt alle Animationsbilder und setzt Initialzustand.
   */
  constructor() {
    super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.isActive = false;
    this.isWalking = false;
    this.isHurt = false;
    this.isAttacking = false;
    this.x = 2500;
  }

  /**
   * Aktualisiert den Endboss-Zustand basierend auf Spielerposition.
   * @param {Character} character - Der Spielercharakter.
   * @param {World} world - Die Spielwelt.
   */
  update(character, world) {
    if (this.isDead()) {
      this.deadAnimation();
      return;
    }
    // Spieler erreicht Boss-Zone
    if (character.x >= 2000 && !this.isActive) {
      this.startAnimation();
      world.endbossBar.visible = true;
    }

    if (this.isHurt || this.isAttacking) return;

    // Wenn Boss läuft
    if (this.isWalking) {
      this.moveLeft();
      this.playAnimation(this.IMAGES_WALK);
    }
    // Wenn Boss auf Character trifft
    if (this.isColliding(character)) {
      this.attackAnimation(character);
    }
  }

  /**
   * Startet die Alert-Animation wenn der Boss aktiviert wird.
   */
  startAnimation() {
    this.isActive = true;

    let alertIntervall = setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 200);

    setTimeout(() => {
      clearInterval(alertIntervall);
      this.isWalking = true;
    }, 2000);
  }

  /**
   * Führt die Angriffsanimation aus.
   * @param {Character} character - Der Spielercharakter.
   */
  attackAnimation(character) {
    if (this.isAttacking) return;
    this.isAttacking = true;
    this.isWalking = false;

    let attackInterval = setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_ATTACK);
    }, 100);

    setTimeout(() => {
      clearInterval(attackInterval);
      this.isAttacking = false;
      if (!this.isDead()) {
        this.isWalking = true;
      }
    }, 1000);
  }

  /**
   * Führt die Verletzungsanimation aus und spielt Sound.
   */
  hurtAnimation() {
    if (this.isHurt) return;
    this.isHurt = true;
    this.isWalking = false;

    let hurtInterval = setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_HURT);
    }, 200);

    setTimeout(() => {
      clearInterval(hurtInterval);
      this.isHurt = false;
      if (!this.isDead()) {
        this.isWalking = true;
      }
    }, 1500);

    SoundHub.playOne(SoundHub.hitEndbossAudio);
  }

  /**
   * Führt die Todesanimation aus und beendet das Spiel.
   */
  deadAnimation() {
    let deadIntervall = setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        playerWon();
        SoundHub.playOne(SoundHub.winAudio);
      }
    }, 200);

    setTimeout(() => {
      clearInterval(deadIntervall);
      this.speed = 0;
    }, 200);
  }
}
