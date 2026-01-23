/**
 * Das HTML Canvas Element für das Spiel.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Die Spielwelt-Instanz.
 * @type {World}
 */
let world;

/**
 * Das Keyboard-Objekt für Eingaben.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Das Startbildschirm-Element.
 * @type {HTMLElement}
 */
let startScreen = document.getElementById('startScreen');

/**
 * Das Game-Over-Bildschirm-Element.
 * @type {HTMLElement}
 */
let gameOverScreen = document.getElementById('gameoverScreen');

/**
 * Das Gewinn-Bildschirm-Element.
 * @type {HTMLElement}
 */
let winScreen = document.getElementById('winScreen');

/**
 * Das Impressum-Dialog-Element.
 * @type {HTMLElement}
 */
let impressum = document.getElementById('impressum');

/**
 * Das Steuerungs-Info-Element.
 * @type {HTMLElement}
 */
let controls = document.getElementById('controls');

/**
 * Das Mobile-Steuerungs-Element.
 * @type {HTMLElement}
 */
let controlsMobile = document.getElementById('controlsMobile');

/**
 * Der Audio-Button.
 * @type {HTMLElement}
 */
let audioButton = document.getElementById('audio_button');

/**
 * Das Element für Handy-Drehen-Hinweis.
 * @type {HTMLElement}
 */
let rotatePhone = document.getElementById('rotatePhone');

/**
 * Array aller Intervall-IDs für Cleanup.
 * @type {number[]}
 */
let intervalIds = [];

/**
 * Die SoundHub-Instanz.
 * @type {SoundHub}
 */
let soundHub;

/**
 * Gibt an, ob das Spiel bereit zum Spielen ist.
 * @type {boolean}
 */
let gameReady = false;

/**
 * Initialisiert das Spiel.
 * Erstellt den SoundHub und initialisiert den Audio-Button.
 */
function init() {
  soundHub = new SoundHub();
  soundHub.initButton();
}

/**
 * Startet das Spiel.
 * Erstellt die Spielwelt und versteckt den Startbildschirm.
 */
function startGame() {
  gameReady = false;
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  keyboard.bindTouchButtons();
  startScreen.style.display = 'none';
  controlsMobile.classList.remove('d-none');
}

/**
 * Kehrt zum Startbildschirm zurück.
 * Pausiert Audio und zeigt Startbildschirm an.
 */
function backToStartScreen() {
  soundHub.isPlaying = false;
  soundHub.updateButton();
  soundHub.saveMute();
  startScreen.style.display = 'block';
  gameOverScreen.style.display = 'none';
  winScreen.style.display = 'none';
  canvas.style.display = 'block';
  audioButton.style.display = 'block';
  controlsMobile.classList.add('d-none');
}

/**
 * Zeigt den Game-Over-Bildschirm an.
 * Stoppt alle Intervalle und versteckt das Canvas.
 */
function gameOver() {
  SoundHub.runningAudio.pause();
  gameOverScreen.style.display = 'block';
  clearAllIntervals();
  canvas.style.display = 'none';
  audioButton.style.display = 'none';
  controlsMobile.classList.add('d-none');
}

/**
 * Startet das Spiel neu.
 * Setzt alle Intervalle zurück und erstellt neue Spielwelt.
 */
function restartGame() {
  gameOverScreen.style.display = 'none';
  winScreen.style.display = 'none';
  clearAllIntervals();
  intervalIds = [];
  startGame();
  canvas.style.display = 'block';
  audioButton.style.display = 'block';
  SoundHub.playOne(SoundHub.backgroundAudio);
}

/**
 * Zeigt den Gewinn-Bildschirm an.
 * Stoppt alle Intervalle und pausiert Audio.
 */
function playerWon() {
  winScreen.style.display = 'block';
  clearAllIntervals();
  audioButton.style.display = 'none';
  canvas.style.display = 'none';
  SoundHub.pauseAll();
  controlsMobile.classList.add('d-none');
}

/**
 * Schaltet die Audio-Wiedergabe um.
 * Startet oder stoppt die Hintergrundmusik.
 */
function toggleAudio() {
  soundHub.toggleAudio();

  if (soundHub.isPlaying) {
    SoundHub.backgroundAudio.loop = true;
    SoundHub.backgroundAudio.volume = 0.2;
    SoundHub.backgroundAudio.play().catch((error) => {
      console.log('Background audio playback was prevented:', error);
    });
  } else {
    SoundHub.pauseAll();
  }
}

/**
 * Erstellt ein stoppbares Intervall.
 * Speichert die ID für späteren Cleanup.
 * @param {Function} fn - Die auszuführende Funktion.
 * @param {number} ms - Das Intervall in Millisekunden.
 * @returns {number} Die Intervall-ID.
 */
function setStoppableInterval(fn, ms) {
  let id = setInterval(fn, ms);
  intervalIds.push(id);
  return id;
}

/**
 * Stoppt alle gespeicherten Intervalle.
 */
function clearAllIntervals() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}

/**
 * Öffnet das Impressum-Dialog.
 */
function showImpressum() {
  impressum.showModal();
}

/**
 * Schließt das Impressum-Dialog.
 */
function closeImpressum() {
  impressum.close();
}
