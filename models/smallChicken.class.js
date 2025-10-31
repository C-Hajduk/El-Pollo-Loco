class SmallChicken extends MovableObject {
  y = 370;
  height = 60;
  width = 60;

  offset = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 15
  };

  SMALL_CHICKEN_IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];
  SMALL_CHICKEN_IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.SMALL_CHICKEN_IMAGES_WALKING);
    this.loadImages(this.SMALL_CHICKEN_IMAGES_DEAD);
    this.x = 200 + Math.random() * 2500;
    this.speed = 0.15 + Math.random() * 0.7;
    this.animate();
  }

  animate() {
    setStoppableInterval(() => this.moveLeft(), 1000 / 60);

    setStoppableInterval(
      () => this.playAnimation(this.SMALL_CHICKEN_IMAGES_WALKING),
      200
    );
  }

  deadAnimation() {
    this.playAnimation(this.SMALL_CHICKEN_IMAGES_DEAD);
  }
}
