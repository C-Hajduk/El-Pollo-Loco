/**
 * Basisklasse für alle zeichenbaren Objekte im Spiel.
 * Stellt grundlegende Eigenschaften und Methoden zum Laden und Zeichnen von Bildern bereit.
 * @class
 */
class DrawableObject {
  /**
   * X-Position des Objekts auf dem Canvas.
   * @type {number}
   */
  x = 120;

  /**
   * Y-Position des Objekts auf dem Canvas.
   * @type {number}
   */
  y = 270;

  /**
   * Höhe des Objekts in Pixeln.
   * @type {number}
   */
  height = 150;

  /**
   * Breite des Objekts in Pixeln.
   * @type {number}
   */
  width = 100;

  /**
   * Das aktuell angezeigte Bild.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Cache für alle geladenen Bilder.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * Index des aktuellen Animationsbilds.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Lädt ein einzelnes Bild für das Objekt.
   * @param {string} path - Der Pfad zum Bild.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Zeichnet das Objekt auf dem Canvas.
   * @param {CanvasRenderingContext2D} ctx - Der 2D-Rendering-Kontext des Canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Lädt mehrere Bilder und speichert sie im Cache.
   * @param {string[]} arr - Array mit Bildpfaden.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
