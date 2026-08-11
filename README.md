# Cozy Kitchen

A cozy pixel-style cooking game built with pure HTML, CSS, and JavaScript.

Take customer orders, pick the right ingredients, and cook dishes before time runs out!

---

## About

Cozy Kitchen is a small browser game where you run a tiny kitchen. Customers arrive with simple orders. You click the correct ingredients, put them in the pot, and press Cook. Correct dishes give points. Wrong dishes cost a life. You have 60 seconds and 3 lives.

The game uses a warm cozy look with cream, peach, and wood colors, plus a light pixel font. Ingredients and dishes are shown with emojis so the project stays simple and does not need external images.

Your high score is saved with cookies so it stays after you close the page.

---

## How to Play

1. Open the game in a browser.
2. Click **Start Cooking**.
3. Look at the customer order and the ingredients it needs.
4. Click ingredients to add them to the pot (order does not matter).
5. Press **Cook!** when ready.
6. Correct recipe = points and a new order.
7. Wrong recipe = lose 1 life.
8. Game ends when time runs out or lives reach 0.

Use the **Clear** button if you want to empty the pot and start again.

---

## Features

- 10 different recipes with different point values
- 16 ingredients
- Score, timer, lives, and orders counter
- High score saved with cookies
- Customer names and faces for each order
- Steam animation while cooking
- Success and fail messages
- Start screen and game over screen
- Works on desktop and mobile

---

## File Structure

All three main files must be in the same folder for the game to work.

---

## Technologies

- HTML5
- CSS3 (Flexbox, Grid, animations, responsive design)
- Vanilla JavaScript (no libraries)
- Cookies for high score
- Google Fonts (Press Start 2P and Nunito)

---

## How to Run Locally

1. Download or clone this repository.
2. Keep `index.html`, `style.css`, and `script.js` in the same folder.
3. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

No install or build step is needed.

---

## How to Host on GitHub Pages

1. Upload all files to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set Source to **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`.
5. Save and wait a minute or two.
6. Open the link GitHub shows (example: `https://yourusername.github.io/repo-name/`).

Make sure the file names are exactly:
- `index.html`
- `style.css`
- `script.js`

GitHub is case-sensitive. Wrong names will break the game.

---

## Design Choices

**Simple and self-contained**  
The game runs with only three files and no external image assets.

**Emoji graphics**  
Emojis keep the project light and avoid broken image links.

**Order does not matter**  
You only need the right ingredients in the pot, not a specific order.

**Cookies for high score**  
The best score is saved in the browser so it remains after refresh.

**Short cooking delay**  
A small pause and steam animation make cooking feel more real without slowing the game too much.

---

## Possible Future Ideas

- Sound effects
- Difficulty levels
- More recipes
- Unlock system
- Background music
- Custom pixel art instead of emoji

---

## Credits

Made as a small front-end project.  
Fonts by Google Fonts.  
Inspired by cozy games and simple kitchen simulators.