class Coins extends MovableObject {
  height = 100;
  width = 100;

  offset = {
    top: 35,
    right: 35,
    bottom: 35,
    left: 35
  };

  IMAGES_COINS = ['img/8_coin/coin_1.png'];

  constructor(x, y) {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
  }
}
