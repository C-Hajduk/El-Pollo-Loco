class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  hurtDuration = 1;

  applyGravity() {
    setStoppableInterval(() => {
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
      return this.y < 180 || this.speedY > 0;
    }
  }

  isColliding(mo) {
    // mo = movable object
    return (
      this.x + this.offset.left + this.width - this.offset.right - this.offset.left >
        mo.x + mo.offset.left && // Right side of this object is past left side of other object
      this.y + this.offset.top + this.height - this.offset.top - this.offset.bottom >
        mo.y + mo.offset.top && // Bottom of this object is below top of other object
      this.x + this.offset.left <
        mo.x + mo.offset.left + mo.width - mo.offset.left - mo.offset.right && // Left side of this object is before right side of other object
      this.y + this.offset.top <
        mo.y + mo.offset.top + mo.height - mo.offset.top - mo.offset.bottom // Top of this object is above bottom of other object
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
    return timepassed < this.hurtDuration;
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
