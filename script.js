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

const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const livesEl = document.getElementById('lives');
const ordersEl = document.getElementById('ordersDone');
const highScoreEl = document.getElementById('highScore');
const orderNameEl = document.getElementById('orderName');
const customerNameEl = document.getElementById('customerName');
const customerFaceEl = document.getElementById('customerFace');
const recipeHintEl = document.getElementById('recipeHint');
const potContentsEl = document.getElementById('potContents');
const potVisualEl = document.getElementById('potVisual');
const potEmojiEl = document.getElementById('potEmoji');
const resultPanel = document.getElementById('resultPanel');
const cookBtn = document.getElementById('cookBtn');
const clearBtn = document.getElementById('clearBtn');
const ingredientGrid = document.getElementById('ingredientGrid');
const startOverlay = document.getElementById('startOverlay');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const finalScoreEl = document.getElementById('finalScore');
const gameOverTitle = document.getElementById('gameOverTitle');
const gameOverMsg = document.getElementById('gameOverMsg');
const startHighScoreEl = document.getElementById('startHighScore');
const endHighScoreEl = document.getElementById('endHighScore');

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
ingredientGrid.innerHTML = '';
ingredients.forEach(ing => {
const btn = document.createElement('button');
btn.className = 'ingredient-btn';
btn.innerHTML = `<span class="emoji">${ing.emoji}</span><span>${ing.name}</span>`;
btn.onclick = () => addToPot(ing.id);
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
cookBtn.disabled = false;
clearBtn.disabled = false;
}

function updatePotDisplay() {
potContentsEl.innerHTML = pot.map(id => {
const ing = ingredients.find(i => i.id === id);
return ing ? ing.emoji : '?';
}).join(' ');
}

function clearPot() {
pot = [];
updatePotDisplay();
cookBtn.disabled = true;
clearBtn.disabled = true;
potEmojiEl.textContent = '🍲';
potVisualEl.classList.remove('cooking');
}

function getRandomRecipe() {
return recipes[Math.floor(Math.random() * recipes.length)];
}

function newOrder() {
currentRecipe = getRandomRecipe();
orderNameEl.textContent = currentRecipe.name + ' ' + currentRecipe.emoji;
customerNameEl.textContent = currentRecipe.customer + ' is waiting';
customerFaceEl.textContent = currentRecipe.face;

const neededNames = currentRecipe.needs.map(id => {
const ing = ingredients.find(i => i.id === id);
return ing ? ing.emoji + ' ' + ing.name : id;
});
recipeHintEl.innerHTML = `<strong>Needs:</strong> ${neededNames.join(' + ')}`;
clearPot();
showResult('New order! Add the right ingredients.', null);
}

function arraysMatch(a, b) {
if (a.length !== b.length) return false;
const sortedA = [...a].sort();
const sortedB = [...b].sort();
return sortedA.every((val, i) => val === sortedB[i]);
}

function cook() {
if (!gameActive || isCooking || pot.length === 0) return;
isCooking = true;
cookBtn.disabled = true;
clearBtn.disabled = true;
potVisualEl.classList.add('cooking');
potEmojiEl.textContent = '🔥';

showResult('Cooking... ⏳', null);

setTimeout(() => {
const correct = arraysMatch(pot, currentRecipe.needs);

if (correct) {
score += currentRecipe.points;
ordersDone++;
scoreEl.textContent = score;
ordersEl.textContent = ordersDone;
showResult(`Perfect! +${currentRecipe.points} points 🎉`, true);
potEmojiEl.textContent = currentRecipe.emoji;
} else {
lives--;
livesEl.textContent = lives;
showResult('Wrong recipe! Lost a life 💔', false);
potEmojiEl.textContent = '😵';
}

isCooking = false;
potVisualEl.classList.remove('cooking');

if (lives <= 0) {
endGame(false);
return;
}

setTimeout(() => {
if (gameActive) newOrder();
}, 1200);
}, 900);
}

function showResult(msg, success) {
resultPanel.textContent = msg;
resultPanel.classList.remove('success', 'fail');
if (success === true) resultPanel.classList.add('success');
if (success === false) resultPanel.classList.add('fail');
}

function startTimer() {
timerInterval = setInterval(() => {
timeLeft--;
timerEl.textContent = timeLeft;
if (timeLeft <= 0) {
endGame(true);
}
}, 1000);
}

function endGame(timeUp) {
gameActive = false;
clearInterval(timerInterval);
finalScoreEl.textContent = score;
saveHighScore();

if (timeUp) {
gameOverTitle.textContent = "Time's Up!";
gameOverMsg.textContent = `You completed ${ordersDone} orders. Great work, chef!`;
} else {
gameOverTitle.textContent = 'Out of Lives';
gameOverMsg.textContent = `You ran out of hearts after ${ordersDone} orders.`;
}

gameOverOverlay.classList.remove('hidden');
}

function startGame() {
score = 0;
lives = 3;
timeLeft = 60;
ordersDone = 0;
pot = [];
isCooking = false;
gameActive = true;

scoreEl.textContent = score;
livesEl.textContent = lives;
timerEl.textContent = timeLeft;
ordersEl.textContent = ordersDone;

startOverlay.classList.add('hidden');
gameOverOverlay.classList.add('hidden');

newOrder();
startTimer();
}

cookBtn.addEventListener('click', cook);
clearBtn.addEventListener('click', clearPot);
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

loadHighScore();
buildIngredients();