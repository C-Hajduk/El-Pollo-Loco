class Cloud extends movableObject {
  x = 0;
  y = 20;
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png", "img/5_background/layers/4_clouds/2.png");

    this.x = Math.random() * 2500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
