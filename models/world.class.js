/**
 * Hauptklasse für die Spielwelt.
 * Verwaltet alle Spielobjekte, Kollisionen, Rendering und Spiellogik.
 * @class
 */
class World {
  /**
   * Der spielbare Hauptcharakter.
   * @type {Character}
   */
  character = new Character();

  /**
   * Das aktuelle Spiellevel.
   * @type {Level}
   */
  level = createLevel1();

  /**
   * Das HTML Canvas Element.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * Der 2D-Rendering-Kontext des Canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * Das Keyboard-Eingabeobjekt.
   * @type {Keyboard}
   */
  keyboard;

  /**
   * X-Offset der Kamera.
   * @type {number}
   */
  camera_x = 0;

  /**
   * Statusleiste für Gesundheit.
   * @type {StatusBar}
   */
  healthBar = new StatusBar('health', -10);

  /**
   * Statusleiste für Flaschen.
   * @type {StatusBar}
   */
  bottleBar = new StatusBar('bottle', 40);

  /**
   * Statusleiste für Münzen.
   * @type {StatusBar}
   */
  coinBar = new StatusBar('coin', 90);

  /**
   * Statusleiste für den Endboss.
   * @type {EndbossBar}
   */
  endbossBar = new EndbossBar('healthEndboss', 20);

  /**
   * Array aller geworfenen Objekte.
   * @type {ThrowableObject[]}
   */
  throwableObjects = [];

  /**
   * Anzahl gesammelter Münzen.
   * @type {number}
   */
  collectedCoins = 0;

  /**
   * Anzahl gesammelter Flaschen.
   * @type {number}
   */
  collectedBottles = 0;

  /**
   * Erstellt eine neue Spielwelt.
   * @param {HTMLCanvasElement} canvas - Das Canvas-Element für das Rendering.
   * @param {Keyboard} keyboard - Das Keyboard-Objekt für Eingaben.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.healthBar.setPercentage(100);
    this.bottleBar.setPercentage(0);
    this.coinBar.setPercentage(0);
    this.endbossBar.setPercentage(100);

    // Warte 1000ms bis alles gezeichnet ist, dann starte das Spiel
    setTimeout(() => {
      gameReady = true;
    }, 1000);

    this.run();
  }

  /**
   * Verbindet den Charakter mit der Welt.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Startet alle Spielintervalle für Updates.
   */
  run() {
    setStoppableInterval(() => this.checkCollisions(), 1000 / 60);
    setStoppableInterval(() => this.collisionsBottle(), 50);
    setStoppableInterval(() => this.checkThrowObjects(), 150);
    setStoppableInterval(() => this.updateEnemies(), 300);
  }

  /**
   * Aktualisiert alle Gegner.
   */
  updateEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.update(this.character, this);
      }
    });
  }

  /**
   * Prüft ob der Spieler wirft und erstellt neue Wurfojekte.
   */
  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottlePercentage = (this.collectedBottles / 5) * 100;
      if (bottlePercentage >= 20) {
        let offsetX = this.character.otherDirection ? -100 : 100;
        let bottle = new ThrowableObject(
          this.character.x + offsetX,
          this.character.y + 100,
          this.character.otherDirection
        );
        this.throwableObjects.push(bottle);
        this.collectedBottles--;
        let newPercentage = (this.collectedBottles / 5) * 100;
        this.bottleBar.setPercentage(newPercentage);
      }
    }
  }

  /**
   * Prüft alle Kollisionen im Spiel.
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
  }

  /**
   * Prüft Kollisionen zwischen Charakter und Gegnern.
   */
  checkEnemyCollisions() {
    let hitDetected = false;
    this.level.enemies.forEach((enemy, index) => {
      if (enemy.isKilled || !this.character.isColliding(enemy)) return;
      if (this.character.speedY < 0 && this.character.isAboveGround() && !(enemy instanceof Endboss)) {
        this.handleEnemyStomp(enemy, index);
      } else {
        hitDetected = true;
      }
    });
    if (hitDetected) this.handleCharacterHit();
  }

  /**
   * Verarbeitet das Zertreten eines Gegners.
   * @param {MovableObject} enemy - Der getretene Gegner.
   * @param {number} index - Der Index des Gegners im Array.
   */
  handleEnemyStomp(enemy, index) {
    enemy.isKilled = true;
    enemy.deadAnimation();
    SoundHub.playOne(SoundHub.deadChickenAudio);
    this.character.speedY = 15;
    setTimeout(() => {
      this.level.enemies.splice(index, 1);
    }, 200);
  }

  /**
   * Verarbeitet einen Treffer auf den Charakter.
   */
  handleCharacterHit() {
    if (this.character.isHurt()) return;
    this.character.hit();
    SoundHub.playOne(SoundHub.hitCharacterAudio);
    this.healthBar.setPercentage(this.character.energy);
  }

  /**
   * Prüft Kollisionen mit Münzen.
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (!this.character.isColliding(coin)) return;
      this.level.coins.splice(index, 1);
      this.pickCoins();
      SoundHub.playOne(SoundHub.coinCollectedAudio);
    });
  }

  /**
   * Prüft Kollisionen mit am Boden liegenden Flaschen.
   */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (!this.character.isColliding(bottle)) return;
      this.level.bottles.splice(index, 1);
      this.pickBottles();
      SoundHub.playOne(SoundHub.bottleCollectedAudio);
    });
  }

  /**
   * Prüft Kollisionen zwischen geworfenen Flaschen und Gegnern.
   */
  collisionsBottle() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.handleBottleHit(bottle, enemy);
        }
      });
    });
  }

  /**
   * Verarbeitet einen Flaschen-Treffer auf einen Gegner.
   * @param {ThrowableObject} bottle - Die Flasche die trifft.
   * @param {MovableObject} enemy - Der getroffene Gegner.
   */
  handleBottleHit(bottle, enemy) {
    this.removeBottle(bottle);
    this.triggerHurtAnimation(enemy);
    if (enemy instanceof Endboss) {
      this.damageEndboss(enemy);
    } else {
      this.killChicken(enemy);
    }
  }

  /**
   * Entfernt eine Flasche aus dem Spiel.
   * @param {ThrowableObject} bottle - Die zu entfernende Flasche.
   */
  removeBottle(bottle) {
    let index = this.throwableObjects.indexOf(bottle);
    if (index > -1) this.throwableObjects.splice(index, 1);
  }

  /**
   * Löst die Verletzungsanimation eines Gegners aus.
   * @param {MovableObject} enemy - Der verletzte Gegner.
   */
  triggerHurtAnimation(enemy) {
    if (typeof enemy.hurtAnimation === 'function') {
      enemy.hurtAnimation();
    }
  }

  /**
   * Beschädigt den Endboss.
   * @param {Endboss} enemy - Der Endboss.
   */
  damageEndboss(enemy) {
    enemy.energy = Math.max(enemy.energy - 35, 0);
    this.endbossBar.setPercentage(enemy.energy);
    if (enemy.isDead()) {
      enemy.deadAnimation();
    }
  }

  /**
   * Tötet ein normales Huhn.
   * @param {Chicken|SmallChicken} enemy - Das zu tötende Huhn.
   */
  killChicken(enemy) {
    enemy.isKilled = true;
    enemy.deadAnimation();
    SoundHub.playOne(SoundHub.deadChickenAudio);
    setTimeout(() => {
      let currentIdx = this.level.enemies.indexOf(enemy);
      if (currentIdx > -1) {
        this.level.enemies.splice(currentIdx, 1);
      }
    }, 200);
  }

  /**
   * Erhöht die Anzahl gesammelter Münzen und aktualisiert die Anzeige.
   */
  pickCoins() {
    this.collectedCoins++;
    let maxCoins = 5;
    let percentage = (this.collectedCoins / maxCoins) * 100;
    this.coinBar.setPercentage(percentage);
  }

  /**
   * Erhöht die Anzahl gesammelter Flaschen und aktualisiert die Anzeige.
   */
  pickBottles() {
    this.collectedBottles++;
    let maxBottles = 5;
    let percentage = (this.collectedBottles / maxBottles) * 100;
    this.bottleBar.setPercentage(percentage);
  }

  /**
   * Hauptzeichenfunktion - rendert das komplette Spiel.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjetcs();
    this.ctx.translate(-this.camera_x, 0);
    this.addStatusBarsToMap();
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Fügt alle Spielobjekte zur Zeichenfläche hinzu.
   */
  addObjetcs() {
    this.addObjetcsToMap(this.level.backgroundObjects);
    this.addObjetcsToMap(this.level.clouds);
    this.addObjetcsToMap(this.level.enemies);
    this.addObjetcsToMap(this.level.bottles);
    this.addObjetcsToMap(this.throwableObjects);
    this.addObjetcsToMap(this.level.coins);
  }

  /**
   * Fügt die Statusleisten zur Zeichenfläche hinzu.
   */
  addStatusBarsToMap() {
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    if (this.endbossBar.visible) {
      this.addToMap(this.endbossBar);
    }
  }

  /**
   * Fügt ein Array von Objekten zur Zeichenfläche hinzu.
   * @param {DrawableObject[]} objects - Die zu zeichnenden Objekte.
   */
  addObjetcsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Fügt ein einzelnes Objekt zur Zeichenfläche hinzu.
   * Berücksichtigt die Blickrichtung des Objekts.
   * @param {DrawableObject} mo - Das zu zeichnende Objekt.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Spiegelt ein Bild horizontal.
   * @param {DrawableObject} mo - Das zu spiegelnde Objekt.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Stellt das Bild nach dem Spiegeln wieder her.
   * @param {DrawableObject} mo - Das wiederherzustellende Objekt.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
