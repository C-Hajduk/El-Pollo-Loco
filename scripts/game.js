let canvas;
let world;
let keyboard = new Keyboard();
let startScreen = document.getElementById('startScreen');
let gameOverScreen = document.getElementById('gameoverScreen');
let winScreen = document.getElementById('winScreen');
let impressum = document.getElementById('impressum');
let controls = document.getElementById('controls');
let controlsMobile = document.getElementById('controlsMobile');
let audioButton = document.getElementById('audio_button');
let rotatePhone = document.getElementById('rotatePhone');
let intervalIds = [];
let soundHub;
let gameReady = false;

function init() {
  soundHub = new SoundHub();
  soundHub.initButton();
}

function startGame() {
  gameReady = false;
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  keyboard.bindTouchButtons();
  startScreen.style.display = 'none';
  controlsMobile.classList.remove('d-none');
}

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

function gameOver() {
  SoundHub.runningAudio.pause();
  gameOverScreen.style.display = 'block';
  clearAllIntervals();
  canvas.style.display = 'none';
  audioButton.style.display = 'none';
  controlsMobile.classList.add('d-none');
}

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

function playerWon() {
  winScreen.style.display = 'block';
  clearAllIntervals();
  audioButton.style.display = 'none';
  canvas.style.display = 'none';
  SoundHub.pauseAll();
  controlsMobile.classList.add('d-none');
}

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

function setStoppableInterval(fn, ms) {
  let id = setInterval(fn, ms);
  intervalIds.push(id);
  return id;
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
