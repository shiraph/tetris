export const MINO_I = "I"
export const MINO_J = "J"
export const MINO_L = "L"
export const MINO_O = "O"
export const MINO_S = "S"
export const MINO_Z = "Z"
export const MINO_T = "T"

export const minos = [
  MINO_I,
  MINO_J,
  MINO_L,
  MINO_O,
  MINO_S,
  MINO_Z,
  MINO_T
]

// how to draw each tetromino
// @see https://tetris.fandom.com/wiki/SRS
export const tetrominos = {
  [MINO_I]: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [MINO_J]: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [MINO_L]: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [MINO_O]: [
    [1, 1],
    [1, 1],
  ],
  [MINO_S]: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [MINO_Z]: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [MINO_T]: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]
};


// color of each tetromino
export const colors = {
  [MINO_I]: "cyan",
  [MINO_O]: "yellow",
  [MINO_T]: "purple",
  [MINO_S]: "green",
  [MINO_Z]: "red",
  [MINO_J]: "blue",
  [MINO_L]: "orange"
};
