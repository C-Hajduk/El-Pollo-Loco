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
  endbossBar = new EndbossBar('healthEndboss', 0);
  throwableObjects = [];
  collectedCoins = 0;
  collectedBottles = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.healthBar.setPercentage(100);
    this.bottleBar.setPercentage(0);
    this.coinBar.setPercentage(0);
    this.endbossBar.setPercentage(100);
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 200);

    setInterval(() => {
      this.collisionsBottle();
    }, 50);

    setInterval(() => {
      this.checkThrowObjects();
    }, 150);

    setInterval(() => {
      this.updateEnemies();
    }, 300);
  }

  updateEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.update(this.character);
      }
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottlePercentage = (this.collectedBottles / 5) * 100;
      if (bottlePercentage >= 20) {
        let offsetX = this.character.otherDirection ? -100 : 100;
        let bottle = new ThrowableObject(
          this.character.x + offsetX,
          this.character.y + 100,
          this.character.otherDirection
        ); // Create new bottle
        this.throwableObjects.push(bottle); // Add bottle to array

        this.collectedBottles--;

        let newPercentage = (this.collectedBottles / 5) * 100;
        this.bottleBar.setPercentage(newPercentage);
      }
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      // Check for collision with enemies
      if (this.character.isColliding(enemy)) {
        // Check for collision with character
        this.character.hit(); // Character gets hit
        this.healthBar.setPercentage(this.character.energy); // Update health bar
        //console.log('Collision with Character, enemy', this.character.energy);
      }
    });
    // Check for collision with coins
    this.level.coins.forEach((coin, index) => {
      // index is needed to remove coin from array
      if (this.character.isColliding(coin)) {
        // Check for collision with character
        this.level.coins.splice(index, 1); // Remove coin from level
        this.pickCoins(); // Increase collected coins
      }
    });
    // Check for collision with bottle
    this.level.bottles.forEach((bottle, index) => {
      // index is needed to remove bottle from array
      if (this.character.isColliding(bottle)) {
        // Check for collision with character
        this.level.bottles.splice(index, 1); // Remove bottle from level
        this.pickBottles(); // Increase collected bottles
      }
    });
  }

  collisionsBottle() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
            enemy.energy -= 35;
            if (enemy.energy < 0) {
              enemy.energy = 0;
            }
            this.endbossBar.setPercentage(enemy.energy);
          }
          this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
          enemy.hurtAnimation();

          if (enemy.energy <= 0) {
            enemy.deadAnimation();
          }
        }
      });
    });
  }

  pickCoins() {
    // Increase collected coins
    this.collectedCoins++; // Increase collected coins
    let maxCoins = 5; // Total number of coins in level
    let percentage = (this.collectedCoins / maxCoins) * 100; // Calculate percentage
    this.coinBar.setPercentage(percentage); // Update coin bar
  }

  pickBottles() {
    this.collectedBottles++;
    let maxBottles = 5;
    let percentage = (this.collectedBottles / maxBottles) * 100;
    this.bottleBar.setPercentage(percentage); // Update bottle bar
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
    this.addToMap(this.endbossBar);

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
    // mo.drawFrame(this.ctx);

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
