class Endboss extends MovableObject {
  height = 450;
  width = 300;
  y = 0;
  speed = 50;

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];
  IMAGES_WALK = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];
  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png'
  ];
  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];
  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
  ];

  constructor() {
    super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.isActive = false;
    this.isWalking = false;
    this.x = 2500;
  }

  update(character) {
    // spieler erreicht Boss-Zone
    if (character.x >= 2000 && !this.isActive) {
      this.startAnimation();
    }
    // wenn Boss läuft
    if (this.isWalking) {
      this.moveLeft();
      this.playAnimation(this.IMAGES_WALK);
    }
    // wenn boss auf character trifft
    if (this.isColliding(character)) {
      this.attackAnimation(character);
    }
  }

  startAnimation() {
    this.isActive = true;

    let alertIntervall = setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 200);

    setTimeout(() => {
      clearInterval(alertIntervall);
      this.isWalking = true;
    }, 1000);
  }

  attackAnimation(character) {
    if (this.isColliding(character)) {
      let attackInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_ATTACK);
      }, 100);

      setTimeout(() => {
        clearInterval(attackInterval);
        this.isWalking = true;
      }, 1000);
    }
  }

  hurtAnimation(bottle) {
    if (this.isColliding(bottle)) {
      let hurtInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_HURT);
      }, 100);

      setTimeout(() => {
        clearInterval(hurtInterval);
        this.isWalking = true;
      }, 1000);
    }
  }
}

// TODO IMAGES HURT muss noch hinzugefuegt werden
// Wenn bottle is Colliding Endboss
// dann bleibt Endboss stehen und
// dann playAnimation Hurt
// dann wieder playanimation Alert
// dann wieder playanimation Walk
// intervall von 3 mal wenn bottle Endboss trifft
// dann playAnimation Dead

// TODO IMAGES DEAD muss noch hinzugefuegt werden
