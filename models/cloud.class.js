/**
 * Repräsentiert eine Wolke im Spiel.
 * Bewegt sich automatisch nach links für Parallax-Effekt.
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /**
   * X-Position der Wolke.
   * @type {number}
   */
  x = 0;

  /**
   * Y-Position der Wolke.
   * @type {number}
   */
  y = 20;

  /**
   * Breite der Wolke in Pixeln.
   * @type {number}
   */
  width = 500;

  /**
   * Höhe der Wolke in Pixeln.
   * @type {number}
   */
  height = 250;

  /**
   * Erstellt eine neue Wolke mit zufälliger Position.
   */
  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');

    this.x = Math.random() * 2500;
    this.animate();
  }

  /**
   * Startet die Bewegungsanimation der Wolke.
   */
  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
