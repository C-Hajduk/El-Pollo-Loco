let canvas;
let world;
let keyboard = new Keyboard();
let startScreen = document.getElementById('startScreen');
let gameOverScreen = document.getElementById('gameoverScreen');
let winScreen = document.getElementById('winScreen');
let impressum = document.getElementById('impressum');
let controls = document.getElementById('controls');
let audioButton = document.getElementById('audio_button');
let rotatePhone = document.getElementById('rotatePhone');
let intervalIds = [];
let soundHub;

function init() {
  soundHub = new SoundHub();
  soundHub.initButton();
  controls.style.display = 'flex';
}

function startGame() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  startScreen.style.display = 'none';
  controls.style.display = 'none';
}

function backToStartScreen() {
  startScreen.style.display = 'block';
  gameOverScreen.style.display = 'none';
  winScreen.style.display = 'none';
  canvas.style.display = 'block';
  controls.style.display = 'flex';
  audioButton.style.display = 'block';
}

function gameOver() {
  gameOverScreen.style.display = 'block';
  clearAllIntervals();
  canvas.style.display = 'none';
  audioButton.style.display = 'none';
}

function restartGame() {
  gameOverScreen.style.display = 'none';
  winScreen.style.display = 'none';
  clearAllIntervals();
  intervalIds = [];
  startGame();
  canvas.style.display = 'block';
  audioButton.style.display = 'block';
}

function playerWon() {
  winScreen.style.display = 'block';
  clearAllIntervals();
  audioButton.style.display = 'none';
}

function toggleAudio() {
  soundHub.toggleAudio();

  if (soundHub.isPlaying) {
    SoundHub.backgroundAudio.loop = true;
    SoundHub.backgroundAudio.volume = 0.2;
    SoundHub.backgroundAudio.play();
  } else {
    SoundHub.pauseAll();
  }
}

function setStoppableInterval(fn, ms) {
  let id = setInterval(fn, ms);
  intervalIds.push(id);
}

function clearAllIntervals() {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
}

function showImpressum() {
  impressum.showModal();
}

function closeImpressum() {
  impressum.close();
}
