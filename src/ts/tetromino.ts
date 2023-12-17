import {isI, Mino, MinoMaps} from "./mino.ts";

export type Tetromino = {
  name: Mino,
  matrix: number[][],
  row: number,
  col: number
}

export const init = (mino: Mino, cols: number): Tetromino => {
  const matrix = MinoMaps[mino];
  return {
    name: mino,
    matrix: matrix,
    row: isI(mino) ? -1 : -2,
    col: cols / 2 - Math.ceil(matrix[0].length / 2)
  }
}

export const toLeft = (tetromino: Tetromino): Tetromino => {
  return {
    ...tetromino,
    col: tetromino.col - 1
  }
}

export const toRight = (tetromino: Tetromino): Tetromino => {
  return {
    ...tetromino,
    col: tetromino.col + 1
  }
}

export const drop = (tetromino: Tetromino): Tetromino => {
  return {
    ...tetromino,
    row: tetromino.row + 1
  }
}

export const rotate = (tetromino: Tetromino): Tetromino => {
  const N = tetromino.matrix.length - 1;
  return {
    ...tetromino,
    matrix: tetromino.matrix.map((row, i) =>
      row.map((_, j) => tetromino.matrix[N - j][i])
    )
  }
}
