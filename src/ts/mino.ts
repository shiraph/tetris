export const MINO = {
  I: "I",
  J: "J",
  L: "L",
  O: "O",
  S: "S",
  Z: "Z",
  T: "T"
}

export type Mino = (typeof MINO)[keyof typeof MINO]

export const Minos = Object.values(MINO)

export const MinoColors = {
  [MINO.I]: "cyan",
  [MINO.J]: "yellow",
  [MINO.T]: "purple",
  [MINO.S]: "green",
  [MINO.Z]: "red",
  [MINO.L]: "blue",
  [MINO.O]: "orange"
};


export const MinoMatrices = {
  [MINO.I]: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [MINO.J]: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [MINO.L]: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [MINO.O]: [
    [1, 1],
    [1, 1],
  ],
  [MINO.S]: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [MINO.Z]: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [MINO.T]: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]
};

export const isMino = (mino: string | null): mino is Mino => Minos.includes(mino as Mino)

export const isI = (mino: Mino): mino is typeof MINO.I => mino === MINO.I
