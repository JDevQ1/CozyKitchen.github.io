
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

// Get a cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

// Save game
function saveGame() {
  setCookie("score", score, 7);
  setCookie("lives", lives, 7);
  setCookie("timeLeft", timeLeft, 7);
  setCookie("ordersDone", ordersDone, 7);
}

// Load game
function loadGame() {
  const savedScore = getCookie("score");
  const savedLives = getCookie("lives");
  const savedTime = getCookie("timeLeft");
  const savedOrders = getCookie("ordersDone");

  if (savedScore !== null) score = parseInt(savedScore);
  if (savedLives !== null) lives = parseInt(savedLives);
  if (savedTime !== null) timeLeft = parseInt(savedTime);
  if (savedOrders !== null) ordersDone = parseInt(savedOrders);
}

// Reset game
function resetGame() {
  setCookie("score", "", -1);
  setCookie("lives", "", -1);
  setCookie("timeLeft", "", -1);
  setCookie("ordersDone", "", -1);

  score = 0;
  lives = 3;
  timeLeft = 60;
  ordersDone = 0;

  updateUI();
}

// ================= GAME DATA =================

const ingredients = [
  { id: 'tomato', name: 'Tomato', emoji: '🍅' },
  { id: 'carrot', name: 'Carrot', emoji: '🥕' },
  { id: 'onion', name: 'Onion', emoji: '🧅' },
  { id: 'potato', name: 'Potato', emoji: '🥔' },
  { id: 'egg', name: 'Egg', emoji: '🥚' },
  { id: 'cheese', name: 'Cheese', emoji: '🧀' },
  { id: 'bread', name: 'Bread', emoji: '🍞' },
  { id: 'meat', name: 'Meat', emoji: '🥩' },
  { id: 'fish', name: 'Fish', emoji: '🐟' },
  { id: 'rice', name: 'Rice', emoji: '🍚' },
  { id: 'milk', name: 'Milk', emoji: '🥛' },
  { id: 'flour', name: 'Flour', emoji: '🌾' },
  { id: 'butter', name: 'Butter', emoji: '🧈' },
  { id: 'herb', name: 'Herbs', emoji: '🌿' },
  { id: 'water', name: 'Water', emoji: '💧' },
  { id: 'spice', name: 'Spice', emoji: '🧂' }
];

const recipes = [
  { id: 'tomato_soup', name: 'Tomato Soup', emoji: '🥣', needs: ['tomato','water','herb'], points: 15 },
  { id: 'veggie_stew', name: 'Veggie Stew', emoji: '🍲', needs: ['carrot','potato','onion','water'], points: 20 },
  { id: 'fried_egg', name: 'Sunny Egg', emoji: '🍳', needs: ['egg','butter'], points: 10 },
  { id: 'cheese_toast', name: 'Cheese Toast', emoji: '🥪', needs: ['bread','cheese','butter'], points: 12 },
  { id: 'grilled_meat', name: 'Grilled Steak', emoji: '🥩', needs: ['meat','spice','herb'], points: 18 }
];

// ================= GAME STATE =================

let score = 0;
let lives = 3;
let timeLeft = 60;
let ordersDone = 0;
let currentRecipe = null;
let pot = [];
let timerInterval = null;

// ================= DOM =================

const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const potContents = document.getElementById('potContents');
const cookBtn = document.getElementById('cookBtn');
const clearBtn = document.getElementById('clearBtn');
const ingredientGrid = document.getElementById('ingredientGrid');
const resultPanel = document.getElementById('resultPanel');

// ================= UI =================

function updateUI() {
  if (scoreEl) scoreEl.textContent = score;
  if (timerEl) timerEl.textContent = timeLeft;
  if (potContents) potContents.textContent = pot.map(p => p.emoji).join(" ");

  cookBtn.disabled = pot.length === 0;
  clearBtn.disabled = pot.length === 0;
}

// ================= GAME LOGIC =================

// Add ingredient
function addIngredient(item) {
  pot.push(item);
  updateUI();
}

// Clear pot
function clearPot() {
  pot = [];
  updateUI();
}

// Check recipe
function cook() {
  const potIds = pot.map(p => p.id).sort();

  const found = recipes.find(r => {
    return JSON.stringify(r.needs.sort()) === JSON.stringify(potIds);
  });

  if (found) {
    score += found.points;
    ordersDone++;
    resultPanel.textContent = `✅ You made ${found.name}! +${found.points} points`;
  } else {
    lives--;
    resultPanel.textContent = `❌ Failed dish!`;
  }

  pot = [];
  saveGame();
  updateUI();
}

// ================= INGREDIENT UI =================

function renderIngredients() {
  ingredientGrid.innerHTML = "";

  ingredients.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.emoji + " " + item.name;
    btn.onclick = () => addIngredient(item);
    ingredientGrid.appendChild(btn);
  });
}

// ================= TIMER =================

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateUI();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      resultPanel.textContent = "⏰ Time's up!";
    }

    saveGame();
  }, 1000);
}

// ================= INIT =================

window.onload = () => {
  loadGame();
  renderIngredients();
  updateUI();
  startTimer();

  cookBtn.onclick = cook;
  clearBtn.onclick = clearPot;
};
