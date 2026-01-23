/**
 * Repräsentiert eine Flasche am Boden im Spiel.
 * Kann vom Charakter eingesammelt und geworfen werden.
 * @class
 * @extends MovableObject
 */
class Bottles extends MovableObject {
  /**
   * Höhe der Flasche in Pixeln.
   * @type {number}
   */
  height = 60;

  /**
   * Breite der Flasche in Pixeln.
   * @type {number}
   */
  width = 50;

  /**
   * Offset-Werte für die Kollisionserkennung.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 10,
    right: 8,
    bottom: 5,
    left: 20
  };

  /**
   * Bildpfade für die Flasche.
   * @type {string[]}
   */
  IMAGES_BOTTLES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  /**
   * Erstellt eine neue Flasche.
   * @param {number} x - Die X-Position der Flasche.
   */
  constructor(x) {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = x;
    this.y = 380;
  }
}
