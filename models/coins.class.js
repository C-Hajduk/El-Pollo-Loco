/**
 * Repräsentiert eine Münze im Spiel.
 * Kann vom Charakter eingesammelt werden.
 * @class
 * @extends MovableObject
 */
class Coins extends MovableObject {
  /**
   * Höhe der Münze in Pixeln.
   * @type {number}
   */
  height = 100;

  /**
   * Breite der Münze in Pixeln.
   * @type {number}
   */
  width = 100;

  /**
   * Offset-Werte für die Kollisionserkennung.
   * @type {{top: number, right: number, bottom: number, left: number}}
   */
  offset = {
    top: 35,
    right: 35,
    bottom: 35,
    left: 35
  };

  /**
   * Bildpfade für die Münze.
   * @type {string[]}
   */
  IMAGES_COINS = ['img/8_coin/coin_1.png'];

  /**
   * Erstellt eine neue Münze.
   * @param {number} x - Die X-Position der Münze.
   * @param {number} y - Die Y-Position der Münze.
   */
  constructor(x, y) {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
  }
}
