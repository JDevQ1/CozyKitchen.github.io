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
  {
    id: 'tomato_soup',
    name: 'Tomato Soup',
    emoji: '🥣',
    needs: ['tomato', 'water', 'herb'],
    points: 15,
    customer: 'Luna',
    face: '😊'
  },
  {
    id: 'veggie_stew',
    name: 'Veggie Stew',
    emoji: '🍲',
    needs: ['carrot', 'potato', 'onion', 'water'],
    points: 20,
    customer: 'Oliver',
    face: '😋'
  },
  {
    id: 'fried_egg',
    name: 'Sunny Egg',
    emoji: '🍳',
    needs: ['egg', 'butter'],
    points: 10,
    customer: 'Mia',
    face: '😃'
  },
  {
    id: 'cheese_toast',
    name: 'Cheese Toast',
    emoji: '🥪',
    needs: ['bread', 'cheese', 'butter'],
    points: 12,
    customer: 'Noah',
    face: '🥰'
  },
  {
    id: 'grilled_meat',
    name: 'Grilled Steak',
    emoji: '🥩',
    needs: ['meat', 'spice', 'herb'],
    points: 18,
    customer: 'Ava',
    face: '😎'
  },
  {
    id: 'fish_rice',
    name: 'Fish & Rice',
    emoji: '🍱',
    needs: ['fish', 'rice', 'herb'],
    points: 22,
    customer: 'Leo',
    face: '🤗'
  },
  {
    id: 'mashed_potato',
    name: 'Mashed Potato',
    emoji: '🥔',
    needs: ['potato', 'milk', 'butter'],
    points: 14,
    customer: 'Ella',
    face: '😁'
  },
  {
    id: 'simple_omelette',
    name: 'Omelette',
    emoji: '🍳',
    needs: ['egg', 'cheese', 'herb'],
    points: 16,
    customer: 'Jack',
    face: '🤩'
  },
  {
    id: 'herb_bread',
    name: 'Herb Bread',
    emoji: '🥖',
    needs: ['flour', 'water', 'herb'],
    points: 13,
    customer: 'Sofia',
    face: '😌'
  },
  {
    id: 'carrot_soup',
    name: 'Carrot Soup',
    emoji: '🥣',
    needs: ['carrot', 'onion', 'water'],
    points: 15,
    customer: 'Ethan',
    face: '🙂'
  }
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

const scoreEl = document.getElementById('score');
const timerEl = document.getElementById
