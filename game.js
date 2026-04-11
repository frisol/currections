// game.js — Phase 3: Full game logic

// ── State ──────────────────────────────────────────────────────────────────
// Single source of truth. No other globals.
const state = {
  puzzle:         null,   // active puzzle object from PUZZLES
  tiles:          [],     // [{ word, groupIndex, solved }] — display order
  selected:       [],     // words currently highlighted (max 4)
  solvedGroups:   [],     // group indices (0-3) correctly guessed
  turnsRemaining: 4,
  guessHistory:   [],     // sorted word-strings already submitted
  playedIds:      [],     // puzzle IDs used this session
  locked:         false,  // true during animations; blocks all interaction
  admiring:       false,  // true while player is in Admire Mode (Screen 4)
};

// ── DOM references ─────────────────────────────────────────────────────────
const elSplash       = document.getElementById('splash');
const elGame         = document.getElementById('game');
const elGrid         = document.getElementById('grid');
const elSolved       = document.getElementById('solved-groups');
const elHearts       = document.getElementById('hearts');
const elMessage      = document.getElementById('message');
const elSubmit       = document.getElementById('btn-submit');
const elDeselect     = document.getElementById('btn-deselect');
const elShuffle      = document.getElementById('btn-shuffle');
const elModal        = document.getElementById('modal');
const elModalGraphic = document.getElementById('modal-graphic');
const elModalMsg     = document.getElementById('modal-message');
const elBtnStart       = document.getElementById('btn-start');
const elBtnPlayAgain   = document.getElementById('btn-play-again');
const elBtnAdmire      = document.getElementById('btn-admire');
const elBtnAdmirePlay  = document.getElementById('btn-admire-play');
const elControls       = document.getElementById('controls');

// ── Utilities ──────────────────────────────────────────────────────────────

function fisherYates(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

// Stable sort key for duplicate-guess detection
function sortedKey(words) {
  return words.slice().sort().join('|');
}

// ── Puzzle selection ───────────────────────────────────────────────────────

function pickPuzzle() {
  let available = PUZZLES.filter(function (p) {
    return state.playedIds.indexOf(p.id) === -1;
  });
  if (available.length === 0) {
    // All 20 played — reset and allow repeats from full set
    state.playedIds = [];
    available = PUZZLES.slice();
  }
  return available[Math.floor(Math.random() * available.length)];
}

// ── Game initialisation ────────────────────────────────────────────────────

function startGame() {
  const puzzle = pickPuzzle();
  state.playedIds.push(puzzle.id);

  state.puzzle          = puzzle;
  state.tiles           = [];
  state.selected        = [];
  state.solvedGroups    = [];
  state.turnsRemaining  = 4;
  state.guessHistory    = [];
  state.locked          = false;
  state.admiring        = false;

  // Flatten all groups into a single tile list, then shuffle
  puzzle.groups.forEach(function (group, groupIndex) {
    group.words.forEach(function (word) {
      state.tiles.push({ word: word, groupIndex: groupIndex, solved: false });
    });
  });
  fisherYates(state.tiles);

  // Reset DOM
  elGrid.innerHTML   = '';
  elSolved.innerHTML = '';
  elControls.classList.remove('admiring');
  elBtnAdmirePlay.classList.add('hidden');
  renderHearts();
  renderGrid();
  syncUI();
  setMessage('');

  // Show game screen
  elSplash.classList.add('hidden');
  elGame.classList.remove('hidden');
  elModal.classList.add('hidden');
}

// ── Rendering ──────────────────────────────────────────────────────────────

function renderGrid() {
  elGrid.innerHTML = '';
  state.tiles
    .filter(function (t) { return !t.solved; })
    .forEach(function (t) {
      const btn = document.createElement('button');
      btn.className = 'tile';
      btn.textContent = t.word;
      btn.dataset.word = t.word;
      elGrid.appendChild(btn);
    });
}

function renderHearts() {
  elHearts.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const span = document.createElement('span');
    span.className = 'heart' + (i >= state.turnsRemaining ? ' lost' : '');
    span.textContent = '♥';
    elHearts.appendChild(span);
  }
}

// ── Sync UI (tile classes + submit button) ─────────────────────────────────

function syncUI() {
  // Reflect selection state on every tile in the grid
  elGrid.querySelectorAll('.tile').forEach(function (btn) {
    btn.classList.toggle('selected', state.selected.indexOf(btn.dataset.word) !== -1);
  });
  // Submit is active only when exactly 4 words are chosen
  elSubmit.disabled = state.selected.length !== 4;
}

function setMessage(text) {
  elMessage.textContent = text;
}

// ── Tile selection — delegated to #grid ────────────────────────────────────

elGrid.addEventListener('click', function (e) {
  if (state.locked) return;
  const tile = e.target.closest('.tile');
  if (!tile) return;

  const word = tile.dataset.word;
  const idx  = state.selected.indexOf(word);

  if (idx !== -1) {
    // Deselect
    state.selected.splice(idx, 1);
  } else {
    // Silently ignore a 5th selection (SPEC: §Word Grid)
    if (state.selected.length >= 4) return;
    state.selected.push(word);
  }

  setMessage('');
  syncUI();
});

// ── Controls ───────────────────────────────────────────────────────────────

elDeselect.addEventListener('click', function () {
  if (state.locked) return;
  state.selected = [];
  syncUI();
  setMessage('');
});

elShuffle.addEventListener('click', function () {
  if (state.locked) return;
  state.selected = [];

  // Separate solved tiles (already in #solved-groups) from unsolved,
  // shuffle only the unsolved, then recombine
  const solved   = state.tiles.filter(function (t) { return t.solved; });
  const unsolved = state.tiles.filter(function (t) { return !t.solved; });
  fisherYates(unsolved);
  state.tiles = solved.concat(unsolved);

  renderGrid();
  syncUI();
  setMessage('');
});

elSubmit.addEventListener('click', handleSubmit);

// ── Submit ─────────────────────────────────────────────────────────────────

function handleSubmit() {
  if (state.locked || state.selected.length !== 4) return;

  const guess = state.selected.slice();
  const key   = sortedKey(guess);

  // Duplicate-guess check — no turn deducted (SPEC: §Feedback Message)
  if (state.guessHistory.indexOf(key) !== -1) {
    setMessage('ALREADY GUESSED!');
    return;
  }
  state.guessHistory.push(key);

  // Resolve which group each guessed word belongs to
  const groupIndices = guess.map(function (word) {
    return state.tiles.find(function (t) { return t.word === word; }).groupIndex;
  });

  const allSame = groupIndices.every(function (gi) {
    return gi === groupIndices[0];
  });

  if (allSame) {
    handleCorrect(groupIndices[0]);
  } else {
    handleIncorrect(groupIndices);
  }
}

// ── Correct guess ──────────────────────────────────────────────────────────

function handleCorrect(groupIndex) {
  state.locked = true;
  const group        = state.puzzle.groups[groupIndex];
  const selectedBtns = Array.from(elGrid.querySelectorAll('.tile.selected'));

  // Step 1: Pop — all four tiles scale up together
  selectedBtns.forEach(function (btn) {
    btn.classList.add('tile-pop');
  });

  // Step 2: After pop completes, launch staggered march
  setTimeout(function () {
    const targetY      = elSolved.getBoundingClientRect().bottom;
    const marchDur     = 400;  // ms per tile
    const staggerDelay = 90;   // ms between each tile launching
    let   completed    = 0;

    selectedBtns.forEach(function (btn, i) {
      // Strip pop and selection; tile reverts to default grey
      btn.classList.remove('tile-pop', 'selected');
      btn.classList.add('marching');

      // Each tile travels its own distance to converge on the solved row
      const dist = targetY - btn.getBoundingClientRect().top;
      btn.style.setProperty('--march-dist', dist + 'px');
      btn.style.animation =
        'march-up ' + marchDur + 'ms steps(6) ' + (i * staggerDelay) + 'ms both';

      // Step 3: On arrival — snap in, then recolour as single-frame reward
      btn.addEventListener('animationend', function onMarchEnd() {
        btn.removeEventListener('animationend', onMarchEnd);
        btn.classList.add(group.color);

        completed++;
        if (completed === selectedBtns.length) {
          // Step 4: All four landed — brief pause, then resolve
          setTimeout(function () {
            state.tiles.forEach(function (t) {
              if (t.groupIndex === groupIndex) t.solved = true;
            });
            state.solvedGroups.push(groupIndex);
            state.selected = [];

            appendSolvedRow(group);
            renderGrid();
            syncUI();
            setMessage('');

            if (state.solvedGroups.length === 4) {
              setTimeout(showWin, 600);
            } else {
              state.locked = false;
            }
          }, 150);
        }
      });
    });

  }, 350); // tile-pop runs for 0.3 s; 350 ms gives it room to finish
}

// ── Incorrect guess ────────────────────────────────────────────────────────

function handleIncorrect(groupIndices) {
  state.locked = true;

  // Shake the selected tiles
  elGrid.querySelectorAll('.tile.selected').forEach(function (btn) {
    btn.classList.remove('shake');
    void btn.offsetWidth; // force reflow so re-adding the class retriggers
    btn.classList.add('shake');
  });

  state.turnsRemaining -= 1;
  renderHearts();

  // One-away: any single group accounts for 3 of the 4 guessed words
  const counts = [0, 0, 0, 0];
  groupIndices.forEach(function (gi) { counts[gi]++; });
  const oneAway = counts.some(function (c) { return c === 3; });
  setMessage(oneAway ? 'SO CLOSE — ONE AWAY!' : 'TRY AGAIN!');

  setTimeout(function () {
    elGrid.querySelectorAll('.shake').forEach(function (btn) {
      btn.classList.remove('shake');
    });
    state.selected = [];
    syncUI();

    if (state.turnsRemaining === 0) {
      // Stay locked; reveal remaining groups then show loss modal
      setTimeout(revealAndLose, 400);
    } else {
      state.locked = false;
    }
  }, 420);
}

// ── Append a solved row to #solved-groups ──────────────────────────────────

function appendSolvedRow(group) {
  const row = document.createElement('div');
  row.className = 'solved-row ' + group.color;

  const cat = document.createElement('span');
  cat.className = 'solved-category';
  cat.textContent = group.category.toUpperCase();

  const words = document.createElement('span');
  words.className = 'solved-words';
  words.textContent = group.words.join(' · ');

  row.appendChild(cat);
  row.appendChild(words);
  elSolved.appendChild(row);
}

// ── Loss: animate all remaining groups in difficulty order ────────────────

function revealAndLose() {
  const unsolvedIndices = [0, 1, 2, 3].filter(function (gi) {
    return state.solvedGroups.indexOf(gi) === -1;
  });

  setMessage('');

  function revealNext(i) {
    if (i >= unsolvedIndices.length) {
      setTimeout(showLoss, 600);
      return;
    }

    const groupIndex = unsolvedIndices[i];
    const group      = state.puzzle.groups[groupIndex];

    // Pop-animate the tiles for this group before sweeping them into a row
    elGrid.querySelectorAll('.tile').forEach(function (btn) {
      if (group.words.indexOf(btn.dataset.word) !== -1) {
        btn.classList.add('tile-pop');
      }
    });

    setTimeout(function () {
      state.tiles.forEach(function (t) {
        if (t.groupIndex === groupIndex) t.solved = true;
      });
      state.solvedGroups.push(groupIndex);

      appendSolvedRow(group);
      renderGrid();
      syncUI();

      revealNext(i + 1);
    }, 500);
  }

  revealNext(0);
}

// ── Win / Loss modals ──────────────────────────────────────────────────────

function showWin() {
  elModalGraphic.textContent = '★';
  elModalGraphic.className   = 'win';
  elModalMsg.innerHTML       = "YOU'RE A WINNER,<br>AND VERY POWERFUL";
  elModal.classList.remove('hidden');
}

function showLoss() {
  elModalGraphic.textContent = '👎';
  elModalGraphic.className   = 'loss';
  elModalMsg.innerHTML       = 'BETTER LUCK<br>NEXT TIME!';
  elModal.classList.remove('hidden');
}

// ── Admire Mode ────────────────────────────────────────────────────────────

function showAdmire() {
  elModal.classList.add('hidden');
  state.admiring = true;
  // state.locked stays true — no tile interaction during admire

  // Swap controls: hide game buttons, reveal admire play-again
  elControls.classList.add('admiring');
  elBtnAdmirePlay.classList.remove('hidden');
}

// ── Play Again ─────────────────────────────────────────────────────────────

elBtnAdmire.addEventListener('click', showAdmire);

elBtnPlayAgain.addEventListener('click', function () {
  startGame(); // resets all state except playedIds; picks new puzzle
});

elBtnAdmirePlay.addEventListener('click', function () {
  startGame();
});

// ── Entry point ────────────────────────────────────────────────────────────

elBtnStart.addEventListener('click', startGame);
