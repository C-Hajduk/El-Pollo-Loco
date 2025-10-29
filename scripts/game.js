let canvas;
let world;
let keyboard = new Keyboard();
let startScreen = document.getElementById('startScreen');
let gameOverScreen = document.getElementById('gameoverScreen');
let audioButton = document.getElementById('audio_button');
let intervalIds = [];

function init() {
  SoundHub = new SoundHub();
}

function startGame() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  startScreen.style.display = 'none';
  setStoppableInterval(fn, ms);
}

function backToStartScreen() {
  startScreen.style.display = 'block';
  gameOverScreen.style.display = 'none';
}

function gameOver() {
  gameOverScreen.style.display = 'block';
  clearAllIntervals();
}

function restartGame() {
  gameOverScreen.style.display = 'none';
  clearAllIntervals();
  intervalIds = [];
  startGame();
}

function toggleAudio() {
  SoundHub.toggleAudio();
}

function setStoppableInterval(fn, ms) {
  let id = setInterval(fn, ms);
  intervalIds.push(id);
}

function clearAllIntervals() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}
