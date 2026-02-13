// ==================== AUDIO ====================
const birthdayBgm = document.getElementById("birthdayBgm");
const batmanBgm = document.getElementById("batmanBgm");
const meowSfx = document.getElementById("meowSfx");

// ==================== INTRO COUNTDOWN ====================
let time = 5;
let timerEl = document.getElementById("intro-timer");
let revealBtn = document.getElementById("revealBtn");

let timer = setInterval(() => {
  time--;
  timerEl.innerText = time;

  if (time <= 0) {
    clearInterval(timer);
    revealBtn.classList.remove("hidden");
  }
}, 1000);

// ==================== FIRST SURPRISE ====================
function revealSurprise() {
  document.getElementById("loading").style.display = "none";

  const main = document.getElementById("main");
  main.classList.remove("hidden");
  setTimeout(() => main.classList.add("show"), 100);

  spawnBats();

  // Play birthday music (allowed because user clicked)
  birthdayBgm.currentTime = 0;
  birthdayBgm.volume = 0.3;
  birthdayBgm.play();
}

// ==================== SECOND SURPRISE ====================
function show
