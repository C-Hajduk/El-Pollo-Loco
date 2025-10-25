class Bottles extends MovableObject {
  height = 60;
  width = 50;

  offset = {
    top: 10,
    right: 8,
    bottom: 5,
    left: 20
  };

  IMAGES_BOTTLES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  constructor(x) {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = x;
    this.y = 380;
  }
}
