/**
 * Repräsentiert ein Hintergrundobjekt im Spiel.
 * Wird für Parallax-Scrolling-Effekte verwendet.
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /**
   * Breite des Hintergrundobjekts in Pixeln.
   * @type {number}
   */
  width = 720;

  /**
   * Höhe des Hintergrundobjekts in Pixeln.
   * @type {number}
   */
  height = 480;

  /**
   * Erstellt ein neues Hintergrundobjekt.
   * @param {string} imagePath - Der Pfad zum Hintergrundbild.
   * @param {number} x - Die X-Position des Objekts.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
