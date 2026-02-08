// INTRO COUNTDOWN
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

// FIRST SURPRISE
function revealSurprise() {
  document.getElementById("loading").style.display = "none";

  const main = document.getElementById("main");
  main.classList.remove("hidden");
  setTimeout(() => main.classList.add("show"), 100);

  spawnBats();
  fadeInMusic();
}

// SECOND SURPRISE (GAME)
function showCheesySurprise() {
  document.getElementById("gameContainer").classList.remove("hidden");
}

// BATS ANIMATION
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

// MUSIC FADE IN
function fadeInMusic() {
  const music = document.getElementById("bgm");
  music.volume = 0;
  music.play();

  let v = 0;
  let fade = setInterval(() => {
    if (v < 0.4) {
      v += 0.01;
      music.volume = v;
    } else clearInterval(fade);
  }, 150);
}

// GAME LOGIC
let score = 0;
let gameInterval;
let timerInterval;
let timeLeft = 20;

function startGame() {
  score = 0;
  timeLeft = 20;

  document.getElementById("score").innerText = score;
  document.getElementById("gameTimer").innerText = timeLeft;

  clearInterval(gameInterval);
  clearInterval(timerInterval);

  gameInterval = setInterval(dropCheese, 800);

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("gameTimer").innerText = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  alert("Game Over! You collected " + score + " cheese 🧀");
}

// DROP CHEESE
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

    if (score === 10) unlockSecret();
  };

  gameArea.appendChild(cheese);
  setTimeout(() => cheese.remove(), 4000);
}

// SECRET UNLOCK
function unlockSecret() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  const secret = document.getElementById("secret");
  secret.classList.add("show-secret");

  // CONFETTI PARTY POPPER 🎉
  confetti({ particleCount: 250, spread: 140, origin: { y: 0.6 } });
  setTimeout(() => {
    confetti({ particleCount: 180, spread: 160, origin: { y: 0.3 } });
  }, 700);
}

function showCertificate() {
  confetti({ particleCount: 300, spread: 160 });
  
  setTimeout(() => {
    const link = document.createElement("a");
    link.href = "certificate.png";
    link.download = "Mozarella_Master_Certificate.png";
    link.click();
  }, 2000);
}

// CLOSE SECRET
function closeSecret() {
  document.getElementById("secret").classList.remove("show-secret");
}
