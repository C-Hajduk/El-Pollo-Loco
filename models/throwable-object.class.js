class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.trow();
  }

  trow() {
    // ist die bottlebar = 20%
    // dann wirf eine bottle mit der Taste D
    // dann soll die Flasche nach vorne geworfen werden
    // aktuallisiere die Flaschenanzeige

    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
