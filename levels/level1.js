function createLevel1() {
  return new Level(
    [
      new Endboss(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new Chicken(),
      new SmallChicken(),
      new Chicken(),
      new SmallChicken()
    ],
    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],
    [
      new Coins(600, 300),
      new Coins(700, 225),
      new Coins(800, 300),
      new Coins(1500, 200),
      new Coins(1600, 200),
      new Coins(1800, 300)
    ],
    [
      new Bottles(200),
      new Bottles(300),
      new Bottles(1000),
      new Bottles(1200),
      new Bottles(1700),
      new Bottles(2000)
    ],
    [
      new BackgroundObject('img/5_background/layers/air.png', -720),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

      new BackgroundObject('img/5_background/layers/air.png', 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

      new BackgroundObject('img/5_background/layers/air.png', 720),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

      new BackgroundObject('img/5_background/layers/air.png', 720 * 2),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2),

      new BackgroundObject('img/5_background/layers/air.png', 720 * 3),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3)
    ]
  );
}
