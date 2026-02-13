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

  // Play birthday music (user has clicked the button)
  birthdayBgm.volume = 0.3;
  birthdayBgm.currentTime = 0;
  birthdayBgm.play();
}

// ==================== SECOND SURPRISE (GAME) ====================
function showCheesySurprise() {
  document.getElementById("gameContainer").classList.remove("hidden");
}

// ==================== BATS ANIMATION ====================
function spawnBats() {
  const container = document.getElementById("bats");

  for (let i = 0; i < 10; i++) {
    let bat = document.createElement("div");
    bat.className = "bat";
    container.appendChild(bat);

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let sx = (Math.random() - 0.5) * 2;
    let sy = (Math.random() - 0.5) * 2;

    function move() {
      x += sx;
      y += sy;

      if (x < 0 || x > innerWidth) sx *= -1;
      if (y < 0 || y > innerHeight) sy *= -1;

      bat.style.left = x + "px";
      bat.style.top = y + "px";

      requestAnimationFrame(move);
    }

    move();
  }
}

// ==================== GAME LOGIC ====================
let score = 0;
let gameInterval;

// Start game & switch music to Batman theme
function startGame() {
  score = 0;
  document.getElementById("score").innerText = score;

  clearInterval(gameInterval);
  gameInterval = setInterval(dropCheese, 800);

  // Stop birthday music & start Batman theme
  birthdayBgm.pause();
  batmanBgm.currentTime = 0;
  batmanBgm.volume = 0.3;
  batmanBgm.play();
}

// ==================== DROP CHEESE ====================
function dropCheese() {
  const gameArea = document.getElementById("gameArea");

  const cheese = document.createElement("div");
  cheese.className = "cheese";
  cheese.innerText = "🧀";

  cheese.style.left = Math.random() * (gameArea.clientWidth - 30) + "px";

  cheese.onclick = () => {
    score++;
    document.getElementById("score").innerText = score;
    cheese.remove();

    // Adjust this number if you want easier/harder
    if (score >= 5) {
      unlockSecret();
    }
  };

  gameArea.appendChild(cheese);

  // Remove cheese if not clicked
  setTimeout(() => {
    cheese.remove();
  }, 4000);
}

// ==================== SECRET UNLOCK ====================
function unlockSecret() {
  clearInterval(gameInterval);

  // Stop Batman music & play Meow once
  batmanBgm.pause();
  meowSfx.currentTime = 0;
  meowSfx.play();

  const secret = document.getElementById("secret");
  secret.classList.add("show-secret");

  // Confetti
  confetti({ particleCount: 250, spread: 140, origin: { y: 0.6 } });
  setTimeout(() => {
    confetti({ particleCount: 180, spread: 160, origin: { y: 0.3 } });
  }, 700);
}

// ==================== CERTIFICATE DOWNLOAD ====================
function showCertificate() {
  confetti({ particleCount: 300, spread: 160 });

  setTimeout(() => {
    const link = document.createElement("a");
    link.href = "certificate.png";
    link.download = "Mozarella_Master_Certificate.png";
    link.click();
  }, 2000);
}

// ==================== CLOSE SECRET ====================
function closeSecret() {
  document.getElementById("secret").classList.remove("show-secret");
}
