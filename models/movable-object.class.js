/**
 * Erweiterung von DrawableObject für bewegliche Spielobjekte.
 * Fügt Physik, Bewegung und Kollisionserkennung hinzu.
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /**
   * Bewegungsgeschwindigkeit des Objekts.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Gibt an, ob das Objekt in die andere Richtung schaut.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * Vertikale Geschwindigkeit (für Sprung/Gravitation).
   * @type {number}
   */
  speedY = 0;

  /**
   * Gravitationsbeschleunigung.
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * Aktuelle Energie/Lebenspunkte des Objekts.
   * @type {number}
   */
  energy = 100;

  /**
   * Zeitpunkt des letzten Treffers in Millisekunden.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Dauer der Verletzungsanimation in Sekunden.
   * @type {number}
   */
  hurtDuration = 1;

  /**
   * Wendet Gravitation auf das Objekt an.
   * Lässt das Objekt fallen, wenn es sich über dem Boden befindet.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Prüft, ob das Objekt sich über dem Boden befindet.
   * @returns {boolean} True wenn das Objekt über dem Boden ist.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Werfbare Objekte fallen immer
      return true;
    } else {
      return this.y < 180 || this.speedY > 0;
    }
  }

  /**
   * Prüft, ob dieses Objekt mit einem anderen Objekt kollidiert.
   * Verwendet Offset-Werte für präzise Kollisionserkennung.
   * @param {MovableObject} mo - Das andere bewegliche Objekt.
   * @returns {boolean} True wenn eine Kollision vorliegt.
   */
  isColliding(mo) {
    return (
      this.x + this.offset.left + this.width - this.offset.right - this.offset.left >
        mo.x + mo.offset.left && // Rechte Seite dieses Objekts ist hinter linker Seite des anderen
      this.y + this.offset.top + this.height - this.offset.top - this.offset.bottom >
        mo.y + mo.offset.top && // Unterseite dieses Objekts ist unter Oberseite des anderen
      this.x + this.offset.left <
        mo.x + mo.offset.left + mo.width - mo.offset.left - mo.offset.right && // Linke Seite dieses Objekts ist vor rechter Seite des anderen
      this.y + this.offset.top <
        mo.y + mo.offset.top + mo.height - mo.offset.top - mo.offset.bottom // Oberseite dieses Objekts ist über Unterseite des anderen
    );
  }

  /**
   * Verarbeitet einen Treffer auf das Objekt.
   * Reduziert die Energie um 5 Punkte.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Prüft, ob das Objekt gerade verletzt ist.
   * @returns {boolean} True wenn die Verletzungszeit noch nicht abgelaufen ist.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < this.hurtDuration;
  }

  /**
   * Prüft, ob das Objekt tot ist.
   * @returns {boolean} True wenn die Energie 0 ist.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Spielt eine Animation aus einer Bildsequenz ab.
   * @param {string[]} images - Array mit Bildpfaden für die Animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Bewegt das Objekt nach rechts.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Bewegt das Objekt nach links.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Lässt das Objekt springen.
   */
  jump() {
    this.speedY = 25;
  }
}
