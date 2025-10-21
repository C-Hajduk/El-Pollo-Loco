class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable object should always fall
      return true;
    } else {
      return this.y < 180;
    }
  }

  isColliding(mo) {
    // mo = movable object
    return (
      this.x + this.width > mo.x && // Right side of this object is past left side of other object
      this.y + this.height > mo.y && // Bottom of this object is below top of other object
      this.x < mo.x && // Left side of this object is before right side of other object
      this.y < mo.y + mo.height // Top of this object is above bottom of other object
    );
  }

  hit() {
    this.energy -= 5; // Reduce energy by 5 on hit
    if (this.energy < 0) {
      // Ensure energy doesn't go below 0
      this.energy = 0; // Set energy to 0 if it goes negative
    } else {
      // Only update lastHit if still alive
      this.lastHit = new Date().getTime(); // Record time of hit
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 25;
  }
}
