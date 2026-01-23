/**
 * Repräsentiert ein normales Huhn-Gegner im Spiel.
 * Bewegt sich automatisch nach links und kann vom Charakter besiegt werden.
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /**
   * Y-Position des Huhns.
   * @type {number}
   */
  y = 330;

  /**
   * Höhe des Huhns in Pixeln.
   * @type {number}
   */
  height = 100;

  /**
   * Anfangsenergie des Huhns.
   * @type {number}
   */
  energy = 0;

  /**
   * Offset-Werte für die Kollisionserkennung.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 5,
    right: 0,
    bottom: 10,
    left: 0
  };

  /**
   * Bildpfade für die Laufanimation.
   * @type {string[]}
   */
  NORMAL_CHICKEN_IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  /**
   * Bildpfade für die Todesanimation.
   * @type {string[]}
   */
  NORMAL_CHICKEN_IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  /**
   * Erstellt ein neues Huhn mit zufälliger Position und Geschwindigkeit.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.NORMAL_CHICKEN_IMAGES_WALKING);
    this.loadImages(this.NORMAL_CHICKEN_IMAGES_DEAD);

    this.x = 600 + Math.random() * 2500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Startet die Bewegungs- und Animationsintervalle.
   */
  animate() {
    setStoppableInterval(() => {
      if (!gameReady) return;
      if (!this.isKilled) this.moveLeft();
    }, 1000 / 60);

    setStoppableInterval(() => {
      if (!gameReady) return;
      if (!this.isKilled) this.playAnimation(this.NORMAL_CHICKEN_IMAGES_WALKING);
    }, 200);
  }

  /**
   * Spielt die Todesanimation ab.
   * @returns {void}
   */
  deadAnimation() {
    return this.playAnimation(this.NORMAL_CHICKEN_IMAGES_DEAD);
  }
}
