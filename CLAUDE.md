# Connections Game

A web-based word puzzle game inspired by the NYT Connections game.

## Tech Stack

- **HTML** — semantic markup, no frameworks
- **CSS** — plain CSS, no preprocessors or utility libraries
- **JavaScript** — vanilla JS (ES6+), no frameworks or build tools

## Project Structure

```
connections-game/
├── index.html        # Main entry point
├── style.css         # All styles
├── game.js           # Core game logic
└── puzzles.js        # Puzzle data / word sets
```

## Game Rules

- Players are presented with 16 words arranged in a 4×4 grid.
- Words belong to 4 groups of 4, each sharing a common theme.
- Players select 4 words and submit a guess.
- Correct guesses reveal the group's category and color.
- Players have 4 attempts before the game ends.
- Groups are color-coded by difficulty: Yellow (easiest) → Green → Blue → Purple (hardest).

## Code Conventions

- Use `const` and `let`; never `var`.
- Prefer `querySelector` / `querySelectorAll` over older DOM APIs.
- Keep game state in a single plain object; avoid scattered globals.
- CSS class toggling for UI state changes (e.g., `.selected`, `.correct`, `.shake`).
- No external dependencies — zero `npm install`, zero CDN scripts.
- Files stay flat — do not create subdirectories unless the project grows substantially.

## Development

Open `index.html` directly in a browser — no build step or local server required.

When iterating on UI, test in a browser before marking work complete.

## Constraints

- Never delete, move, or change files outside of this project directory.
- Any improvements identified outside of this specification must be verified with the user before proceeding.
- When uncertain about anything, do not guess or assume — defer to the user for confirmation. Suggestions are welcome, but do not act on them without explicit authorization.
- Assume the audience of this game is 16 years old or younger; all content and design decisions should be appropriate for that age group.
- When selecting words for puzzles, never use rude words, swear words, words of a sexual nature, racist words, or anything politically offensive.
- After writing any code, verify it works by checking for syntax errors and tracing through the logic manually. Flag anything that needs browser testing.
- Assume users interact via mouse or touch, on either a laptop screen or a phone screen; all UI must be responsive and touch-friendly.
- All puzzle word sets are sourced from `puzzles.js`. Generate puzzle sets there as a first task when starting work on the game.
