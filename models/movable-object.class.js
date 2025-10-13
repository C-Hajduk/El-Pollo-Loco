class movableObject {
  x = 120;
  y = 270;
  img;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    // wenn ich Pfeiltaste nach rechts klicke, dann bewegt sich mein Character auf der x Achse weiter
  }

  moveLeft() {}
}
