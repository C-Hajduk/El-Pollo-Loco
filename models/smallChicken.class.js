/**
 * Repräsentiert ein kleines Huhn-Gegner im Spiel.
 * Kleiner und schneller als normale Hühner.
 * @class
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
  /**
   * Y-Position des kleinen Huhns.
   * @type {number}
   */
  y = 370;

  /**
   * Höhe des kleinen Huhns in Pixeln.
   * @type {number}
   */
  height = 60;

  /**
   * Breite des kleinen Huhns in Pixeln.
   * @type {number}
   */
  width = 60;

  /**
   * Offset-Werte für die Kollisionserkennung.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 15
  };

  /**
   * Bildpfade für die Laufanimation.
   * @type {string[]}
   */
  SMALL_CHICKEN_IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];

  /**
   * Bildpfade für die Todesanimation.
   * @type {string[]}
   */
  SMALL_CHICKEN_IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  /**
   * Erstellt ein neues kleines Huhn mit zufälliger Position und Geschwindigkeit.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.SMALL_CHICKEN_IMAGES_WALKING);
    this.loadImages(this.SMALL_CHICKEN_IMAGES_DEAD);
    this.x = 200 + Math.random() * 2500;
    this.speed = 0.15 + Math.random() * 0.7;
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
      if (!this.isKilled) this.playAnimation(this.SMALL_CHICKEN_IMAGES_WALKING);
    }, 200);
  }

  /**
   * Spielt die Todesanimation ab.
   */
  deadAnimation() {
    this.playAnimation(this.SMALL_CHICKEN_IMAGES_DEAD);
  }
}
