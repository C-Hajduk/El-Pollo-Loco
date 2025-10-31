class ThrowableObject extends MovableObject {
  offset = {
    top: 5,
    right: 0,
    bottom: 10,
    left: 0
  };

  IMAGES_BOTTLES_ROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  constructor(x, y, otherDirection) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_BOTTLES_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.otherDirection = otherDirection;
    this.trow();
    this.animate();
  }

  trow() {
    this.speedY = 20;
    this.applyGravity();
    setStoppableInterval(() => {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 20);
  }

  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES_ROTATION);
    }, 100);
  }
}
