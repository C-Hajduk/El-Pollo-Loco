/**
 * Repräsentiert ein werfbares Objekt (Salsa-Flasche).
 * Kann vom Charakter geworfen werden und fällt mit Gravitation.
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
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
   * Bildpfade für die Rotationsanimation.
   * @type {string[]}
   */
  IMAGES_BOTTLES_ROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  /**
   * Erstellt ein neues werfbares Objekt.
   * @param {number} x - Die X-Startposition.
   * @param {number} y - Die Y-Startposition.
   * @param {boolean} otherDirection - Ob in die andere Richtung geworfen wird.
   */
  constructor(x, y, otherDirection) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_BOTTLES_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.otherDirection = otherDirection;
    this.trow();
    this.animate();
  }

  /**
   * Startet die Wurfbewegung mit Gravitation.
   */
  trow() {
    this.speedY = 20;
    this.applyGravity();
    setStoppableInterval(() => {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 20);
  }

  /**
   * Startet die Rotationsanimation.
   */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES_ROTATION);
    }, 100);
  }
}
