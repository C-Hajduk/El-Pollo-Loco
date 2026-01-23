/**
 * Statusleiste für die Anzeige von Gesundheit, Flaschen oder Münzen.
 * Zeigt verschiedene Bilder basierend auf dem aktuellen Prozentwert.
 * @class
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /**
   * Bildpfade für die Gesundheitsanzeige.
   * @type {string[]}
   */
  IMAGES_HEALTH = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
  ];

  /**
   * Bildpfade für die Flaschenanzeige.
   * @type {string[]}
   */
  IMAGES_BOTTLE = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
  ];

  /**
   * Bildpfade für die Münzenanzeige.
   * @type {string[]}
   */
  IMAGES_COIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
  ];

  /**
   * Aktueller Prozentwert der Statusleiste.
   * @type {number}
   */
  percentage;

  /**
   * Erstellt eine neue Statusleiste.
   * @param {string} type - Der Typ der Statusleiste ('health', 'bottle', 'coin').
   * @param {number} positionY - Die Y-Position der Statusleiste.
   */
  constructor(type, positionY) {
    super();

    if (type === 'health') {
      this.IMAGES = this.IMAGES_HEALTH;
    } else if (type === 'bottle') {
      this.IMAGES = this.IMAGES_BOTTLE;
    } else if (type === 'coin') {
      this.IMAGES = this.IMAGES_COIN;
    }

    this.loadImages(this.IMAGES);
    this.x = 30;
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
    } else if (this.percentage >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
