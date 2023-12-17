import {drop, rotate, toLeft, toRight} from "./tetromino.ts";
import {Game, isValidMove, placeNewTetromino} from "./game.ts";

export const KEYS = {
  KEY_DOWN: "keydown",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
}

export const handleKeyDown = (game: Game) => {
  let candidate = drop(game.current);
  if (isValidMove(game, candidate)) {
    game.current.row = candidate.row;
    return;
  }
  placeNewTetromino(game);
}

export const handleKeyUp = (game: Game) => {
  let candidate = rotate(game.current);
  if (isValidMove(game, candidate)) {
    game.current.matrix = candidate.matrix;
  }
}

export const handlerKeyLeft = (game: Game) => {
  let candidate = toLeft(game.current);
  if (isValidMove(game, candidate)) {
    game.current.col = candidate.col;
  }
}

export const handlerKeyRight = (game: Game) => {
  let candidate = toRight(game.current);
  if (isValidMove(game, candidate)) {
    game.current.col = candidate.col;
  }
}
