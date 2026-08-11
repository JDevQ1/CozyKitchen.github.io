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
{ id: 'tomato_soup', name: 'Tomato Soup', emoji: '🥣', needs: ['tomato', 'water', 'herb'], points: 15, customer: 'Luna', face: '😊' },
{ id: 'veggie_stew', name: 'Veggie Stew', emoji: '🍲', needs: ['carrot', 'potato', 'onion', 'water'], points: 20, customer: 'Oliver', face: '😋' },
{ id: 'fried_egg', name: 'Sunny Egg', emoji: '🍳', needs: ['egg', 'butter'], points: 10, customer: 'Mia', face: '😃' },
{ id: 'cheese_toast', name: 'Cheese Toast', emoji: '🥪', needs: ['bread', 'cheese', 'butter'], points: 12, customer: 'Noah', face: '🥰' },
{ id: 'grilled_meat', name: 'Grilled Steak', emoji: '🥩', needs: ['meat', 'spice', 'herb'], points: 18, customer: 'Ava', face: '😎' },
{ id: 'fish_rice', name: 'Fish & Rice', emoji: '🍱', needs: ['fish', 'rice', 'herb'], points: 22, customer: 'Leo', face: '🤗' },
{ id: 'mashed_potato', name: 'Mashed Potato', emoji: '🥔', needs: ['potato', 'milk', 'butter'], points: 14, customer: 'Ella', face: '😁' },
{ id: 'simple_omelette', name: 'Omelette', emoji: '🍳', needs: ['egg', 'cheese', 'herb'], points: 16, customer: 'Jack', face: '🤩' },
{ id: 'herb_bread', name: 'Herb Bread', emoji: '🥖', needs: ['flour', 'water', 'herb'], points: 13, customer: 'Sofia', face: '😌' },
{ id: 'carrot_soup', name: 'Carrot Soup', emoji: '🥣', needs: ['carrot', 'onion', 'water'], points: 15, customer: 'Ethan', face: '🙂' }
];

let score = 0;
let lives = 3;
let timeLeft = 60;
let ordersDone = 0;
let currentRecipe = null;
let pot = [];
let gameActive = false;
let timerInterval = null;
let isCooking = false;
let highScore = 0;

let scoreEl, timerEl, livesEl, ordersEl, highScoreEl;
let orderNameEl, customerNameEl, customerFaceEl, recipeHintEl;
let potContentsEl, potVisualEl, potEmojiEl, resultPanel;
let cookBtn, clearBtn, ingredientGrid;
let startOverlay, gameOverOverlay, startBtn, restartBtn;
let finalScoreEl, gameOverTitle, gameOverMsg, startHighScoreEl, endHighScoreEl;

function setCookie(name, value, days) {
let expires = '';
if (days) {
const date = new Date();
date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
expires = '; expires=' + date.toUTCString();
}
document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax';
}

function getCookie(name) {
const nameEQ = name + '=';
const ca = document.cookie.split(';');
for (let i = 0; i < ca.length; i++) {
let c = ca[i].trim();
if (c.indexOf(nameEQ) === 0) {
return decodeURIComponent(c.substring(nameEQ.length));
}
}
return null;
}

function loadHighScore() {
const saved = getCookie('cozyKitchenHighScore');
highScore = saved ? parseInt(saved, 10) : 0;
if (isNaN(highScore)) highScore = 0;
updateHighScoreDisplay();
}

function saveHighScore() {
if (score > highScore) {
highScore = score;
setCookie('cozyKitchenHighScore', highScore, 365);
}
updateHighScoreDisplay();
}

function updateHighScoreDisplay() {
if (highScoreEl) highScoreEl.textContent = highScore;
if (startHighScoreEl) startHighScoreEl.textContent = highScore;
if (endHighScoreEl) endHighScoreEl.textContent = highScore;
}

function buildIngredients() {
if (!ingredientGrid) return;
ingredientGrid.innerHTML = '';
ingredients.forEach(function(ing) {
const btn = document.createElement('button');
btn.className = 'ingredient-btn';
btn.innerHTML = '<span class="emoji">' + ing.emoji + '</span><span>' + ing.name + '</span>';
btn.onclick = function() { addToPot(ing.id); };
ingredientGrid.appendChild(btn);
});
}

function addToPot(id) {
if (!gameActive || isCooking) return;
if (pot.length >= 5) {
showResult('Pot is full! Cook or clear it.', false);
return;
}
pot.push(id);
updatePotDisplay();
if (cookBtn) cookBtn.disabled = false;
if (clearBtn) clearBtn.disabled = false;
}

function updatePotDisplay() {
if (!potContentsEl) return;
potContentsEl.innerHTML = pot.map(function(id) {
const ing = ingredients.find(function(i) { return i.id === id; });
return ing ? ing.emoji : '?';
}).join(' ');
}

function clearPot() {
pot = [];
updatePotDisplay();
if (cookBtn) cookBtn.disabled = true;
if (clearBtn) clearBtn.disabled = true;
if (potEmojiEl) potEmojiEl.textContent = '🍲';
if (potVisualEl) potVisualEl.classList.remove('cooking');
}

function getRandomRecipe() {
return recipes[Math.floor(Math.random() * recipes.length)];
}

function newOrder() {
currentRecipe = getRandomRecipe();

if (orderNameEl) {
orderNameEl.textContent = currentRecipe.name + ' ' + currentRecipe.emoji;
}
if (customerNameEl) {
customerNameEl.textContent = currentRecipe.customer + ' is waiting';
}
if (customerFaceEl) {
customerFaceEl.textContent = currentRecipe.face;
}

if (recipeHintEl) {
const neededNames = currentRecipe.needs.map(function(id) {
const ing = ingredients.find(function(i) { return i.id === id; });
return ing ? ing.emoji + ' ' + ing.name : id;
});
recipeHintEl.innerHTML = '<strong>Needs:</strong> ' + neededNames.join(' + ');
}

clearPot();
showResult('New order! Add the right ingredients.', null);
}

function arraysMatch(a, b) {
if (a.length !== b.length) return false;
const sortedA = a.slice().sort();
const sortedB = b.slice().sort();
for (let i = 0; i < sortedA.length; i++) {
if (sortedA[i] !== sortedB[i]) return false;
}
return true;
}

function cook() {
if (!gameActive || isCooking || pot.length === 0) return;
isCooking = true;
if (cookBtn) cookBtn.disabled = true;
if (clearBtn) clearBtn.disabled = true;
if (potVisualEl) potVisualEl.classList.add('cooking');
if (potEmojiEl) potEmojiEl.textContent = '🔥';

showResult('Cooking... ⏳', null);

setTimeout(function() {
const correct = arraysMatch(pot, currentRecipe.needs);

if (correct) {
score += currentRecipe.points;
ordersDone++;
if (scoreEl) scoreEl.textContent = score;
if (ordersEl) ordersEl.textContent = ordersDone;
showResult('Perfect! +' + currentRecipe.points + ' points 🎉', true);
if (potEmojiEl) potEmojiEl.textContent = currentRecipe.emoji;
} else {
lives--;
if (livesEl) livesEl.textContent = lives;
showResult('Wrong recipe! Lost a life 💔', false);
if (potEmojiEl) potEmojiEl.textContent = '😵';
}

isCooking = false;
if (potVisualEl) potVisualEl.classList.remove('cooking');

if (lives <= 0) {
endGame(false);
return;
}

setTimeout(function() {
if (gameActive) newOrder();
}, 1200);
}, 900);
}

function showResult(msg, success) {
if (!resultPanel) return;
resultPanel.textContent = msg;
resultPanel.classList.remove('success', 'fail');
if (success === true) resultPanel.classList.add('success');
if (success === false) resultPanel.classList.add('fail');
}

function startTimer() {
if (timerInterval) clearInterval(timerInterval);
timerInterval = setInterval(function() {
timeLeft--;
if (timerEl) timerEl.textContent = timeLeft;
if (timeLeft <= 0) {
endGame(true);
}
}, 1000);
}

function endGame(timeUp) {
gameActive = false;
if (timerInterval) clearInterval(timerInterval);
if (finalScoreEl) finalScoreEl.textContent = score;
saveHighScore();

if (timeUp) {
if (gameOverTitle) gameOverTitle.textContent = "Time's Up!";
if (gameOverMsg) gameOverMsg.textContent = 'You completed ' + ordersDone + ' orders. Great work, chef!';
} else {
if (gameOverTitle) gameOverTitle.textContent = 'Out of Lives';
if (gameOverMsg) gameOverMsg.textContent = 'You ran out of hearts after ' + ordersDone + ' orders.';
}

if (gameOverOverlay) gameOverOverlay.classList.remove('hidden');
}

function startGame() {
score = 0;
lives = 3;
timeLeft = 60;
ordersDone = 0;
pot = [];
isCooking = false;
gameActive = true;

if (scoreEl) scoreEl.textContent = score;
if (livesEl) livesEl.textContent = lives;
if (timerEl) timerEl.textContent = timeLeft;
if (ordersEl) ordersEl.textContent = ordersDone;

if (startOverlay) startOverlay.classList.add('hidden');
if (gameOverOverlay) gameOverOverlay.classList.add('hidden');

newOrder();
startTimer();
}

function init() {
scoreEl = document.getElementById('score');
timerEl = document.getElementById('timer');
livesEl = document.getElementById('lives');
ordersEl = document.getElementById('ordersDone');
highScoreEl = document.getElementById('highScore');
orderNameEl = document.getElementById('orderName');
customerNameEl = document.getElementById('customerName');
customerFaceEl = document.getElementById('customerFace');
recipeHintEl = document.getElementById('recipeHint');
potContentsEl = document.getElementById('potContents');
potVisualEl = document.getElementById('potVisual');
potEmojiEl = document.getElementById('potEmoji');
resultPanel = document.getElementById('resultPanel');
cookBtn = document.getElementById('cookBtn');
clearBtn = document.getElementById('clearBtn');
ingredientGrid = document.getElementById('ingredientGrid');
startOverlay = document.getElementById('startOverlay');
gameOverOverlay = document.getElementById('gameOverOverlay');
startBtn = document.getElementById('startBtn');
restartBtn = document.getElementById('restartBtn');
finalScoreEl = document.getElementById('finalScore');
gameOverTitle = document.getElementById('gameOverTitle');
gameOverMsg = document.getElementById('gameOverMsg');
startHighScoreEl = document.getElementById('startHighScore');
endHighScoreEl = document.getElementById('endHighScore');

if (cookBtn) cookBtn.addEventListener('click', cook);
if (clearBtn) clearBtn.addEventListener('click', clearPot);
if (startBtn) startBtn.addEventListener('click', startGame);
if (restartBtn) restartBtn.addEventListener('click', startGame);

loadHighScore();
buildIngredients();
}

if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init);
} else {
init();
}