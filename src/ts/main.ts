import {drawCurrent, drawNext, drawPlayfield, Game, initGame} from "./game.ts";
import {handleKeyDown, handleKeyUp, handlerKeyLeft, handlerKeyRight, KEYS} from "./keyboard.ts";

const canvas = document.getElementById("game");
const next = document.getElementById("next");
const reset = document.getElementById("reset");
let game: Game = initGame(canvas, next)

const loop = () => {
  game.animationFrame = requestAnimationFrame(loop);
  drawPlayfield(game)
  drawCurrent(game)
  drawNext(game)
}

game.animationFrame = requestAnimationFrame(loop);

reset?.addEventListener("click", (_: MouseEvent) => {
  if (game.animationFrame) cancelAnimationFrame(game.animationFrame)
  game = initGame(canvas, next)
  game.animationFrame = requestAnimationFrame(loop);
});

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (game.isGameOver) return;
  switch (e.key) {
    case KEYS.DOWN:
      handleKeyDown(game);
      break;
    case KEYS.LEFT:
      handlerKeyLeft(game);
      break;
    case KEYS.RIGHT:
      handlerKeyRight(game);
      break;
    case KEYS.UP:
      handleKeyUp(game);
      break;
  }
});
