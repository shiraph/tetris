import {KEYS} from "./const.js";
import {drawCurrent, drawPlayfield, Game, initGame, isValidMove, placeNewTetromino,} from "./game.ts";
import {drop, rotate, toLeft, toRight} from "./tetromino.ts";

const canvas = document.getElementById("game");
const game: Game = initGame(canvas)
game.animationFrame = requestAnimationFrame(loop);

function loop() {
  game.animationFrame = requestAnimationFrame(loop);
  game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
  drawPlayfield(game)
  drawCurrent(game)
}


// listen to keyboard events to move the active tetromino
document.addEventListener("keydown", function (e: KeyboardEvent) {
  if (game.isGameOver) return;

  let candidate = game.current;
  // left and right arrow keys (move)
  if (e.key === KEYS.LEFT || e.key === KEYS.RIGHT) {
    candidate = e.key === KEYS.LEFT ? toLeft(candidate) : toRight(candidate);
    if (isValidMove(game, candidate)) {
      game.current.col = candidate.col;
    }
  }

  // up arrow key (rotate)
  if (e.key === KEYS.UP) {
    candidate = rotate(candidate);
    if (isValidMove(game, candidate)) {
      game.current.matrix = candidate.matrix;
    }
  }

  // down arrow key (drop)
  if (e.key === KEYS.DOWN) {
    candidate = drop(candidate);
    if (isValidMove(game, candidate)) {
      game.current.row = candidate.row;
      return;
    }
    placeNewTetromino(game);
  }
});
