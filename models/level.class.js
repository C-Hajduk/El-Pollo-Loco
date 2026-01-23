/**
 * Repräsentiert ein Spiellevel mit allen enthaltenen Objekten.
 * @class
 */
class Level {
  /**
   * Array aller Gegner im Level.
   * @type {(Chicken|SmallChicken|Endboss)[]}
   */
  enemies;

  /**
   * Array aller Wolken im Level.
   * @type {Cloud[]}
   */
  clouds;

  /**
   * Array aller Münzen im Level.
   * @type {Coins[]}
   */
  coins;

  /**
   * Array aller Flaschen im Level.
   * @type {Bottles[]}
   */
  bottles;

  /**
   * Array aller Hintergrundobjekte im Level.
   * @type {BackgroundObject[]}
   */
  backgroundObjects;

  /**
   * X-Position des Level-Endes.
   * @type {number}
   */
  level_end_x = 2200;

  /**
   * Erstellt ein neues Level.
   * @param {(Chicken|SmallChicken|Endboss)[]} enemies - Die Gegner im Level.
   * @param {Cloud[]} clouds - Die Wolken im Level.
   * @param {Coins[]} coins - Die Münzen im Level.
   * @param {Bottles[]} bottles - Die Flaschen im Level.
   * @param {BackgroundObject[]} backgroundObjects - Die Hintergrundobjekte.
   */
  constructor(enemies, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}
