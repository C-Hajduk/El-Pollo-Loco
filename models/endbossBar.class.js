/**
 * Statusleiste für die Gesundheitsanzeige des Endbosses.
 * Wird erst sichtbar, wenn der Spieler die Boss-Zone erreicht.
 * @class
 * @extends DrawableObject
 */
class EndbossBar extends DrawableObject {
  /**
   * Gibt an, ob die Statusleiste sichtbar ist.
   * @type {boolean}
   */
  visible = false;

  /**
   * Bildpfade für die Endboss-Gesundheitsanzeige.
   * @type {string[]}
   */
  IMAGES_HEALTH = [
    'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
  ];

  /**
   * Aktueller Prozentwert der Statusleiste.
   * @type {number}
   */
  percentage;

  /**
   * Erstellt eine neue Endboss-Statusleiste.
   * @param {string} type - Der Typ der Statusleiste ('healthEndboss').
   * @param {number} positionY - Die Y-Position der Statusleiste.
   */
  constructor(type, positionY) {
    super();

    if (type === 'healthEndboss') {
      this.IMAGES = this.IMAGES_HEALTH;
    }

    this.loadImages(this.IMAGES);
    this.x = 400;
    this.y = positionY;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Setzt den Prozentwert und aktualisiert das angezeigte Bild.
   * @param {number} percentage - Der neue Prozentwert (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Ermittelt den Bildindex basierend auf dem aktuellen Prozentwert.
   * @returns {number} Der Index des anzuzeigenden Bildes (0-5).
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
