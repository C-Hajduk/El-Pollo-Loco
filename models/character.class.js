class Character extends movableObject {
  y = 180;
  height = 250;
  width = 125;
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {}
}
