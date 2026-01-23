/**
 * Verwaltet Tastatureingaben und Touch-Steuerung.
 * Erfasst welche Tasten/Buttons gerade gedrückt werden.
 * @class
 */
class Keyboard {
  /**
   * Gibt an, ob die Rechts-Taste gedrückt ist.
   * @type {boolean}
   */
  RIGHT = false;

  /**
   * Gibt an, ob die Links-Taste gedrückt ist.
   * @type {boolean}
   */
  LEFT = false;

  /**
   * Gibt an, ob die Hoch-Taste gedrückt ist.
   * @type {boolean}
   */
  UP = false;

  /**
   * Gibt an, ob die Runter-Taste gedrückt ist.
   * @type {boolean}
   */
  DOWN = false;

  /**
   * Gibt an, ob die Leertaste gedrückt ist.
   * @type {boolean}
   */
  SPACE = false;

  /**
   * Gibt an, ob die D-Taste gedrückt ist.
   * @type {boolean}
   */
  D = false;

  /**
   * Erstellt ein neues Keyboard-Objekt und bindet die Event-Listener.
   */
  constructor() {
    this.bindKeyboardEvents();
  }

  /**
   * Bindet die Tastatur-Event-Listener für keydown und keyup.
   */
  bindKeyboardEvents() {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = true;
      }
      if (event.keyCode == 37) {
        keyboard.LEFT = true;
      }
      if (event.keyCode == 38) {
        keyboard.UP = true;
      }
      if (event.keyCode == 40) {
        keyboard.DOWN = true;
      }
      if (event.keyCode == 32) {
        keyboard.SPACE = true;
      }
      if (event.keyCode == 68) {
        keyboard.D = true;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = false;
      }
      if (event.keyCode == 37) {
        keyboard.LEFT = false;
      }
      if (event.keyCode == 38) {
        keyboard.UP = false;
      }
      if (event.keyCode == 40) {
        keyboard.DOWN = false;
      }
      if (event.keyCode == 32) {
        keyboard.SPACE = false;
      }
      if (event.keyCode == 68) {
        keyboard.D = false;
      }
    });
  }

  /**
   * Bindet die Touch-Event-Listener für mobile Steuerung.
   */
  bindTouchButtons() {
    let btnLeft = document.getElementById('moveLeft');
    let btnRight = document.getElementById('moveRight');
    let btnJump = document.getElementById('jump');
    let btnThrow = document.getElementById('throw');

    btnLeft.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.LEFT = true;
    });
    btnLeft.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.LEFT = false;
    });
    btnRight.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });
    btnRight.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });
    btnJump.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
    btnJump.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.SPACE = false;
    });
    btnThrow.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.D = true;
    });
    btnThrow.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.D = false;
    });
  }
}
