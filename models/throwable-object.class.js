class ThrowableObject extends MovableObject {
  offset = {
    top: 5,
    right: 0,
    bottom: 10,
    left: 0
  };
  constructor(x, y, otherDirection) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.otherDirection = otherDirection;
    this.trow();
  }

  trow() {
    this.speedY = 25;
    this.applyGravity();
    setInterval(() => {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 20);
  }
}
