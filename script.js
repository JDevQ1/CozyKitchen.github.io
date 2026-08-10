// ================= COOKIE =================

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 86400000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

function saveGame() {
  setCookie("score", score, 7);
  setCookie("timeLeft", timeLeft, 7);
}

function loadGame() {
  const s = getCookie("score");
  const t = getCookie("timeLeft");

  if (s) score = parseInt(s);
  if (t) timeLeft = parseInt(t);
}

function resetGame() {
  score = 0;
  timeLeft = 60;
  pot = [];
  saveGame();
  updateUI();
}

// ================= DATA =================

const ingredients = [
  { id: 'tomato', emoji: '🍅' },
  { id: 'carrot', emoji: '🥕' },
  { id: 'onion', emoji: '🧅' },
  { id: 'potato', emoji: '🥔' },
  { id: 'egg', emoji: '🥚' },
  { id: 'cheese', emoji: '🧀' },
  { id: 'bread', emoji: '🍞' },
  { id: 'meat', emoji: '🥩' },
  { id: 'fish', emoji: '🐟' },
  { id: 'rice', emoji: '🍚' },
  { id: 'milk', emoji: '🥛' },
  { id: 'flour', emoji: '🌾' },
  { id: 'butter', emoji: '🧈' },
  { id: 'herb', emoji: '🌿' },
  { id: 'water', emoji: '💧' },
  { id: 'spice', emoji: '🧂' }
];

const recipes = [
  { needs: ['egg','butter'], points: 10 },
  { needs: ['bread','cheese','butter'], points: 12 },
  { needs: ['tomato','water','herb'], points: 15 }
];

// ================= STATE =================

let score = 0;
let timeLeft = 60;
let pot = [];
let timer;

// ================= DOM =================

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const potContents = document.getElementById("potContents");
const ingredientGrid = document.getElementById("ingredientGrid");
const resultPanel = document.getElementById("resultPanel");

// ================= UI =================

function updateUI() {
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  potContents.textContent = pot.map(i => i.emoji).join(" ");
}

// ================= GAME =================

function addIngredient(item) {
  pot.push(item);
  updateUI();
}

function clearPot() {
  pot = [];
  updateUI();
}

function cook() {
  const ids = pot.map(p => p.id).sort();

  const match = recipes.find(r =>
    JSON.stringify(r.needs.sort()) === JSON.stringify(ids)
  );

  if (match) {
    score += match.points;
    resultPanel.textContent = "✅ Good dish!";
  } else {
    resultPanel.textContent = "❌ Wrong recipe!";
  }

  pot = [];
  saveGame();
  updateUI();
}

// ================= RENDER =================

function renderIngredients() {
  ingredientGrid.innerHTML = "";

  ingredients.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.emoji;
    btn.onclick = () => addIngredient(item);
    ingredientGrid.appendChild(btn);
  });
}

// ================= TIMER =================

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateUI();

    if (timeLeft <= 0) {
      clearInterval(timer);
      resultPanel.textContent = "⏰ Game Over!";
    }

    saveGame();
  }, 1000);
}

// ================= INIT =================

window.onload = function () {
  loadGame();
  renderIngredients();
  updateUI();
  startTimer();
};
