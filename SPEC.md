# Bennections — Game Specification

## Overview

**Bennections** is a browser-based word puzzle game inspired by the NYT Connections game. The name is a play on *Ben* + *Connect*. Players identify four groups of four words from a 16-word grid, with each group sharing a hidden common theme.

**Supported browsers:** Chrome, Safari, Edge — on phone and laptop.

---

## Visual Style

Bennections uses an **8-bit retro** aesthetic throughout:

- Pixel-art inspired typography (e.g. a monospace or bitmap-style font)
- Hard pixel edges — no rounded corners, no smooth shadows, no gradients
- Limited, bold colour palette consistent with classic 8-bit games
- UI elements (tiles, buttons, modal) styled to evoke retro game interfaces
- Animations (shake, flip) should feel snappy and blocky, not fluid

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Markup     | HTML5 (semantic, no frameworks)   |
| Styles     | Plain CSS3 (no preprocessors)     |
| Logic      | Vanilla JavaScript ES6+           |
| Build tool | None — open `index.html` directly |
| Dependencies | Zero (no npm, no CDN scripts)   |

---

## File Structure

```
connections-game/
├── index.html   — Shell markup; loads CSS and JS
├── style.css    — All styles
├── game.js      — All game logic and state
├── puzzles.js   — Puzzle data (word sets)
├── CLAUDE.md    — Developer constraints
└── SPEC.md      — This document
```

Files stay flat. Do not create subdirectories unless the project grows substantially.

---

## User Journey

### Screen 1 — Welcome / Splash
- On load the player sees a full-screen **8-bit animated** welcome screen.
- The animation displays the text **"Welcome to Bennections"** in 8-bit style.
- A **"Start"** button (or prompt) appears; clicking or tapping it begins the game.
- No puzzle content is visible at this stage.

### Screen 2 — Game Board
- After clicking Start, the welcome screen is replaced by the game board.
- The board shows the **4×4 word grid** sourced from `puzzles.js`.
- Below the grid: mistakes indicator, control buttons, and feedback message area.

### Screen 3 — End of Game (Modal)
- Shown over the board when the game ends.
- **Win:** 8-bit giant star + "You're a winner, and very powerful".
- **Loss:** 8-bit thumbs-down graphic.
- Both states show two buttons below the graphic: **"Admire"** and **"Play Again"**.
  - **Admire** dismisses the modal and enters Screen 4 (Admire Mode).
  - **Play Again** loads a new puzzle immediately and returns to Screen 2.

### Screen 4 — Admire Mode
- Entered by clicking **Admire** on the end-of-game modal.
- The modal is dismissed; the completed game board remains fully visible with all four solved rows displayed.
- The normal game controls (Shuffle, Deselect All, Submit) are hidden and replaced by a single **"Play Again"** button.
- No tile interaction is possible — `state.locked` remains `true` throughout.
- Clicking **Play Again** loads a new puzzle and returns to Screen 2.

---

## Game Rules

1. Players are shown **16 words** arranged in a **4×4 grid**.
2. The 16 words belong to **4 groups of 4**, each sharing a hidden theme.
3. Players **select exactly 4 words** then press **Submit**.
4. A correct guess reveals the group: the tiles recolour, align into a row, and move to the top of the grid.
5. Players have **4 turns** in total. An incorrect guess **decrements the turn counter by 1**.
6. When all 4 turns are used up, the game ends — all remaining unsolved groups animate into solved rows (same tile-pop and row sequence as a correct guess), then the loss modal is shown.
7. Solving all 4 groups before running out of turns means the player **wins**.

---

## Difficulty & Colour Coding

Groups are ordered from easiest to hardest, using the standard NYT Connections colour palette:

| Tier | Colour | Hex       | Difficulty |
|------|--------|-----------|------------|
| 0    | Yellow | `#F9DF6D` | Easiest    |
| 1    | Green  | `#A0C35A` | Moderate   |
| 2    | Blue   | `#B0C4EF` | Hard       |
| 3    | Purple | `#BA81C5` | Hardest    |

The colour is not shown to the player until the group is correctly guessed.

---

## UI Components

### Header
- Game title: **Bennections**
- Subtitle: "Find four groups of four!"

### Solved Groups Area (`#solved-groups`)
- When a group is correctly guessed, its four tiles change to the group's colour (yellow / green / blue / purple as defined in `puzzles.js`), align into a single horizontal row, and animate to the **top of the grid area** using blocky 8-bit movement (see §Correct-guess tile movement below).
- Each subsequent correct guess stacks as a new row **below** the previous solved rows.
- Solved rows display the category name and the four words.
- The remaining unsolved tiles do not animate — the grid rebuilds instantly after the solved tiles depart, producing a hard reflow consistent with the 8-bit aesthetic.

### Word Grid (`#grid`)
- 4×4 grid of word tiles sourced from the active puzzle in `puzzles.js`.
- **Default tile appearance:** grey background, black text.
- **Selected tile appearance:** yellow (`#F9DF6D`) background, dark text.
- Font size adjusts to fit the word within the tile; words may wrap to a second line if necessary.
- Tapping/clicking a tile **selects** it; tapping a selected tile **deselects** it.
- A maximum of **4 tiles** may be selected at once; attempting to select a 5th tile is **silently ignored** — the player must deselect an existing tile first.
- Tiles that have been correctly guessed are removed from the interactive grid.

### Turns Indicator (`#mistakes`)
- Positioned **underneath the tile grid**.
- Displayed as a row of **4 eight-bit style heart icons**.
- One heart is removed per incorrect guess.
- When all 4 hearts are gone the game ends.

### Controls (`#controls`)
- **Shuffle** — randomises the order of remaining (unsolved) tiles.
- **Deselect All** — clears the current selection.
- **Submit** — **greyed out** until exactly 4 tiles are selected; once 4 are selected it becomes active and submits the guess on click.

### Feedback Message (`#message`)
- Inline status messages (e.g. "One away!", "Already guessed!", "Try again.").
- Uses `role="status"` and `aria-live="polite"` for accessibility.

### End-of-Game Modal (`#modal`)
- Shown at the end of a game (win or loss).
- **Win state:** 8-bit giant star graphic + text "You're a winner, and very powerful".
- **Loss state:** 8-bit thumbs-down graphic.
- Two buttons are displayed below the graphic in both states:
  - **"Admire"** — dismisses the modal and enters Admire Mode (Screen 4).
  - **"Play Again"** — dismisses the modal and immediately starts a new game with a different puzzle.
- Puzzles do not repeat until all available puzzles have been played.

---

## Animations & Feedback

| Event              | Effect                                    |
|--------------------|-------------------------------------------|
| Incorrect guess    | 1. Selected tiles briefly shake. 2. One heart is removed from the turn counter. 3. Tiles are deselected. |
| Correct guess      | 1. Tiles briefly enlarge (pop). 2. Tiles abruptly recolour to the group colour — single frame, no fade. 3. Tiles march upward to the solved row in discrete blocky steps (see §Correct-guess tile movement). |
| "One away"         | Inline message shown                      |
| Already guessed    | Inline message shown, no mistake lost     |

---

## Correct-guess tile movement

The four correctly-guessed tiles travel from their positions in the grid up to form a solved row. This movement must feel like a sprite stepping across tiles in an old video game — think **Snake on a Nokia phone** — not a smooth CSS transition.

**Sequence:**
1. **Pop** — all four tiles scale up briefly together using the existing `tile-pop` keyframe.
2. **Staggered march** — tiles move upward **one at a time**, each launching after a short fixed delay (e.g. ~80–100 ms between each tile). Each tile travels its **own calculated distance**: the exact pixel offset from its current screen position to the target Y (the bottom of the `#solved-groups` area, i.e. where the new solved row will appear). This ensures all four tiles converge and land at the same horizontal position regardless of which grid row they started in. Movement uses `steps(N)` timing (target N = 5–6 steps): the tile teleports upward in discrete jumps with dead stops between each one, exactly like a Snake segment hopping one square at a time. Total travel time per tile: ~350–450 ms.
3. **Snap & recolour** — each tile arrives at the solved row position and **locks in first**, then **immediately recolours** to its group colour in a single abrupt frame (no CSS `transition` on background-color). The recolour is a reward that fires on arrival, not before departure.
4. Once all four tiles have arrived and recoloured, the solved row label (category name + words) **snaps in** — no fade, no slide.

**Key constraint:** no `ease`, `ease-in`, `ease-out`, `linear`, or any interpolating timing function is used for the march movement. Only `steps(N)` is permitted, preserving the blocky, frame-by-frame quality throughout.

---

## Puzzle Data Format (`puzzles.js`)

```js
const PUZZLES = [
  {
    id: Number,          // unique puzzle identifier (1-based)
    groups: [
      {
        category: String, // displayed label after group is solved
        color: String,    // "yellow" | "green" | "blue" | "purple"
        words: [String, String, String, String]  // exactly 4 words, UPPERCASE
      },
      // … 3 more groups, ordered yellow → green → blue → purple
    ]
  },
  // … more puzzles
];
```

- All words are **UPPERCASE**.
- Each puzzle has **exactly 4 groups**, each with **exactly 4 words** (16 total).
- Groups are ordered index 0–3 by difficulty (yellow first, purple last).
- The current dataset contains **20 puzzles**.

---

## Puzzle Content Guidelines

- **Audience:** 16 years old and under.
- **Prohibited content:** rude words, swear words, sexual language, racist language, politically offensive content.
- **Category types used:** literal categories (e.g. "Fruits"), synonym sets (e.g. "Words meaning 'happy'"), compound-word patterns (e.g. "___ ball"), and thematic sets (e.g. "Things in a kitchen").
- Each puzzle should be internally consistent — no word should fit more than one group.

---

## State Management

All game state lives in a single plain object in `game.js`. There are no scattered globals. Key fields:

- Current puzzle reference
- Which tiles are solved
- Current selection (array of up to 4 words)
- Turns remaining
- Previously guessed combinations (to detect duplicates)
- List of already-played puzzle IDs (to avoid repeating puzzles until all 20 have been played)
- `admiring` — boolean; `true` while the player is in Admire Mode (Screen 4). Reset to `false` at the start of each new game.

---

## Responsive & Accessibility Requirements

- Layout must work on **laptop screens and phone screens**.
- All interactive elements must be reachable and usable by **mouse and touch**.
- Tap targets must be large enough for finger input (minimum ~44px).
- `role` and `aria-live` attributes are used on dynamic content.
- No horizontal overflow on small viewports.

---

## Development Workflow

1. Open `index.html` directly in a browser — no server or build step required.
2. After any code change, verify for syntax errors and trace through the logic manually.
3. Test the golden path (win and loss flows) and edge cases (duplicate guess, one-away, shuffle) in a browser before marking work complete.
4. Flag anything that requires browser testing and cannot be verified statically.
