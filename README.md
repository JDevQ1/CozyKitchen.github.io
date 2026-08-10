# Cozy Kitchen

#### Video Demo: <URL HERE>
#### Description:

Cozy Kitchen is a browser-based cooking game created with HTML, CSS, and JavaScript. In this project the player steps into the role of a small-kitchen chef who receives orders from friendly customers and must prepare the correct dishes by choosing the right ingredients. The main objective is to complete as many successful orders as possible before the timer reaches zero or the player runs out of lives.

The visual design aims for a warm and inviting atmosphere. Soft cream, peach, wood-brown, and sage-green colors dominate the interface, giving the game a cozy feeling. The Press Start 2P font is used for titles and important numbers so that the overall look carries a gentle pixel-art / retro influence, while the Nunito font keeps body text easy to read. Instead of loading external sprite sheets or image files, the game relies on emoji for ingredients, dishes, and customer faces. This choice keeps the project completely self-contained and avoids any risk of broken image links.

The game is intentionally simple to learn yet still offers a small amount of pressure through a countdown timer and a limited number of lives. Players can enjoy short sessions without needing a long tutorial. The interface is also responsive, so the same code works reasonably well on both desktop computers and mobile phones.

### How to Play

1. Open the file `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge, etc.).
2. On the welcome screen, read the short instructions and then click the **Start Cooking** button.
3. A customer order appears. The order shows the name of the dish, a customer name and face, and a clear list of the ingredients that are required.
4. On the right side of the screen you will see a grid of ingredient buttons. Click any ingredient to add it to the cooking pot. You may add up to five ingredients. The order in which you click them does not matter.
5. When you believe the pot contains the correct combination, press the green **Cook!** button.
6. After a short cooking animation, the game checks whether your selection matches the recipe.
   - If the combination is correct you earn points, the completed-order counter increases, and a new customer order is generated.
   - If the combination is wrong you lose one life and a new order still appears (unless you have no lives left).
7. You can press the **Clear** button at any time to empty the pot and start the current combination over.
8. The game ends when either the 60-second timer reaches zero or you lose your third life. A final score screen then appears and you may choose to play again.

### Features

- Ten different recipes, each with its own point value and customer personality
- Sixteen selectable ingredients ranging from vegetables and proteins to dairy and seasonings
- Live score, countdown timer, remaining lives, and completed-orders counters
- Animated steam rising from the pot while a dish is cooking
- Color-coded success and failure messages after each attempt
- Friendly start screen that explains the basic rules
- Game-over screen that displays the final score and number of finished orders
- Responsive layout that adapts to both wide desktop windows and narrower mobile screens
- Fully self-contained code — no external image assets or third-party libraries required

### File Structure
cozy-cooking-game/
├── index.html      # HTML structure and page layout
├── style.css       # All visual styling, colors, and animations
├── script.js       # Game logic, state management, and interactivity
└── README.md       # Project documentation (this file)

Separating the three main technologies into their own files makes the project easier to read and maintain. The HTML file contains only structure, the CSS file contains only presentation, and the JavaScript file contains only behavior.

### Design Decisions

**Single-page application with no build step.**
The entire game runs directly in the browser. There is no server, no package manager, and no compilation step. A player only needs to open `index.html`. This approach keeps the barrier to entry extremely low and matches the spirit of many introductory web-programming assignments.

**Emoji instead of image assets.**
Using emoji for ingredients, finished dishes, and customer faces removes the need to host or link to external pixel-art files. The game therefore remains portable and will continue to work even if internet access to image hosts is unavailable. The emoji also give the interface a playful character that fits the cozy theme.

**Order-independent ingredient matching.**
Recipes are treated as unordered sets. The player does not have to add ingredients in a specific sequence. When the Cook button is pressed, both the pot contents and the recipe requirements are sorted and then compared. This design decision reduces unnecessary frustration and lets the player concentrate on remembering which items belong together rather than on precise clicking order.

**Short cooking delay and visual feedback.**
After the player presses Cook, a short pause occurs and steam appears above the pot. During this moment the interface is locked so that additional ingredients cannot be added. The delay is long enough to feel like something is happening, yet short enough that the game still feels responsive. Success and failure are further emphasized by changing the background color of the result message panel.

**Limited pot capacity.**
The pot will accept at most five ingredients. If the player tries to add a sixth item, a gentle warning appears. This limit prevents the interface from becoming cluttered and also matches the fact that none of the current recipes require more than four ingredients.

**Lives combined with a timer.**
Three lives give the player a small safety net for mistakes, while the 60-second timer prevents sessions from lasting indefinitely. Together they create a light sense of urgency without making the experience stressful. The balance is intentionally forgiving so that new players can enjoy several successful orders in a single run.

**Warm color palette and soft borders.**
All panels use a cream background, thick brown borders, and soft drop shadows. Buttons respond to hover and active states with small positional shifts, giving a tactile feeling even though the game is two-dimensional. These visual choices reinforce the “cozy kitchen” mood that the project aims for.

### Technologies

- **HTML5** – semantic structure, buttons, and containers
- **CSS3** – Flexbox and Grid layout, custom properties (CSS variables), keyframe animations, media queries, and transitions
- **Vanilla JavaScript (ES6+)** – arrays, objects, DOM manipulation, event listeners, `setTimeout`, and `setInterval`
- **Google Fonts** – Press Start 2P for headings and score numbers, Nunito for readable body text

No frameworks (React, Vue, etc.), no CSS libraries (Bootstrap, Tailwind), and no JavaScript libraries are used. The project is pure front-end code.

### Implementation Notes

All game data is stored in two constant arrays declared at the top of `script.js`. The `ingredients` array holds objects that each contain an identifier, a display name, and an emoji. The `recipes` array holds objects that each contain an identifier, a dish name, an emoji, an array of required ingredient identifiers, a point value, a customer name, and a customer face emoji.

When a new order is needed, the function `getRandomRecipe` selects one entry from the recipes array at random. The selected recipe is stored in the variable `currentRecipe` and its information is written into the corresponding DOM elements so the player can see the order and the required ingredients.

The cooking pot is represented by a simple array named `pot` that stores ingredient identifiers. Clicking an ingredient button calls `addToPot`, which appends the identifier (provided the pot is not full and the game is active). The visual contents of the pot are updated by mapping each identifier back to its emoji.

When the player presses Cook, the function `cook` first locks the interface, shows the steam animation, and then after a short delay compares the sorted pot array with the sorted requirements of the current recipe. Matching arrays increase the score and the order counter; non-matching arrays decrease the life counter. In either case a new order is prepared after another brief pause, unless the player has reached zero lives.

Global flags `gameActive` and `isCooking` prevent input during inappropriate moments (before the game has started, while the cooking animation is running, or after the game has ended). The countdown timer is driven by `setInterval` and is cleared with `clearInterval` when the game finishes.

### Possible Improvements

Several natural extensions could be added in future versions:

- Sound effects that play on successful cooks, failed attempts, and button clicks
- Multiple difficulty settings that change the length of the timer or the complexity of recipes
- A progression system that unlocks new recipes once the player reaches certain score thresholds
- Persistent high-score storage using the browser’s `localStorage` API
- Replacement of emoji with hand-drawn or free pixel-art sprites for a more consistent visual style
- A quiet background soundtrack that loops while the game is running
- Keyboard shortcuts so that experienced players can select ingredients without using the mouse

### How to Run

1. Download or copy the project folder so that `index.html`, `style.css`, and `script.js` sit in the same directory.
2. Double-click `index.html` or open it through a browser’s “Open File” menu.
3. The game should start immediately. No installation, no terminal commands, and no internet connection (except for the Google Fonts request) are required.

Because the project uses only standard web technologies, it will run on virtually any device that has a reasonably up-to-date browser.

### Acknowledgments

This project was written as a small interactive demonstration of front-end web development. The overall mood draws inspiration from cozy simulation games and from classic pixel-art user interfaces. The fonts Press Start 2P and Nunito are provided by Google Fonts and are used under their respective open licenses. All game logic, styling, and structure were created from scratch for this assignment.
