export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export const genRandNumbers = (len: number, rand: number) => {
  return [...Array(len)].map(() => getRandomInt(0, rand - 1))
}

export const isCanvas = (elem: HTMLElement | null): elem is HTMLCanvasElement => elem instanceof HTMLCanvasElement

export const isContext = (elem: CanvasRenderingContext2D | null): elem is CanvasRenderingContext2D => elem instanceof CanvasRenderingContext2D
