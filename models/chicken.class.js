class Chicken extends MovableObject {
  y = 330;
  height = 100;
  energy = 0;

  offset = {
    top: 5,
    right: 0,
    bottom: 10,
    left: 0
  };

  NORMAL_CHICKEN_IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];
  NORMAL_CHICKEN_IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.NORMAL_CHICKEN_IMAGES_WALKING);
    this.loadImages(this.NORMAL_CHICKEN_IMAGES_DEAD);

    this.x = 600 + Math.random() * 2500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setStoppableInterval(() => this.moveLeft(), 1000 / 60);

    setStoppableInterval(
      () => this.playAnimation(this.NORMAL_CHICKEN_IMAGES_WALKING),
      200
    );
  }

  deadAnimation() {
    return this.playAnimation(this.NORMAL_CHICKEN_IMAGES_DEAD);
  }
}
