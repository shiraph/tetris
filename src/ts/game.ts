import {isMino, Mino, MinoColors, Minos} from "./mino.ts";
import {init, Tetromino} from "./tetromino.ts";
import {genRandNumbers, getRandomInt, isCanvas, isContext} from "./util.ts";
import WebFont from "webfontloader";

const GRID = 32;
const ROWS = 20;
const COLS = 10;
const FPS = 60;

export type Game = {
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  nextContext: CanvasRenderingContext2D,
  nextCanvas: HTMLCanvasElement,
  field: (Mino | null)[][],
  current: Tetromino,
  sequence: Tetromino[],
  count: number,
  score: number,
  isGameOver: boolean,
  isPaused: boolean,
  animationFrame: number | null,
}

export const initGame = (canvas: HTMLElement | null, next: HTMLElement | null): Game => {
  if (!isCanvas(canvas)) {
    throw new Error("Canvas not found")
  }
  const context = canvas.getContext("2d");
  if (!isContext(context)) {
    throw new Error("Context not found")
  }
  if (!isCanvas(next)) {
    throw new Error("Next not found")
  }
  const nextContext = next.getContext("2d");
  if (!isContext(nextContext)) {
    throw new Error("Next context not found")
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  nextContext.clearRect(0, 0, next.width, next.height);

  const playfield: (Mino | null)[][] = [];
  for (let row = -2; row < ROWS; row++) {
    playfield[row] = [];
    for (let col = 0; col < COLS; col++) {
      playfield[row][col] = null;
    }
  }

  const seq = genRandNumbers(5, Minos.length).map((i) => init(Minos[i], COLS))
  return {
    context: context,
    canvas: canvas,
    nextContext: nextContext,
    nextCanvas: next,
    field: playfield,
    current: seq[0],
    sequence: seq.slice(1),
    count: 0,
    score: 0,
    isGameOver: false,
    isPaused: false,
    animationFrame: null,
  }
}

export const drawPlayfield = (game: Game) => {
  game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {
      let cell = game.field[row][col];
      if (isMino(cell)) {
        game.context.fillStyle = MinoColors[cell];
        // drawing 1 px smaller than the grid creates a grid effect
        game.context.fillRect(col * GRID, row * GRID, GRID - 1, GRID - 1);
      }
    }
  }
}

export const drawNext = (game: Game) => {
  game.nextContext.clearRect(0, 0, game.nextCanvas.width, game.nextCanvas.height);
  const next = game.sequence[0]
  game.nextContext.fillStyle = MinoColors[next.name];
  for (let row = 0; row < next.matrix.length; row++) {
    for (let col = 0; col < next.matrix[row].length; col++) {
      if (next.matrix[row][col]) {
        // drawing 1 px smaller than the grid creates a grid effect
        game.nextContext.fillRect(GRID + col * GRID, GRID + row * GRID, GRID - 1, GRID - 1);
      }
    }
  }
}

export const drawCurrent = (game: Game) => {
  // tetromino falls every frame
  if (++game.count > FPS) {
    game.current.row++;
    game.count = 0;

    // place piece if it runs into anything
    if (!isValidMove(game, game.current)) {
      game.current.row--;
      placeNewTetromino(game);
    }
  }

  game.context.fillStyle = MinoColors[game.current.name];
  for (let row = 0; row < game.current.matrix.length; row++) {
    for (let col = 0; col < game.current.matrix[row].length; col++) {
      if (game.current.matrix[row][col]) {
        // drawing 1 px smaller than the grid creates a grid effect
        game.context.fillRect((game.current.col + col) * GRID, (game.current.row + row) * GRID, GRID - 1, GRID - 1);
      }
    }
  }
}

// place the tetromino on the playfield
export const placeNewTetromino = (game: Game) => {
  for (let row = 0; row < game.current.matrix.length; row++) {
    for (let col = 0; col < game.current.matrix[row].length; col++) {
      if (game.current.matrix[row][col]) {

        // game over if piece has any part offscreen
        if (game.current.row + row < 0) {
          return gameOver(game)
        }

        // place string name of tetromino in playfield
        game.field[game.current.row + row][game.current.col + col] = game.current.name;
      }
    }
  }

  // check for line clears starting from the bottom and working our way up
  for (let row of game.field) {
    if (row.every(cell => !!cell)) {
      game.score += 10;
      game.field.splice(game.field.indexOf(row), 1);
      game.field.unshift(Array(COLS).fill(null));
    }
  }

  game.sequence.push(init(Minos[getRandomInt(0, Minos.length - 1)], COLS))
  game.current = game.sequence[0]
  game.sequence = game.sequence.slice(1)
}

// check to see if the new matrix/row/col is valid
export const isValidMove = (game: Game, tetromino: Tetromino) => {
  for (let cellRow = 0; cellRow < tetromino.matrix.length; cellRow++) {
    for (let cellCol = 0; cellCol < tetromino.matrix[cellRow].length; cellCol++) {
      if (!tetromino.matrix[cellRow][cellCol]) continue;

      // outside the game bounds
      if (tetromino.col + cellCol < 0 || tetromino.col + cellCol >= COLS || tetromino.row + cellRow >= ROWS
      ) {
        return false;
      }

      // collides with another piece
      if (game.field[tetromino.row + cellRow][tetromino.col + cellCol]) {
        return false;
      }
    }
  }

  return true;
}

export const gameOver = (game: Game) => {
  if (game.animationFrame) cancelAnimationFrame(game.animationFrame);
  game.isGameOver = true;
  game.context.fillStyle = "black";
  game.context.globalAlpha = 1;
  game.context.fillRect(0, game.canvas.height / 2 - 60, game.canvas.width, 150);

  WebFont.load({
    google: {
      families: ["Outfit"]
    },
    active: () => {
      game.context.globalAlpha = 1;
      game.context.fillStyle = "white";
      game.context.font = "36px Outfit";
      game.context.textAlign = "center";
      game.context.textBaseline = "middle";
      game.context.fillText("GAME OVER", game.canvas.width / 2, game.canvas.height / 2);
      game.context.font = "20px Outfit";
      game.context.fillText("SCORE: " + game.score.toString(), game.canvas.width / 2, game.canvas.height / 2 + 50);
    }
  });
}
