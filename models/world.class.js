class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new StatusBar('health', -10);
  bottleBar = new StatusBar('bottle', 40);
  coinBar = new StatusBar('coin', 90);
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 500);

    setInterval(() => {
      this.checkThrowObjects();
    }, 150);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      // Check for collision with enemies
      if (this.character.isColliding(enemy)) {
        // Check for collision with character
        this.character.hit(); // Character gets hit
        this.healthBar.setPercentage(this.character.energy); // Update health bar
        console.log('Collision with Character, enemy', this.character.energy);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjetcsToMap(this.level.backgroundObjects);
    this.addObjetcsToMap(this.level.clouds);
    this.addObjetcsToMap(this.level.enemies);
    this.addObjetcsToMap(this.level.bottles);
    this.addObjetcsToMap(this.throwableObjects);
    this.addObjetcsToMap(this.level.coins);
    this.addToMap(this.character);

    // ------------ Space for fixed Object ---------------
    this.ctx.translate(-this.camera_x, 0);

    // ---------- Statusbars (fixe Positionen) ----------
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);

    // Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjetcsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
